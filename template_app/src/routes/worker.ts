import * as Comlink from "comlink";
import init, { Backend as RustBackend } from "rust_backend";
import type { Position, Feature, Polygon } from "geojson";

// This is glue to call the Rust backend asynchronously in a web worker, off the main browser thread

export class Backend {
  inner: RustBackend | null;

  constructor() {
    this.inner = null;
  }

  async loadInput(inputBytes: Uint8Array, progressCb: (msg: string) => void) {
    // It's safe to call this repeatedly
    await init();

    this.inner = new RustBackend(inputBytes, progressCb);
  }

  unset() {
    this.inner = null;
  }

  isLoaded(): boolean {
    return this.inner != null;
  }

  exampleCall(req: {
    center: [number, number];
    distanceMeters: number;
  }): Feature<Polygon> {
    if (!this.inner) {
      throw new Error("Backend used before ready");
    }

    return JSON.parse(
      this.inner.exampleCall({
        center: req.center,
        distance_meters: req.distanceMeters,
      }),
    );
  }
}

Comlink.expose(Backend);
