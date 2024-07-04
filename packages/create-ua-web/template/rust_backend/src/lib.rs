#[macro_use]
extern crate log;

mod timer;

use std::sync::Once;

use geojson::{Feature, FeatureCollection};
use rand::seq::SliceRandom;
use serde::Deserialize;
use serde_json::map::Map;
use wasm_bindgen::prelude::*;

use self::timer::Timer;

static START: Once = Once::new();

pub fn get_random_color() -> &'static str {
    let mut rng = rand::thread_rng();
    ["#C28055", "#C91A00", "#D23900", "#FFFFFF", "#F65200"]
        .choose(&mut rng)
        .unwrap()
}

// This struct should contain actual state. This will probably depend on the input passed to the
// constructor. This file (lib.rs) should handle all the WASM interactions, and most of the logic
// should happen in other modules.
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
        initialise(Timer::new("setup backend", None));
        Backend {}
    }

    /// Add a property called 'color' to each feature in the input GeoJSON. The value is a random
    /// colour from Rust's mascot, Ferris.
    #[wasm_bindgen(js_name = addColours)]
    pub fn add_colours(&self, input: JsValue) -> Result<String, JsValue> {
        // serde is used to parse a JSON object into a Rust struct
        let gj: FeatureCollection = serde_wasm_bindgen::from_value(input)?;
        let mut new_gj = gj.clone();

        // Perform your calculations here. You can extract this block into a separate crate too
        let new_features: Vec<Feature> = gj
            .features
            .into_iter()
            .map(|mut feat| {
                let mut properties = match feat.properties {
                    None => Map::new(),
                    Some(p) => p.clone(),
                };
                properties.insert("color".to_string(), get_random_color().into());
                feat.properties = Some(properties);
                feat
            })
            .collect();
        new_gj.features = new_features;

        // Except for a few primitive types, usually returning values from Rust happens by
        // serializing to JSON, and deserializing in worker.ts
        serde_json::to_string(&new_gj).map_err(err_to_js)
    }
}

fn err_to_js<E: std::fmt::Display>(err: E) -> JsValue {
    JsValue::from_str(&err.to_string())
}

// This is just a toy example of a long, blocking operation. By using the Timer, progress updates
// can be displayed
fn initialise(mut timer: Timer) {
    for step in 0..10 {
        timer.step(format!("do something, step {step}"));
    }
}
