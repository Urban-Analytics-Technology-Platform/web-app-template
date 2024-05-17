import * as Comlink from "comlink";
import init, { Backend as RustBackend } from "rust_backend";
import type { Position, Feature, Polygon } from "geojson";

export class Backend {
  inner: RustBackend | null;

  constructor() {
    this.inner = null;
  }

  async loadInput(inputBytes: Uint8Array, progressCb: (msg: string) => void) {
    // TODO Do we need to do this only once?
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
