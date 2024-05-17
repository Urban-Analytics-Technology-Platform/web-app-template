#[macro_use]
extern crate log;

mod timer;

use std::sync::Once;

use geo::{HaversineDestination, LineString, Point, Polygon};
use geojson::{Feature, Geometry};
use serde::Deserialize;
use wasm_bindgen::prelude::*;

use self::timer::Timer;

static START: Once = Once::new();

// This struct should contain actual state. This will probably depend on the input passed to the
// constructor. This file (lib.rs) should handle all the WASM interactions, and most of the logic
// should happen in other modules.
#[wasm_bindgen]
pub struct Backend {}

#[wasm_bindgen]
impl Backend {
    // Takes a big byte array from the browser and a callback to plumb progress messages
    #[wasm_bindgen(constructor)]
    pub fn new(input_bytes: &[u8], progress_cb: js_sys::Function) -> Backend {
        // Panics shouldn't happen, but if they do, console.log them.
        console_error_panic_hook::set_once();
        START.call_once(|| {
            console_log::init_with_level(log::Level::Info).unwrap();
        });

        load_something(input_bytes, Timer::new("setup backend", Some(progress_cb)));

        Backend {}
    }

    /// Returns a GeoJSON polygon of a triangle of specified distance around a point.
    #[wasm_bindgen(js_name = exampleCall)]
    pub fn example_call(&self, input: JsValue) -> Result<String, JsValue> {
        // serde is used to parse a JSON object into a Rust struct
        let req: ExampleRequest = serde_wasm_bindgen::from_value(input)?;

        let center = Point::new(req.center[0], req.center[1]);
        // Log statements will show up on the browser console
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

        // Except for a few primitive types, usually returning values from Rust happens by
        // serializing to JSON, and deserializing in worker.ts
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

// This is just a toy example of a long, blocking operation. By using the Timer, progress updates
// can be displayed
fn load_something(input_bytes: &[u8], mut timer: Timer) {
    for step in 0..10 {
        timer.step(format!("do something, step {step}"));
        let mut sum: u64 = 0;
        for x in input_bytes {
            sum = sum.overflowing_add(*x as u64).0;
        }
    }
}
