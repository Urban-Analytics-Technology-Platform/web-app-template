import * as Comlink from 'comlink';
import init, { Backend as RustBackend } from 'rust_backend';
import type { Position, Feature, Polygon } from 'geojson';

export class Backend {
	inner: RustBackend | null;

	constructor() {
		this.inner = null;
	}

	// TODO This structure makes more sense when the constructor actually does some work based on input
	async setup() {
		// TODO Do we need to do this only once?
		await init();

		this.inner = new RustBackend();
	}

	isLoaded(): boolean {
		return this.inner != null;
	}

	unset() {
		this.inner = null;
	}

	exampleCall(req: {
		// TODO LngLatLike doesn't work?
		start: { lng: number; lat: number };
		distanceMeters: number;
	}): Feature<Polygon> {
		if (!this.inner) {
			throw new Error('Backend used before ready');
		}

		return JSON.parse(
			this.inner.exampleCall({
				center: [req.start.lng, req.start.lat],
				distance_meters: req.distanceMeters
			})
		);
	}
}

Comlink.expose(Backend);