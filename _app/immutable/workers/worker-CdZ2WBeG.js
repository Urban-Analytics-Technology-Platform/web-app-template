var Ee=Object.defineProperty;var Ae=(h,d,E)=>d in h?Ee(h,d,{enumerable:!0,configurable:!0,writable:!0,value:E}):h[d]=E;var Z=(h,d,E)=>(Ae(h,typeof d!="symbol"?d+"":d,E),E);(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const h=Symbol("Comlink.proxy"),d=Symbol("Comlink.endpoint"),E=Symbol("Comlink.releaseProxy"),N=Symbol("Comlink.finalizer"),j=Symbol("Comlink.thrown"),V=e=>typeof e=="object"&&e!==null||typeof e=="function",ee={canHandle:e=>V(e)&&e[h],serialize(e){const{port1:n,port2:t}=new MessageChannel;return U(e,n),[t,[t]]},deserialize(e){return e.start(),oe(e)}},ne={canHandle:e=>V(e)&&j in e,serialize({value:e}){let n;return e instanceof Error?n={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:n={isError:!1,value:e},[n,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},q=new Map([["proxy",ee],["throw",ne]]);function te(e,n){for(const t of e)if(n===t||t==="*"||t instanceof RegExp&&t.test(n))return!0;return!1}function U(e,n=globalThis,t=["*"]){n.addEventListener("message",function r(o){if(!o||!o.data)return;if(!te(t,o.origin)){console.warn(`Invalid origin '${o.origin}' for comlink proxy`);return}const{id:a,type:s,path:f}=Object.assign({path:[]},o.data),_=(o.data.argumentList||[]).map(A);let b;try{const l=f.slice(0,-1).reduce((g,C)=>g[C],e),m=f.reduce((g,C)=>g[C],e);switch(s){case"GET":b=m;break;case"SET":l[f.slice(-1)[0]]=A(o.data.value),b=!0;break;case"APPLY":b=m.apply(l,_);break;case"CONSTRUCT":{const g=new m(..._);b=ue(g)}break;case"ENDPOINT":{const{port1:g,port2:C}=new MessageChannel;U(e,C),b=ae(g,[g])}break;case"RELEASE":b=void 0;break;default:return}}catch(l){b={value:l,[j]:0}}Promise.resolve(b).catch(l=>({value:l,[j]:0})).then(l=>{const[m,g]=z(l);n.postMessage(Object.assign(Object.assign({},m),{id:a}),g),s==="RELEASE"&&(n.removeEventListener("message",r),G(n),N in e&&typeof e[N]=="function"&&e[N]())}).catch(l=>{const[m,g]=z({value:new TypeError("Unserializable return value"),[j]:0});n.postMessage(Object.assign(Object.assign({},m),{id:a}),g)})}),n.start&&n.start()}function re(e){return e.constructor.name==="MessagePort"}function G(e){re(e)&&e.close()}function oe(e,n){return D(e,[],n)}function P(e){if(e)throw new Error("Proxy has been released and is not useable")}function J(e){return x(e,{type:"RELEASE"}).then(()=>{G(e)})}const F=new WeakMap,W="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const n=(F.get(e)||0)-1;F.set(e,n),n===0&&J(e)});function ie(e,n){const t=(F.get(n)||0)+1;F.set(n,t),W&&W.register(e,n,e)}function se(e){W&&W.unregister(e)}function D(e,n=[],t=function(){}){let r=!1;const o=new Proxy(t,{get(a,s){if(P(r),s===E)return()=>{se(o),J(e),r=!0};if(s==="then"){if(n.length===0)return{then:()=>o};const f=x(e,{type:"GET",path:n.map(_=>_.toString())}).then(A);return f.then.bind(f)}return D(e,[...n,s])},set(a,s,f){P(r);const[_,b]=z(f);return x(e,{type:"SET",path:[...n,s].map(l=>l.toString()),value:_},b).then(A)},apply(a,s,f){P(r);const _=n[n.length-1];if(_===d)return x(e,{type:"ENDPOINT"}).then(A);if(_==="bind")return D(e,n.slice(0,-1));const[b,l]=Y(f);return x(e,{type:"APPLY",path:n.map(m=>m.toString()),argumentList:b},l).then(A)},construct(a,s){P(r);const[f,_]=Y(s);return x(e,{type:"CONSTRUCT",path:n.map(b=>b.toString()),argumentList:f},_).then(A)}});return ie(o,e),o}function ce(e){return Array.prototype.concat.apply([],e)}function Y(e){const n=e.map(z);return[n.map(t=>t[0]),ce(n.map(t=>t[1]))]}const X=new WeakMap;function ae(e,n){return X.set(e,n),e}function ue(e){return Object.assign(e,{[h]:!0})}function z(e){for(const[n,t]of q)if(t.canHandle(e)){const[r,o]=t.serialize(e);return[{type:"HANDLER",name:n,value:r},o]}return[{type:"RAW",value:e},X.get(e)||[]]}function A(e){switch(e.type){case"HANDLER":return q.get(e.name).deserialize(e.value);case"RAW":return e.value}}function x(e,n,t){return new Promise(r=>{const o=fe();e.addEventListener("message",function a(s){!s.data||!s.data.id||s.data.id!==o||(e.removeEventListener("message",a),r(s.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},n),t)})}function fe(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}let u;const y=new Array(128).fill(void 0);y.push(void 0,null,!0,!1);function i(e){return y[e]}function B(e){return e==null}let T=null;function _e(){return(T===null||T.byteLength===0)&&(T=new Float64Array(u.memory.buffer)),T}let M=null;function w(){return(M===null||M.byteLength===0)&&(M=new Int32Array(u.memory.buffer)),M}let O=y.length;function le(e){e<132||(y[e]=O,O=e)}function v(e){const n=i(e);return le(e),n}const K=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&K.decode();let R=null;function L(){return(R===null||R.byteLength===0)&&(R=new Uint8Array(u.memory.buffer)),R}function S(e,n){return e=e>>>0,K.decode(L().subarray(e,e+n))}function c(e){O===y.length&&y.push(y.length+1);const n=O;return O=y[n],y[n]=e,n}let k=0;const I=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},be=typeof I.encodeInto=="function"?function(e,n){return I.encodeInto(e,n)}:function(e,n){const t=I.encode(e);return n.set(t),{read:e.length,written:t.length}};function H(e,n,t){if(t===void 0){const f=I.encode(e),_=n(f.length,1)>>>0;return L().subarray(_,_+f.length).set(f),k=f.length,_}let r=e.length,o=n(r,1)>>>0;const a=L();let s=0;for(;s<r;s++){const f=e.charCodeAt(s);if(f>127)break;a[o+s]=f}if(s!==r){s!==0&&(e=e.slice(s)),o=t(o,r,r=s+e.length*3,1)>>>0;const f=L().subarray(o+s,o+r),_=be(e,f);s+=_.written,o=t(o,r,s,1)>>>0}return k=s,o}function $(e){const n=typeof e;if(n=="number"||n=="boolean"||e==null)return`${e}`;if(n=="string")return`"${e}"`;if(n=="symbol"){const o=e.description;return o==null?"Symbol":`Symbol(${o})`}if(n=="function"){const o=e.name;return typeof o=="string"&&o.length>0?`Function(${o})`:"Function"}if(Array.isArray(e)){const o=e.length;let a="[";o>0&&(a+=$(e[0]));for(let s=1;s<o;s++)a+=", "+$(e[s]);return a+="]",a}const t=/\[object ([^\]]+)\]/.exec(toString.call(e));let r;if(t.length>1)r=t[1];else return toString.call(e);if(r=="Object")try{return"Object("+JSON.stringify(e)+")"}catch{return"Object"}return e instanceof Error?`${e.name}: ${e.message}
${e.stack}`:r}function ge(e,n){const t=n(e.length*1,1)>>>0;return L().set(e,t/1),k=e.length,t}function p(e,n){try{return e.apply(this,n)}catch(t){u.__wbindgen_exn_store(c(t))}}const we=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(e=>u.__wbg_backend_free(e>>>0));let de=class{__destroy_into_raw(){const n=this.__wbg_ptr;return this.__wbg_ptr=0,we.unregister(this),n}free(){const n=this.__destroy_into_raw();u.__wbg_backend_free(n)}constructor(n,t){const r=ge(n,u.__wbindgen_malloc),o=k,a=u.backend_new(r,o,c(t));return this.__wbg_ptr=a>>>0,this}exampleCall(n){let t,r;try{const l=u.__wbindgen_add_to_stack_pointer(-16);u.backend_exampleCall(l,this.__wbg_ptr,c(n));var o=w()[l/4+0],a=w()[l/4+1],s=w()[l/4+2],f=w()[l/4+3],_=o,b=a;if(f)throw _=0,b=0,v(s);return t=_,r=b,S(_,b)}finally{u.__wbindgen_add_to_stack_pointer(16),u.__wbindgen_free(t,r,1)}}};async function ye(e,n){if(typeof Response=="function"&&e instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(e,n)}catch(r){if(e.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const t=await e.arrayBuffer();return await WebAssembly.instantiate(t,n)}else{const t=await WebAssembly.instantiate(e,n);return t instanceof WebAssembly.Instance?{instance:t,module:e}:t}}function me(){const e={};return e.wbg={},e.wbg.__wbindgen_number_get=function(n,t){const r=i(t),o=typeof r=="number"?r:void 0;_e()[n/8+1]=B(o)?0:o,w()[n/4+0]=!B(o)},e.wbg.__wbindgen_object_drop_ref=function(n){v(n)},e.wbg.__wbindgen_string_new=function(n,t){const r=S(n,t);return c(r)},e.wbg.__wbindgen_error_new=function(n,t){const r=new Error(S(n,t));return c(r)},e.wbg.__wbindgen_is_object=function(n){const t=i(n);return typeof t=="object"&&t!==null},e.wbg.__wbindgen_is_undefined=function(n){return i(n)===void 0},e.wbg.__wbindgen_in=function(n,t){return i(n)in i(t)},e.wbg.__wbindgen_jsval_loose_eq=function(n,t){return i(n)==i(t)},e.wbg.__wbindgen_boolean_get=function(n){const t=i(n);return typeof t=="boolean"?t?1:0:2},e.wbg.__wbindgen_string_get=function(n,t){const r=i(t),o=typeof r=="string"?r:void 0;var a=B(o)?0:H(o,u.__wbindgen_malloc,u.__wbindgen_realloc),s=k;w()[n/4+1]=s,w()[n/4+0]=a},e.wbg.__wbg_getwithrefkey_edc2c8960f0f1191=function(n,t){const r=i(n)[i(t)];return c(r)},e.wbg.__wbindgen_object_clone_ref=function(n){const t=i(n);return c(t)},e.wbg.__wbg_debug_5fb96680aecf5dc8=function(n){console.debug(i(n))},e.wbg.__wbg_error_8e3928cfb8a43e2b=function(n){console.error(i(n))},e.wbg.__wbg_info_530a29cb2e4e3304=function(n){console.info(i(n))},e.wbg.__wbg_log_5bb5f88f245d7762=function(n){console.log(i(n))},e.wbg.__wbg_warn_63bbae1730aead09=function(n){console.warn(i(n))},e.wbg.__wbg_new_abda76e883ba8a5f=function(){const n=new Error;return c(n)},e.wbg.__wbg_stack_658279fe44541cf6=function(n,t){const r=i(t).stack,o=H(r,u.__wbindgen_malloc,u.__wbindgen_realloc),a=k;w()[n/4+1]=a,w()[n/4+0]=o},e.wbg.__wbg_error_f851667af71bcfc6=function(n,t){let r,o;try{r=n,o=t,console.error(S(n,t))}finally{u.__wbindgen_free(r,o,1)}},e.wbg.__wbg_performance_a1b8bde2ee512264=function(n){const t=i(n).performance;return c(t)},e.wbg.__wbg_now_abd80e969af37148=function(n){return i(n).now()},e.wbg.__wbg_get_bd8e338fbd5f5cc8=function(n,t){const r=i(n)[t>>>0];return c(r)},e.wbg.__wbg_length_cd7af8117672b8b8=function(n){return i(n).length},e.wbg.__wbindgen_is_function=function(n){return typeof i(n)=="function"},e.wbg.__wbg_newnoargs_e258087cd0daa0ea=function(n,t){const r=new Function(S(n,t));return c(r)},e.wbg.__wbg_next_40fc327bfc8770e6=function(n){const t=i(n).next;return c(t)},e.wbg.__wbg_next_196c84450b364254=function(){return p(function(n){const t=i(n).next();return c(t)},arguments)},e.wbg.__wbg_done_298b57d23c0fc80c=function(n){return i(n).done},e.wbg.__wbg_value_d93c65011f51a456=function(n){const t=i(n).value;return c(t)},e.wbg.__wbg_iterator_2cee6dadfd956dfa=function(){return c(Symbol.iterator)},e.wbg.__wbg_get_e3c254076557e348=function(){return p(function(n,t){const r=Reflect.get(i(n),i(t));return c(r)},arguments)},e.wbg.__wbg_call_27c0f87801dedf93=function(){return p(function(n,t){const r=i(n).call(i(t));return c(r)},arguments)},e.wbg.__wbg_self_ce0dbfc45cf2f5be=function(){return p(function(){const n=self.self;return c(n)},arguments)},e.wbg.__wbg_window_c6fb939a7f436783=function(){return p(function(){const n=window.window;return c(n)},arguments)},e.wbg.__wbg_globalThis_d1e6af4856ba331b=function(){return p(function(){const n=globalThis.globalThis;return c(n)},arguments)},e.wbg.__wbg_global_207b558942527489=function(){return p(function(){const n=global.global;return c(n)},arguments)},e.wbg.__wbg_isArray_2ab64d95e09ea0ae=function(n){return Array.isArray(i(n))},e.wbg.__wbg_instanceof_ArrayBuffer_836825be07d4c9d2=function(n){let t;try{t=i(n)instanceof ArrayBuffer}catch{t=!1}return t},e.wbg.__wbg_call_b3ca7c6051f9bec1=function(){return p(function(n,t,r){const o=i(n).call(i(t),i(r));return c(o)},arguments)},e.wbg.__wbg_buffer_12d079cc21e14bdb=function(n){const t=i(n).buffer;return c(t)},e.wbg.__wbg_new_63b92bc8671ed464=function(n){const t=new Uint8Array(i(n));return c(t)},e.wbg.__wbg_set_a47bac70306a19a7=function(n,t,r){i(n).set(i(t),r>>>0)},e.wbg.__wbg_length_c20a40f15020d68a=function(n){return i(n).length},e.wbg.__wbg_instanceof_Uint8Array_2b3bbecd033d19f6=function(n){let t;try{t=i(n)instanceof Uint8Array}catch{t=!1}return t},e.wbg.__wbindgen_debug_string=function(n,t){const r=$(i(t)),o=H(r,u.__wbindgen_malloc,u.__wbindgen_realloc),a=k;w()[n/4+1]=a,w()[n/4+0]=o},e.wbg.__wbindgen_throw=function(n,t){throw new Error(S(n,t))},e.wbg.__wbindgen_memory=function(){const n=u.memory;return c(n)},e}function he(e,n){return u=e.exports,Q.__wbindgen_wasm_module=n,T=null,M=null,R=null,u}async function Q(e){if(u!==void 0)return u;typeof e>"u"&&(e="assets/rust_backend_bg.wasm");const n=me();(typeof e=="string"||typeof Request=="function"&&e instanceof Request||typeof URL=="function"&&e instanceof URL)&&(e=fetch(e));const{instance:t,module:r}=await ye(await e,n);return he(t,r)}class pe{constructor(){Z(this,"inner");this.inner=null}async loadInput(n,t){await Q(),this.inner=new de(n,t)}unset(){this.inner=null}isLoaded(){return this.inner!=null}exampleCall(n){if(!this.inner)throw new Error("Backend used before ready");return JSON.parse(this.inner.exampleCall({center:n.center,distance_meters:n.distanceMeters}))}}U(pe)})();