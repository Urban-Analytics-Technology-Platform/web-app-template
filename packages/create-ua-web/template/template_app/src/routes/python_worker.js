"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Backend = void 0;
const Comlink = __importStar(require("comlink"));
const pyodide_1 = require("pyodide");
// This is glue to call the Python backend asynchronously in a web worker, off the main browser thread
class Backend {
    constructor() {
        this.pyodide = null;
        this.backend = null;
    }
    loadInput(inputBytes, progressCb) {
        return __awaiter(this, void 0, void 0, function* () {
            progressCb("Loading pyodide");
            // Use the pyodide CDN to fetch other packages. Most scripts only need a
            // few, and hosting all of them on GH Pages is expensive.
            this.pyodide = yield (0, pyodide_1.loadPyodide)({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/",
            });
            // Setup packages
            progressCb("Installing haversine through micropip");
            yield this.pyodide.loadPackage("micropip");
            let micropip = this.pyodide.pyimport("micropip");
            yield micropip.install("haversine");
            // Load the backend code from a file
            // TODO Probably build a wheel instead: https://pyodide.org/en/stable/usage/loading-custom-python-code.html
            progressCb("Downloading backend code");
            let resp = yield fetch("/backend.py");
            let contents = yield resp.text();
            this.pyodide.runPython(contents);
            progressCb("Constructing the backend object with the input");
            this.backend = this.pyodide.globals.get("Backend")(inputBytes);
        });
    }
    unset() {
        this.backend = null;
    }
    isLoaded() {
        return this.pyodide != null && this.backend != null;
    }
    exampleCall(req) {
        if (!this.pyodide) {
            throw new Error("Backend used before ready");
        }
        let result = this.backend.exampleCall(req.center, req.distanceMeters);
        return JSON.parse(result);
    }
}
exports.Backend = Backend;
Comlink.expose(Backend);
