import * as Comlink from "comlink";
import { loadPyodide, type PyodideInterface } from "pyodide";
import type { FeatureCollection } from "geojson";

// This is glue to call the Python backend asynchronously in a web worker, off the main browser thread

export class PythonBackend {
  pyodide: PyodideInterface | null;
  // The top-level URL of the website we're serving
  pathname: string;

  constructor() {
    this.pyodide = null;
    this.pathname = "";
  }

  async initialise(pathname: string) {
    // progressCb("Loading pyodide");
    // Use the pyodide CDN to fetch other packages. Most scripts only need a
    // few, and hosting all of them on GH Pages is expensive.
    this.pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
    });
    this.pathname = pathname;

    // Setup packages
    await this.pyodide.loadPackage("micropip");
    const micropip = this.pyodide.pyimport("micropip");
    // TODO: Figure out how to not hardcode the wheel filename
    await micropip.install(
      this.pathname + "my_python_module-0.0.1-py3-none-any.whl",
    );
    console.log(micropip.list());
  }

  isLoaded(): boolean {
    return this.pyodide != null;
  }

  addColours(gj: FeatureCollection): FeatureCollection {
    if (!this.pyodide) {
      throw new Error("Python backend not initialised");
    }
    // It seems easiest to pass strings to and from Python. You can try to
    // use this.pyodide.toPy(some_js_object) when sending a variable to
    // Python, and do result.toJs() to try to extract it, but the type
    // conversions don't always work out.
    this.pyodide.globals.set("input_gj_string", JSON.stringify(gj));
    const code = `
            from my_python_module import add_colours
            import json
            json.dumps(add_colours(json.loads(input_gj_string)))
        `;
    // This inspects the code and loads any packages that are needed to run
    // it
    this.pyodide.loadPackagesFromImports(code);
    // This runs the code. The last line is the return value (just like in a
    // notebook).
    const result = this.pyodide.runPython(code);
    console.log("PythonBackend.addColours result", result);
    return JSON.parse(result) as FeatureCollection;
  }
}

Comlink.expose(PythonBackend);
