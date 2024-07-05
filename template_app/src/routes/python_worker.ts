import * as Comlink from "comlink";
import { loadPyodide, type PyodideInterface } from "pyodide";
import type { Position, Feature, Polygon } from "geojson";

// This is glue to call the Python backend asynchronously in a web worker, off the main browser thread

export class Backend {
  pyodide: PyodideInterface | null;
  // The stateful Python object
  backend: any | null;

  constructor() {
    this.pyodide = null;
    this.backend = null;
  }

  async loadInput(inputBytes: Uint8Array, progressCb: (msg: string) => void) {
    progressCb("Loading pyodide");
    // Use the pyodide CDN to fetch other packages. Most scripts only need a
    // few, and hosting all of them on GH Pages is expensive.
    this.pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
    });

    // Setup packages
    progressCb("Installing haversine through micropip");
    await this.pyodide.loadPackage("micropip");
    let micropip = this.pyodide.pyimport("micropip");
    await micropip.install("haversine");

    // Load the backend code from a file
    // TODO Probably build a wheel instead: https://pyodide.org/en/stable/usage/loading-custom-python-code.html
    progressCb("Downloading backend code");
    let resp = await fetch("/backend.py");
    let contents = await resp.text();
    this.pyodide.runPython(contents);

    progressCb("Constructing the backend object with the input");
    this.backend = this.pyodide.globals.get("Backend")(inputBytes);
  }

  unset() {
    this.backend = null;
  }

  isLoaded(): boolean {
    return this.pyodide != null && this.backend != null;
  }

  exampleCall(req: {
    center: [number, number];
    distanceMeters: number;
  }): Feature<Polygon> {
    if (!this.pyodide) {
      throw new Error("Backend used before ready");
    }

    let result = this.backend.exampleCall(req.center, req.distanceMeters);
    return JSON.parse(result);
  }
}

Comlink.expose(Backend);
