var xe=Object.defineProperty;var Fe=(e,t,n)=>t in e?xe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Le=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var _=(e,t,n)=>(Fe(e,typeof t!="symbol"?t+"":t,n),n);var nt=Le((it,$)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const q=Symbol("Comlink.proxy"),Ne=Symbol("Comlink.endpoint"),Pe=Symbol("Comlink.releaseProxy"),T=Symbol("Comlink.finalizer"),O=Symbol("Comlink.thrown"),Y=e=>typeof e=="object"&&e!==null||typeof e=="function",Re={canHandle:e=>Y(e)&&e[q],serialize(e){const{port1:t,port2:n}=new MessageChannel;return M(e,t),[n,[n]]},deserialize(e){return e.start(),Ae(e)}},_e={canHandle:e=>Y(e)&&O in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",Re],["throw",_e]]);function Te(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function M(e,t=globalThis,n=["*"]){t.addEventListener("message",function i(s){if(!s||!s.data)return;if(!Te(n,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:a,type:r,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(v);let u;try{const c=l.slice(0,-1).reduce((d,y)=>d[y],e),f=l.reduce((d,y)=>d[y],e);switch(r){case"GET":u=f;break;case"SET":c[l.slice(-1)[0]]=v(s.data.value),u=!0;break;case"APPLY":u=f.apply(c,o);break;case"CONSTRUCT":{const d=new f(...o);u=Ce(d)}break;case"ENDPOINT":{const{port1:d,port2:y}=new MessageChannel;M(e,y),u=Ie(d,[d])}break;case"RELEASE":u=void 0;break;default:return}}catch(c){u={value:c,[O]:0}}Promise.resolve(u).catch(c=>({value:c,[O]:0})).then(c=>{const[f,d]=N(c);t.postMessage(Object.assign(Object.assign({},f),{id:a}),d),r==="RELEASE"&&(t.removeEventListener("message",i),J(t),T in e&&typeof e[T]=="function"&&e[T]())}).catch(c=>{const[f,d]=N({value:new TypeError("Unserializable return value"),[O]:0});t.postMessage(Object.assign(Object.assign({},f),{id:a}),d)})}),t.start&&t.start()}function je(e){return e.constructor.name==="MessagePort"}function J(e){je(e)&&e.close()}function Ae(e,t){return j(e,[],t)}function S(e){if(e)throw new Error("Proxy has been released and is not useable")}function X(e){return E(e,{type:"RELEASE"}).then(()=>{J(e)})}const F=new WeakMap,L="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(F.get(e)||0)-1;F.set(e,t),t===0&&X(e)});function De(e,t){const n=(F.get(t)||0)+1;F.set(t,n),L&&L.register(e,t,e)}function $e(e){L&&L.unregister(e)}function j(e,t=[],n=function(){}){let i=!1;const s=new Proxy(n,{get(a,r){if(S(i),r===Pe)return()=>{$e(s),X(e),i=!0};if(r==="then"){if(t.length===0)return{then:()=>s};const l=E(e,{type:"GET",path:t.map(o=>o.toString())}).then(v);return l.then.bind(l)}return j(e,[...t,r])},set(a,r,l){S(i);const[o,u]=N(l);return E(e,{type:"SET",path:[...t,r].map(c=>c.toString()),value:o},u).then(v)},apply(a,r,l){S(i);const o=t[t.length-1];if(o===Ne)return E(e,{type:"ENDPOINT"}).then(v);if(o==="bind")return j(e,t.slice(0,-1));const[u,c]=W(l);return E(e,{type:"APPLY",path:t.map(f=>f.toString()),argumentList:u},c).then(v)},construct(a,r){S(i);const[l,o]=W(r);return E(e,{type:"CONSTRUCT",path:t.map(u=>u.toString()),argumentList:l},o).then(v)}});return De(s,e),s}function Me(e){return Array.prototype.concat.apply([],e)}function W(e){const t=e.map(N);return[t.map(n=>n[0]),Me(t.map(n=>n[1]))]}const K=new WeakMap;function Ie(e,t){return K.set(e,t),e}function Ce(e){return Object.assign(e,{[q]:!0})}function N(e){for(const[t,n]of G)if(n.canHandle(e)){const[i,s]=n.serialize(e);return[{type:"HANDLER",name:t,value:i},s]}return[{type:"RAW",value:e},K.get(e)||[]]}function v(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function E(e,t,n){return new Promise(i=>{const s=Ue();e.addEventListener("message",function a(r){!r.data||!r.data.id||r.data.id!==s||(e.removeEventListener("message",a),i(r.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},t),n)})}function Ue(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var ze=Object.create,I=Object.defineProperty,He=Object.getOwnPropertyDescriptor,We=Object.getOwnPropertyNames,Ve=Object.getPrototypeOf,Be=Object.prototype.hasOwnProperty,m=(e,t)=>I(e,"name",{value:t,configurable:!0}),Q=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Z=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),qe=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of We(t))!Be.call(e,s)&&s!==n&&I(e,s,{get:()=>t[s],enumerable:!(i=He(t,s))||i.enumerable});return e},Ye=(e,t,n)=>(n=e!=null?ze(Ve(e)):{},qe(!e||!e.__esModule?I(n,"default",{value:e,enumerable:!0}):n,e)),Ge=Z((e,t)=>{(function(n,i){typeof define=="function"&&define.amd?define("stackframe",[],i):typeof e=="object"?t.exports=i():n.StackFrame=i()})(e,function(){function n(p){return!isNaN(parseFloat(p))&&isFinite(p)}m(n,"_isNumber");function i(p){return p.charAt(0).toUpperCase()+p.substring(1)}m(i,"_capitalize");function s(p){return function(){return this[p]}}m(s,"_getter");var a=["isConstructor","isEval","isNative","isToplevel"],r=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],u=["evalOrigin"],c=a.concat(r,l,o,u);function f(p){if(p)for(var h=0;h<c.length;h++)p[c[h]]!==void 0&&this["set"+i(c[h])](p[c[h]])}m(f,"StackFrame"),f.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof f)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new f(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",h=this.getLineNumber()||"",b=this.getColumnNumber()||"",k=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+h+":"+b+")":"[eval]:"+h+":"+b:k?k+" ("+p+":"+h+":"+b+")":p+":"+h+":"+b}},f.fromString=m(function(p){var h=p.indexOf("("),b=p.lastIndexOf(")"),k=p.substring(0,h),Ee=p.substring(h+1,b).split(","),H=p.substring(b+1);if(H.indexOf("@")===0)var R=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(H,""),ke=R[1],Se=R[2],Oe=R[3];return new f({functionName:k,args:Ee||void 0,fileName:ke,lineNumber:Se||void 0,columnNumber:Oe||void 0})},"StackFrame$$fromString");for(var d=0;d<a.length;d++)f.prototype["get"+i(a[d])]=s(a[d]),f.prototype["set"+i(a[d])]=function(p){return function(h){this[p]=!!h}}(a[d]);for(var y=0;y<r.length;y++)f.prototype["get"+i(r[y])]=s(r[y]),f.prototype["set"+i(r[y])]=function(p){return function(h){if(!n(h))throw new TypeError(p+" must be a Number");this[p]=Number(h)}}(r[y]);for(var g=0;g<l.length;g++)f.prototype["get"+i(l[g])]=s(l[g]),f.prototype["set"+i(l[g])]=function(p){return function(h){this[p]=String(h)}}(l[g]);return f})}),Je=Z((e,t)=>{(function(n,i){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],i):typeof e=="object"?t.exports=i(Ge()):n.ErrorStackParser=i(n.StackFrame)})(e,m(function(n){var i=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,a=/^(eval@)?(\[native code])?$/;return{parse:m(function(r){if(typeof r.stacktrace<"u"||typeof r["opera#sourceloc"]<"u")return this.parseOpera(r);if(r.stack&&r.stack.match(s))return this.parseV8OrIE(r);if(r.stack)return this.parseFFOrSafari(r);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:m(function(r){if(r.indexOf(":")===-1)return[r];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(r.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:m(function(r){var l=r.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var u=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),c=u.match(/ (\(.+\)$)/);u=c?u.replace(c[0],""):u;var f=this.extractLocation(c?c[1]:u),d=c&&u||void 0,y=["eval","<anonymous>"].indexOf(f[0])>-1?void 0:f[0];return new n({functionName:d,fileName:y,lineNumber:f[1],columnNumber:f[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:m(function(r){var l=r.stack.split(`
`).filter(function(o){return!o.match(a)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new n({functionName:o});var u=/((.*".+"[^@]*)?[^@]*)(?:@)/,c=o.match(u),f=c&&c[1]?c[1]:void 0,d=this.extractLocation(o.replace(u,""));return new n({functionName:f,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:m(function(r){return!r.stacktrace||r.message.indexOf(`
`)>-1&&r.message.split(`
`).length>r.stacktrace.split(`
`).length?this.parseOpera9(r):r.stack?this.parseOpera11(r):this.parseOpera10(r)},"ErrorStackParser$$parseOpera"),parseOpera9:m(function(r){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=r.message.split(`
`),u=[],c=2,f=o.length;c<f;c+=2){var d=l.exec(o[c]);d&&u.push(new n({fileName:d[2],lineNumber:d[1],source:o[c]}))}return u},"ErrorStackParser$$parseOpera9"),parseOpera10:m(function(r){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=r.stacktrace.split(`
`),u=[],c=0,f=o.length;c<f;c+=2){var d=l.exec(o[c]);d&&u.push(new n({functionName:d[3]||void 0,fileName:d[2],lineNumber:d[1],source:o[c]}))}return u},"ErrorStackParser$$parseOpera10"),parseOpera11:m(function(r){var l=r.stack.split(`
`).filter(function(o){return!!o.match(i)&&!o.match(/^Error created at/)},this);return l.map(function(o){var u=o.split("@"),c=this.extractLocation(u.pop()),f=u.shift()||"",d=f.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,y;f.match(/\(([^)]*)\)/)&&(y=f.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var g=y===void 0||y==="[arguments not available]"?void 0:y.split(",");return new n({functionName:d,args:g,fileName:c[0],lineNumber:c[1],columnNumber:c[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Xe=Ye(Je()),w=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",ee=w&&typeof $<"u"&&typeof $.exports<"u"&&typeof Q<"u"&&typeof __dirname<"u",Ke=w&&!ee,Qe=typeof Deno<"u",te=!w&&!Qe,Ze=te&&typeof window=="object"&&typeof document=="object"&&typeof document.createElement=="function"&&typeof sessionStorage=="object"&&typeof importScripts!="function",et=te&&typeof importScripts=="function"&&typeof self=="object";typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome")==-1&&navigator.userAgent.indexOf("Safari")>-1;var re,A,ne,V,C;async function U(){if(!w||(re=(await import("./chunks/__vite-browser-external-9wXp6ZBx.js")).default,V=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),C=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),ne=(await import("./chunks/__vite-browser-external-9wXp6ZBx.js")).default,A=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),z=A.sep,typeof Q<"u"))return;let e=V,t=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),n=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),i=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),s={fs:e,crypto:t,ws:n,child_process:i};globalThis.require=function(a){return s[a]}}m(U,"initNodeModules");function ae(e,t){return A.resolve(t||".",e)}m(ae,"node_resolvePath");function ie(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}m(ie,"browser_resolvePath");var D;w?D=ae:D=ie;var z;w||(z="/");function oe(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:fetch(e)}:{binary:C.readFile(e).then(n=>new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}}m(oe,"node_getBinaryResponse");function se(e,t){let n=new URL(e,location);return{response:fetch(n,t?{integrity:t}:{})}}m(se,"browser_getBinaryResponse");var P;w?P=oe:P=se;async function ce(e,t){let{response:n,binary:i}=P(e,t);if(i)return i;let s=await n;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}m(ce,"loadBinaryFile");var x;if(Ze)x=m(async e=>await import(e),"loadScript");else if(et)x=m(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(w)x=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?ne.runInThisContext(await(await fetch(e)).text()):await import(re.pathToFileURL(e).href)}m(le,"nodeLoadScript");async function ue(e){if(w){await U();let t=await C.readFile(e,{encoding:"utf8"});return JSON.parse(t)}else return await(await fetch(e)).json()}m(ue,"loadLockFile");async function fe(){if(ee)return __dirname;let e;try{throw new Error}catch(i){e=i}let t=Xe.default.parse(e)[0].fileName;if(Ke){let i=await import("./chunks/__vite-browser-external-9wXp6ZBx.js");return(await import("./chunks/__vite-browser-external-9wXp6ZBx.js")).fileURLToPath(i.dirname(t))}let n=t.lastIndexOf(z);if(n===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,n)}m(fe,"calculateDirname");function de(e){let t=e.FS,n=e.FS.filesystems.MEMFS,i=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(a){if(!a.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return n.mount.apply(null,arguments)},syncfs:async(a,r,l)=>{try{let o=s.getLocalSet(a),u=await s.getRemoteSet(a),c=r?u:o,f=r?o:u;await s.reconcile(a,c,f),l(null)}catch(o){l(o)}},getLocalSet:a=>{let r=Object.create(null);function l(c){return c!=="."&&c!==".."}m(l,"isRealDir");function o(c){return f=>i.join2(c,f)}m(o,"toAbsolute");let u=t.readdir(a.mountpoint).filter(l).map(o(a.mountpoint));for(;u.length;){let c=u.pop(),f=t.stat(c);t.isDir(f.mode)&&u.push.apply(u,t.readdir(c).filter(l).map(o(c))),r[c]={timestamp:f.mtime,mode:f.mode}}return{type:"local",entries:r}},getRemoteSet:async a=>{let r=Object.create(null),l=await tt(a.opts.fileSystemHandle);for(let[o,u]of l)o!=="."&&(r[i.join2(a.mountpoint,o)]={timestamp:u.kind==="file"?(await u.getFile()).lastModifiedDate:new Date,mode:u.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:r,handles:l}},loadLocalEntry:a=>{let r=t.lookupPath(a).node,l=t.stat(a);if(t.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(t.isFile(l.mode))return r.contents=n.getFileDataAsTypedArray(r),{timestamp:l.mtime,mode:l.mode,contents:r.contents};throw new Error("node type not supported")},storeLocalEntry:(a,r)=>{if(t.isDir(r.mode))t.mkdirTree(a,r.mode);else if(t.isFile(r.mode))t.writeFile(a,r.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(a,r.mode),t.utime(a,r.timestamp,r.timestamp)},removeLocalEntry:a=>{var r=t.stat(a);t.isDir(r.mode)?t.rmdir(a):t.isFile(r.mode)&&t.unlink(a)},loadRemoteEntry:async a=>{if(a.kind==="file"){let r=await a.getFile();return{contents:new Uint8Array(await r.arrayBuffer()),mode:s.FILE_MODE,timestamp:r.lastModifiedDate}}else{if(a.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+a.kind)}},storeRemoteEntry:async(a,r,l)=>{let o=a.get(i.dirname(r)),u=t.isFile(l.mode)?await o.getFileHandle(i.basename(r),{create:!0}):await o.getDirectoryHandle(i.basename(r),{create:!0});if(u.kind==="file"){let c=await u.createWritable();await c.write(l.contents),await c.close()}a.set(r,u)},removeRemoteEntry:async(a,r)=>{await a.get(i.dirname(r)).removeEntry(i.basename(r)),a.delete(r)},reconcile:async(a,r,l)=>{let o=0,u=[];Object.keys(r.entries).forEach(function(d){let y=r.entries[d],g=l.entries[d];(!g||t.isFile(y.mode)&&y.timestamp.getTime()>g.timestamp.getTime())&&(u.push(d),o++)}),u.sort();let c=[];if(Object.keys(l.entries).forEach(function(d){r.entries[d]||(c.push(d),o++)}),c.sort().reverse(),!o)return;let f=r.type==="remote"?r.handles:l.handles;for(let d of u){let y=i.normalize(d.replace(a.mountpoint,"/")).substring(1);if(l.type==="local"){let g=f.get(y),p=await s.loadRemoteEntry(g);s.storeLocalEntry(d,p)}else{let g=s.loadLocalEntry(d);await s.storeRemoteEntry(f,y,g)}}for(let d of c)if(l.type==="local")s.removeLocalEntry(d);else{let y=i.normalize(d.replace(a.mountpoint,"/")).substring(1);await s.removeRemoteEntry(f,y)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}m(de,"initializeNativeFS");var tt=m(async e=>{let t=[];async function n(s){for await(let a of s.values())t.push(a),a.kind==="directory"&&await n(a)}m(n,"collect"),await n(e);let i=new Map;i.set(".",e);for(let s of t){let a=(await e.resolve(s)).join("/");i.set(a,s)}return i},"getFsHandles");function pe(e){let t={noImageDecoding:!0,noAudioDecoding:!0,noWasmDecoding:!1,preRun:we(e),quit(n,i){throw t.exited={status:n,toThrow:i},i},print:e.stdout,printErr:e.stderr,arguments:e.args,API:{config:e},locateFile:n=>e.indexURL+n,instantiateWasm:be(e.indexURL)};return t}m(pe,"createSettings");function me(e){return function(t){let n="/";try{t.FS.mkdirTree(e)}catch(i){console.error(`Error occurred while making a home directory '${e}':`),console.error(i),console.error(`Using '${n}' for a home directory instead`),e=n}t.FS.chdir(e)}}m(me,"createHomeDirectory");function ye(e){return function(t){Object.assign(t.ENV,e)}}m(ye,"setEnvironment");function he(e){return t=>{for(let n of e)t.FS.mkdirTree(n),t.FS.mount(t.FS.filesystems.NODEFS,{root:n},n)}}m(he,"mountLocalDirectories");function ge(e){let t=ce(e);return n=>{let i=n._py_version_major(),s=n._py_version_minor();n.FS.mkdirTree("/lib"),n.FS.mkdirTree(`/lib/python${i}.${s}/site-packages`),n.addRunDependency("install-stdlib"),t.then(a=>{n.FS.writeFile(`/lib/python${i}${s}.zip`,a)}).catch(a=>{console.error("Error occurred while installing the standard library:"),console.error(a)}).finally(()=>{n.removeRunDependency("install-stdlib")})}}m(ge,"installStdlib");function we(e){let t;return e.stdLibURL!=null?t=e.stdLibURL:t=e.indexURL+"python_stdlib.zip",[ge(t),me(e.env.HOME),ye(e.env),he(e._node_mounts),de]}m(we,"getFileSystemInitializationFuncs");function be(e){let{binary:t,response:n}=P(e+"pyodide.asm.wasm");return function(i,s){return async function(){try{let a;n?a=await WebAssembly.instantiateStreaming(n,i):a=await WebAssembly.instantiate(await t,i);let{instance:r,module:l}=a;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,l)),s(r,l)}catch(a){console.warn("wasm instantiation failed!"),console.warn(a)}}(),{}}}m(be,"getInstantiateWasmFunc");var B="0.26.1";async function ve(e={}){await U();let t=e.indexURL||await fe();t=D(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let n={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[],enableRunUntilComplete:!1},i=Object.assign(n,e);i.env.HOME||(i.env.HOME="/home/pyodide");let s=pe(i),a=s.API;if(a.lockFilePromise=ue(i.lockFileURL),typeof _createPyodideModule!="function"){let c=`${i.indexURL}pyodide.asm.js`;await x(c)}let r;if(e._loadSnapshot){let c=await e._loadSnapshot;ArrayBuffer.isView(c)?r=c:r=new Uint8Array(c),s.noInitialRun=!0,s.INITIAL_MEMORY=r.length}let l=await _createPyodideModule(s);if(s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&a.setPyProxyToStringMethod(!0),a.version!==B)throw new Error(`Pyodide version does not match: '${B}' <==> '${a.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);l.locateFile=c=>{throw new Error("Didn't expect to load any more file_packager files!")};let o;r&&(o=a.restoreSnapshot(r));let u=a.finalizeBootstrap(o);return a.sys.path.insert(0,a.config.env.HOME),u.version.includes("dev")||a.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${u.version}/full/`),a._pyodide.set_excepthook(),await a.packageIndexReady,a.initializeStreams(i.stdin,i.stdout,i.stderr),u}m(ve,"loadPyodide");class rt{constructor(){_(this,"pyodide");_(this,"backend");this.pyodide=null,this.backend=null}async loadInput(t,n){n("Loading pyodide"),this.pyodide=await ve({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"}),n("Installing haversine through micropip"),await this.pyodide.loadPackage("micropip"),await this.pyodide.pyimport("micropip").install("haversine"),n("Downloading backend code");let a=await(await fetch("/backend.py")).text();this.pyodide.runPython(a),n("Constructing the backend object with the input"),this.backend=this.pyodide.globals.get("Backend")(t)}unset(){this.backend=null}isLoaded(){return this.pyodide!=null&&this.backend!=null}exampleCall(t){if(!this.pyodide)throw new Error("Backend used before ready");let n=this.backend.exampleCall(t.center,t.distanceMeters);return JSON.parse(n)}}M(rt)});export default nt();