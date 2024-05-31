import * as Comlink from "comlink";
import { loadPyodide, type PyodideInterface } from "pyodide";
import type { Position, Feature, Polygon } from "geojson";

// This is glue to call the Python backend asynchronously in a web worker, off the main browser thread

export class Backend {
  pyodide: PyodideInterface | null;

  constructor() {
    this.pyodide = null;
  }

  async loadInput(inputBytes: Uint8Array, progressCb: (msg: string) => void) {
    progressCb("Loading pyodide");
    this.pyodide = await loadPyodide({
      indexURL: "/pyodide",
    });

    // Setup packages
    progressCb("Installing haversine through micropip");
    await this.pyodide.loadPackage("micropip");
    let micropip = this.pyodide.pyimport("micropip");
    await micropip.install("haversine");
  }

  unset() {
    // Don't do anything
    // TODO Once there's a stateful object, clear it
  }

  isLoaded(): boolean {
    return this.pyodide != null;
  }

  exampleCall(req: {
    center: [number, number];
    distanceMeters: number;
  }): Feature<Polygon> {
    if (!this.pyodide) {
      throw new Error("Backend used before ready");
    }

    let script = `
    import json
    from haversine import inverse_haversine, Direction, Unit

    def swap(pt):
      return (pt[1], pt[0])

    center = (${req.center[1]}, ${req.center[0]})
    dist = ${req.distanceMeters}
    pt1 = swap(inverse_haversine(center, dist, Direction.NORTHWEST, unit=Unit.METERS))
    pt2 = swap(inverse_haversine(center, dist, Direction.NORTHEAST, unit=Unit.METERS))
    pt3 = swap(inverse_haversine(center, dist, Direction.SOUTH, unit=Unit.METERS))

    gj = {
      "type": "Feature",
      "properties": {
        "key": "value",
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[pt1, pt2, pt3, pt1]],
      },
    }

    json.dumps(gj)
    `;

    // TODO async?
    let result = this.pyodide.runPython(script);
    return JSON.parse(result);
  }
}

Comlink.expose(Backend);
