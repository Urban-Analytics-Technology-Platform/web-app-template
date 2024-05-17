#[macro_use]
extern crate log;

use std::sync::Once;

use geo::{HaversineDestination, LineString, Point, Polygon};
use geojson::{Feature, Geometry};
use serde::Deserialize;
use wasm_bindgen::prelude::*;

static START: Once = Once::new();

#[wasm_bindgen]
pub struct Backend {}

#[wasm_bindgen]
impl Backend {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Backend {
        // Panics shouldn't happen, but if they do, console.log them.
        console_error_panic_hook::set_once();
        START.call_once(|| {
            console_log::init_with_level(log::Level::Info).unwrap();
        });

        Backend {}
    }

    /// Returns a GeoJSON polygon of a triangle of specified distance around a point.
    #[wasm_bindgen(js_name = exampleCall)]
    pub fn example_call(&self, input: JsValue) -> Result<String, JsValue> {
        let req: ExampleRequest = serde_wasm_bindgen::from_value(input)?;

        let center = Point::new(req.center[0], req.center[1]);
        info!("Debugging to console log. Center point is {center:?}");
        let triangle = Polygon::new(
            LineString::new(vec![
                center
                    .haversine_destination(45., req.distance_meters)
                    .into(),
                center
                    .haversine_destination(135., req.distance_meters)
                    .into(),
                center
                    .haversine_destination(270., req.distance_meters)
                    .into(),
            ]),
            Vec::new(),
        );

        let mut feature = Feature::from(Geometry::from(&triangle));
        feature.set_property("key", "value");

        serde_json::to_string(&feature).map_err(err_to_js)
    }
}

fn err_to_js<E: std::fmt::Display>(err: E) -> JsValue {
    JsValue::from_str(&err.to_string())
}

#[derive(Deserialize)]
struct ExampleRequest {
    center: [f64; 2],
    distance_meters: f64,
}
