var xe=Object.defineProperty;var Fe=(e,t,n)=>t in e?xe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Le=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var R=(e,t,n)=>Fe(e,typeof t!="symbol"?t+"":t,n);var nt=Le((at,D)=>{/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const B=Symbol("Comlink.proxy"),Pe=Symbol("Comlink.endpoint"),_e=Symbol("Comlink.releaseProxy"),j=Symbol("Comlink.finalizer"),k=Symbol("Comlink.thrown"),Y=e=>typeof e=="object"&&e!==null||typeof e=="function",Ne={canHandle:e=>Y(e)&&e[B],serialize(e){const{port1:t,port2:n}=new MessageChannel;return M(e,t),[n,[n]]},deserialize(e){return e.start(),Ae(e)}},Re={canHandle:e=>Y(e)&&k in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},G=new Map([["proxy",Ne],["throw",Re]]);function je(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function M(e,t=globalThis,n=["*"]){t.addEventListener("message",function a(s){if(!s||!s.data)return;if(!je(n,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:i,type:r,path:l}=Object.assign({path:[]},s.data),o=(s.data.argumentList||[]).map(b);let u;try{const c=l.slice(0,-1).reduce((d,y)=>d[y],e),f=l.reduce((d,y)=>d[y],e);switch(r){case"GET":u=f;break;case"SET":c[l.slice(-1)[0]]=b(s.data.value),u=!0;break;case"APPLY":u=f.apply(c,o);break;case"CONSTRUCT":{const d=new f(...o);u=Ce(d)}break;case"ENDPOINT":{const{port1:d,port2:y}=new MessageChannel;M(e,y),u=Ie(d,[d])}break;case"RELEASE":u=void 0;break;default:return}}catch(c){u={value:c,[k]:0}}Promise.resolve(u).catch(c=>({value:c,[k]:0})).then(c=>{const[f,d]=P(c);t.postMessage(Object.assign(Object.assign({},f),{id:i}),d),r==="RELEASE"&&(t.removeEventListener("message",a),J(t),j in e&&typeof e[j]=="function"&&e[j]())}).catch(c=>{const[f,d]=P({value:new TypeError("Unserializable return value"),[k]:0});t.postMessage(Object.assign(Object.assign({},f),{id:i}),d)})}),t.start&&t.start()}function Te(e){return e.constructor.name==="MessagePort"}function J(e){Te(e)&&e.close()}function Ae(e,t){return T(e,[],t)}function O(e){if(e)throw new Error("Proxy has been released and is not useable")}function X(e){return E(e,{type:"RELEASE"}).then(()=>{J(e)})}const F=new WeakMap,L="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(F.get(e)||0)-1;F.set(e,t),t===0&&X(e)});function $e(e,t){const n=(F.get(t)||0)+1;F.set(t,n),L&&L.register(e,t,e)}function De(e){L&&L.unregister(e)}function T(e,t=[],n=function(){}){let a=!1;const s=new Proxy(n,{get(i,r){if(O(a),r===_e)return()=>{De(s),X(e),a=!0};if(r==="then"){if(t.length===0)return{then:()=>s};const l=E(e,{type:"GET",path:t.map(o=>o.toString())}).then(b);return l.then.bind(l)}return T(e,[...t,r])},set(i,r,l){O(a);const[o,u]=P(l);return E(e,{type:"SET",path:[...t,r].map(c=>c.toString()),value:o},u).then(b)},apply(i,r,l){O(a);const o=t[t.length-1];if(o===Pe)return E(e,{type:"ENDPOINT"}).then(b);if(o==="bind")return T(e,t.slice(0,-1));const[u,c]=W(l);return E(e,{type:"APPLY",path:t.map(f=>f.toString()),argumentList:u},c).then(b)},construct(i,r){O(a);const[l,o]=W(r);return E(e,{type:"CONSTRUCT",path:t.map(u=>u.toString()),argumentList:l},o).then(b)}});return $e(s,e),s}function Me(e){return Array.prototype.concat.apply([],e)}function W(e){const t=e.map(P);return[t.map(n=>n[0]),Me(t.map(n=>n[1]))]}const K=new WeakMap;function Ie(e,t){return K.set(e,t),e}function Ce(e){return Object.assign(e,{[B]:!0})}function P(e){for(const[t,n]of G)if(n.canHandle(e)){const[a,s]=n.serialize(e);return[{type:"HANDLER",name:t,value:a},s]}return[{type:"RAW",value:e},K.get(e)||[]]}function b(e){switch(e.type){case"HANDLER":return G.get(e.name).deserialize(e.value);case"RAW":return e.value}}function E(e,t,n){return new Promise(a=>{const s=Ue();e.addEventListener("message",function i(r){!r.data||!r.data.id||r.data.id!==s||(e.removeEventListener("message",i),a(r.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},t),n)})}function Ue(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}var ze=Object.create,I=Object.defineProperty,He=Object.getOwnPropertyDescriptor,We=Object.getOwnPropertyNames,Ve=Object.getPrototypeOf,qe=Object.prototype.hasOwnProperty,m=(e,t)=>I(e,"name",{value:t,configurable:!0}),Q=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')}),Z=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Be=(e,t,n,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of We(t))!qe.call(e,s)&&s!==n&&I(e,s,{get:()=>t[s],enumerable:!(a=He(t,s))||a.enumerable});return e},Ye=(e,t,n)=>(n=e!=null?ze(Ve(e)):{},Be(!e||!e.__esModule?I(n,"default",{value:e,enumerable:!0}):n,e)),Ge=Z((e,t)=>{(function(n,a){typeof define=="function"&&define.amd?define("stackframe",[],a):typeof e=="object"?t.exports=a():n.StackFrame=a()})(e,function(){function n(p){return!isNaN(parseFloat(p))&&isFinite(p)}m(n,"_isNumber");function a(p){return p.charAt(0).toUpperCase()+p.substring(1)}m(a,"_capitalize");function s(p){return function(){return this[p]}}m(s,"_getter");var i=["isConstructor","isEval","isNative","isToplevel"],r=["columnNumber","lineNumber"],l=["fileName","functionName","source"],o=["args"],u=["evalOrigin"],c=i.concat(r,l,o,u);function f(p){if(p)for(var g=0;g<c.length;g++)p[c[g]]!==void 0&&this["set"+a(c[g])](p[c[g]])}m(f,"StackFrame"),f.prototype={getArgs:function(){return this.args},setArgs:function(p){if(Object.prototype.toString.call(p)!=="[object Array]")throw new TypeError("Args must be an Array");this.args=p},getEvalOrigin:function(){return this.evalOrigin},setEvalOrigin:function(p){if(p instanceof f)this.evalOrigin=p;else if(p instanceof Object)this.evalOrigin=new f(p);else throw new TypeError("Eval Origin must be an Object or StackFrame")},toString:function(){var p=this.getFileName()||"",g=this.getLineNumber()||"",v=this.getColumnNumber()||"",S=this.getFunctionName()||"";return this.getIsEval()?p?"[eval] ("+p+":"+g+":"+v+")":"[eval]:"+g+":"+v:S?S+" ("+p+":"+g+":"+v+")":p+":"+g+":"+v}},f.fromString=m(function(p){var g=p.indexOf("("),v=p.lastIndexOf(")"),S=p.substring(0,g),Ee=p.substring(g+1,v).split(","),H=p.substring(v+1);if(H.indexOf("@")===0)var N=/@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(H,""),Se=N[1],Oe=N[2],ke=N[3];return new f({functionName:S,args:Ee||void 0,fileName:Se,lineNumber:Oe||void 0,columnNumber:ke||void 0})},"StackFrame$$fromString");for(var d=0;d<i.length;d++)f.prototype["get"+a(i[d])]=s(i[d]),f.prototype["set"+a(i[d])]=function(p){return function(g){this[p]=!!g}}(i[d]);for(var y=0;y<r.length;y++)f.prototype["get"+a(r[y])]=s(r[y]),f.prototype["set"+a(r[y])]=function(p){return function(g){if(!n(g))throw new TypeError(p+" must be a Number");this[p]=Number(g)}}(r[y]);for(var h=0;h<l.length;h++)f.prototype["get"+a(l[h])]=s(l[h]),f.prototype["set"+a(l[h])]=function(p){return function(g){this[p]=String(g)}}(l[h]);return f})}),Je=Z((e,t)=>{(function(n,a){typeof define=="function"&&define.amd?define("error-stack-parser",["stackframe"],a):typeof e=="object"?t.exports=a(Ge()):n.ErrorStackParser=a(n.StackFrame)})(e,m(function(n){var a=/(^|@)\S+:\d+/,s=/^\s*at .*(\S+:\d+|\(native\))/m,i=/^(eval@)?(\[native code])?$/;return{parse:m(function(r){if(typeof r.stacktrace<"u"||typeof r["opera#sourceloc"]<"u")return this.parseOpera(r);if(r.stack&&r.stack.match(s))return this.parseV8OrIE(r);if(r.stack)return this.parseFFOrSafari(r);throw new Error("Cannot parse given Error object")},"ErrorStackParser$$parse"),extractLocation:m(function(r){if(r.indexOf(":")===-1)return[r];var l=/(.+?)(?::(\d+))?(?::(\d+))?$/,o=l.exec(r.replace(/[()]/g,""));return[o[1],o[2]||void 0,o[3]||void 0]},"ErrorStackParser$$extractLocation"),parseV8OrIE:m(function(r){var l=r.stack.split(`
`).filter(function(o){return!!o.match(s)},this);return l.map(function(o){o.indexOf("(eval ")>-1&&(o=o.replace(/eval code/g,"eval").replace(/(\(eval at [^()]*)|(,.*$)/g,""));var u=o.replace(/^\s+/,"").replace(/\(eval code/g,"(").replace(/^.*?\s+/,""),c=u.match(/ (\(.+\)$)/);u=c?u.replace(c[0],""):u;var f=this.extractLocation(c?c[1]:u),d=c&&u||void 0,y=["eval","<anonymous>"].indexOf(f[0])>-1?void 0:f[0];return new n({functionName:d,fileName:y,lineNumber:f[1],columnNumber:f[2],source:o})},this)},"ErrorStackParser$$parseV8OrIE"),parseFFOrSafari:m(function(r){var l=r.stack.split(`
`).filter(function(o){return!o.match(i)},this);return l.map(function(o){if(o.indexOf(" > eval")>-1&&(o=o.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g,":$1")),o.indexOf("@")===-1&&o.indexOf(":")===-1)return new n({functionName:o});var u=/((.*".+"[^@]*)?[^@]*)(?:@)/,c=o.match(u),f=c&&c[1]?c[1]:void 0,d=this.extractLocation(o.replace(u,""));return new n({functionName:f,fileName:d[0],lineNumber:d[1],columnNumber:d[2],source:o})},this)},"ErrorStackParser$$parseFFOrSafari"),parseOpera:m(function(r){return!r.stacktrace||r.message.indexOf(`
`)>-1&&r.message.split(`
`).length>r.stacktrace.split(`
`).length?this.parseOpera9(r):r.stack?this.parseOpera11(r):this.parseOpera10(r)},"ErrorStackParser$$parseOpera"),parseOpera9:m(function(r){for(var l=/Line (\d+).*script (?:in )?(\S+)/i,o=r.message.split(`
`),u=[],c=2,f=o.length;c<f;c+=2){var d=l.exec(o[c]);d&&u.push(new n({fileName:d[2],lineNumber:d[1],source:o[c]}))}return u},"ErrorStackParser$$parseOpera9"),parseOpera10:m(function(r){for(var l=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,o=r.stacktrace.split(`
`),u=[],c=0,f=o.length;c<f;c+=2){var d=l.exec(o[c]);d&&u.push(new n({functionName:d[3]||void 0,fileName:d[2],lineNumber:d[1],source:o[c]}))}return u},"ErrorStackParser$$parseOpera10"),parseOpera11:m(function(r){var l=r.stack.split(`
`).filter(function(o){return!!o.match(a)&&!o.match(/^Error created at/)},this);return l.map(function(o){var u=o.split("@"),c=this.extractLocation(u.pop()),f=u.shift()||"",d=f.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^)]*\)/g,"")||void 0,y;f.match(/\(([^)]*)\)/)&&(y=f.replace(/^[^(]+\(([^)]*)\)$/,"$1"));var h=y===void 0||y==="[arguments not available]"?void 0:y.split(",");return new n({functionName:d,args:h,fileName:c[0],lineNumber:c[1],columnNumber:c[2],source:o})},this)},"ErrorStackParser$$parseOpera11")}},"ErrorStackParser"))}),Xe=Ye(Je()),w=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"&&typeof process.browser>"u",ee=w&&typeof D<"u"&&typeof D.exports<"u"&&typeof Q<"u"&&typeof __dirname<"u",Ke=w&&!ee,Qe=typeof Deno<"u",te=!w&&!Qe,Ze=te&&typeof window=="object"&&typeof document=="object"&&typeof document.createElement=="function"&&typeof sessionStorage=="object"&&typeof importScripts!="function",et=te&&typeof importScripts=="function"&&typeof self=="object";typeof navigator=="object"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome")==-1&&navigator.userAgent.indexOf("Safari")>-1;var re,A,ne,V,C;async function U(){if(!w||(re=(await import("./chunks/__vite-browser-external-9wXp6ZBx.js")).default,V=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),C=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),ne=(await import("./chunks/__vite-browser-external-9wXp6ZBx.js")).default,A=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),z=A.sep,typeof Q<"u"))return;let e=V,t=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),n=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),a=await import("./chunks/__vite-browser-external-9wXp6ZBx.js"),s={fs:e,crypto:t,ws:n,child_process:a};globalThis.require=function(i){return s[i]}}m(U,"initNodeModules");function ie(e,t){return A.resolve(t||".",e)}m(ie,"node_resolvePath");function ae(e,t){return t===void 0&&(t=location),new URL(e,t).toString()}m(ae,"browser_resolvePath");var $;w?$=ie:$=ae;var z;w||(z="/");function oe(e,t){return e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?{response:fetch(e)}:{binary:C.readFile(e).then(n=>new Uint8Array(n.buffer,n.byteOffset,n.byteLength))}}m(oe,"node_getBinaryResponse");function se(e,t){let n=new URL(e,location);return{response:fetch(n,t?{integrity:t}:{})}}m(se,"browser_getBinaryResponse");var _;w?_=oe:_=se;async function ce(e,t){let{response:n,binary:a}=_(e,t);if(a)return a;let s=await n;if(!s.ok)throw new Error(`Failed to load '${e}': request failed.`);return new Uint8Array(await s.arrayBuffer())}m(ce,"loadBinaryFile");var x;if(Ze)x=m(async e=>await import(e),"loadScript");else if(et)x=m(async e=>{try{globalThis.importScripts(e)}catch(t){if(t instanceof TypeError)await import(e);else throw t}},"loadScript");else if(w)x=le;else throw new Error("Cannot determine runtime environment");async function le(e){e.startsWith("file://")&&(e=e.slice(7)),e.includes("://")?ne.runInThisContext(await(await fetch(e)).text()):await import(re.pathToFileURL(e).href)}m(le,"nodeLoadScript");async function ue(e){if(w){await U();let t=await C.readFile(e,{encoding:"utf8"});return JSON.parse(t)}else return await(await fetch(e)).json()}m(ue,"loadLockFile");async function fe(){if(ee)return __dirname;let e;try{throw new Error}catch(a){e=a}let t=Xe.default.parse(e)[0].fileName;if(Ke){let a=await import("./chunks/__vite-browser-external-9wXp6ZBx.js");return(await import("./chunks/__vite-browser-external-9wXp6ZBx.js")).fileURLToPath(a.dirname(t))}let n=t.lastIndexOf(z);if(n===-1)throw new Error("Could not extract indexURL path from pyodide module location");return t.slice(0,n)}m(fe,"calculateDirname");function de(e){let t=e.FS,n=e.FS.filesystems.MEMFS,a=e.PATH,s={DIR_MODE:16895,FILE_MODE:33279,mount:function(i){if(!i.opts.fileSystemHandle)throw new Error("opts.fileSystemHandle is required");return n.mount.apply(null,arguments)},syncfs:async(i,r,l)=>{try{let o=s.getLocalSet(i),u=await s.getRemoteSet(i),c=r?u:o,f=r?o:u;await s.reconcile(i,c,f),l(null)}catch(o){l(o)}},getLocalSet:i=>{let r=Object.create(null);function l(c){return c!=="."&&c!==".."}m(l,"isRealDir");function o(c){return f=>a.join2(c,f)}m(o,"toAbsolute");let u=t.readdir(i.mountpoint).filter(l).map(o(i.mountpoint));for(;u.length;){let c=u.pop(),f=t.stat(c);t.isDir(f.mode)&&u.push.apply(u,t.readdir(c).filter(l).map(o(c))),r[c]={timestamp:f.mtime,mode:f.mode}}return{type:"local",entries:r}},getRemoteSet:async i=>{let r=Object.create(null),l=await tt(i.opts.fileSystemHandle);for(let[o,u]of l)o!=="."&&(r[a.join2(i.mountpoint,o)]={timestamp:u.kind==="file"?(await u.getFile()).lastModifiedDate:new Date,mode:u.kind==="file"?s.FILE_MODE:s.DIR_MODE});return{type:"remote",entries:r,handles:l}},loadLocalEntry:i=>{let r=t.lookupPath(i).node,l=t.stat(i);if(t.isDir(l.mode))return{timestamp:l.mtime,mode:l.mode};if(t.isFile(l.mode))return r.contents=n.getFileDataAsTypedArray(r),{timestamp:l.mtime,mode:l.mode,contents:r.contents};throw new Error("node type not supported")},storeLocalEntry:(i,r)=>{if(t.isDir(r.mode))t.mkdirTree(i,r.mode);else if(t.isFile(r.mode))t.writeFile(i,r.contents,{canOwn:!0});else throw new Error("node type not supported");t.chmod(i,r.mode),t.utime(i,r.timestamp,r.timestamp)},removeLocalEntry:i=>{var r=t.stat(i);t.isDir(r.mode)?t.rmdir(i):t.isFile(r.mode)&&t.unlink(i)},loadRemoteEntry:async i=>{if(i.kind==="file"){let r=await i.getFile();return{contents:new Uint8Array(await r.arrayBuffer()),mode:s.FILE_MODE,timestamp:r.lastModifiedDate}}else{if(i.kind==="directory")return{mode:s.DIR_MODE,timestamp:new Date};throw new Error("unknown kind: "+i.kind)}},storeRemoteEntry:async(i,r,l)=>{let o=i.get(a.dirname(r)),u=t.isFile(l.mode)?await o.getFileHandle(a.basename(r),{create:!0}):await o.getDirectoryHandle(a.basename(r),{create:!0});if(u.kind==="file"){let c=await u.createWritable();await c.write(l.contents),await c.close()}i.set(r,u)},removeRemoteEntry:async(i,r)=>{await i.get(a.dirname(r)).removeEntry(a.basename(r)),i.delete(r)},reconcile:async(i,r,l)=>{let o=0,u=[];Object.keys(r.entries).forEach(function(d){let y=r.entries[d],h=l.entries[d];(!h||t.isFile(y.mode)&&y.timestamp.getTime()>h.timestamp.getTime())&&(u.push(d),o++)}),u.sort();let c=[];if(Object.keys(l.entries).forEach(function(d){r.entries[d]||(c.push(d),o++)}),c.sort().reverse(),!o)return;let f=r.type==="remote"?r.handles:l.handles;for(let d of u){let y=a.normalize(d.replace(i.mountpoint,"/")).substring(1);if(l.type==="local"){let h=f.get(y),p=await s.loadRemoteEntry(h);s.storeLocalEntry(d,p)}else{let h=s.loadLocalEntry(d);await s.storeRemoteEntry(f,y,h)}}for(let d of c)if(l.type==="local")s.removeLocalEntry(d);else{let y=a.normalize(d.replace(i.mountpoint,"/")).substring(1);await s.removeRemoteEntry(f,y)}}};e.FS.filesystems.NATIVEFS_ASYNC=s}m(de,"initializeNativeFS");var tt=m(async e=>{let t=[];async function n(s){for await(let i of s.values())t.push(i),i.kind==="directory"&&await n(i)}m(n,"collect"),await n(e);let a=new Map;a.set(".",e);for(let s of t){let i=(await e.resolve(s)).join("/");a.set(i,s)}return a},"getFsHandles");function pe(e){let t={noImageDecoding:!0,noAudioDecoding:!0,noWasmDecoding:!1,preRun:we(e),quit(n,a){throw t.exited={status:n,toThrow:a},a},print:e.stdout,printErr:e.stderr,arguments:e.args,API:{config:e},locateFile:n=>e.indexURL+n,instantiateWasm:ve(e.indexURL)};return t}m(pe,"createSettings");function me(e){return function(t){let n="/";try{t.FS.mkdirTree(e)}catch(a){console.error(`Error occurred while making a home directory '${e}':`),console.error(a),console.error(`Using '${n}' for a home directory instead`),e=n}t.FS.chdir(e)}}m(me,"createHomeDirectory");function ye(e){return function(t){Object.assign(t.ENV,e)}}m(ye,"setEnvironment");function ge(e){return t=>{for(let n of e)t.FS.mkdirTree(n),t.FS.mount(t.FS.filesystems.NODEFS,{root:n},n)}}m(ge,"mountLocalDirectories");function he(e){let t=ce(e);return n=>{let a=n._py_version_major(),s=n._py_version_minor();n.FS.mkdirTree("/lib"),n.FS.mkdirTree(`/lib/python${a}.${s}/site-packages`),n.addRunDependency("install-stdlib"),t.then(i=>{n.FS.writeFile(`/lib/python${a}${s}.zip`,i)}).catch(i=>{console.error("Error occurred while installing the standard library:"),console.error(i)}).finally(()=>{n.removeRunDependency("install-stdlib")})}}m(he,"installStdlib");function we(e){let t;return e.stdLibURL!=null?t=e.stdLibURL:t=e.indexURL+"python_stdlib.zip",[he(t),me(e.env.HOME),ye(e.env),ge(e._node_mounts),de]}m(we,"getFileSystemInitializationFuncs");function ve(e){let{binary:t,response:n}=_(e+"pyodide.asm.wasm");return function(a,s){return async function(){try{let i;n?i=await WebAssembly.instantiateStreaming(n,a):i=await WebAssembly.instantiate(await t,a);let{instance:r,module:l}=i;typeof WasmOffsetConverter<"u"&&(wasmOffsetConverter=new WasmOffsetConverter(wasmBinary,l)),s(r,l)}catch(i){console.warn("wasm instantiation failed!"),console.warn(i)}}(),{}}}m(ve,"getInstantiateWasmFunc");var q="0.26.1";async function be(e={}){await U();let t=e.indexURL||await fe();t=$(t),t.endsWith("/")||(t+="/"),e.indexURL=t;let n={fullStdLib:!1,jsglobals:globalThis,stdin:globalThis.prompt?globalThis.prompt:void 0,lockFileURL:t+"pyodide-lock.json",args:[],_node_mounts:[],env:{},packageCacheDir:t,packages:[],enableRunUntilComplete:!1},a=Object.assign(n,e);a.env.HOME||(a.env.HOME="/home/pyodide");let s=pe(a),i=s.API;if(i.lockFilePromise=ue(a.lockFileURL),typeof _createPyodideModule!="function"){let c=`${a.indexURL}pyodide.asm.js`;await x(c)}let r;if(e._loadSnapshot){let c=await e._loadSnapshot;ArrayBuffer.isView(c)?r=c:r=new Uint8Array(c),s.noInitialRun=!0,s.INITIAL_MEMORY=r.length}let l=await _createPyodideModule(s);if(s.exited)throw s.exited.toThrow;if(e.pyproxyToStringRepr&&i.setPyProxyToStringMethod(!0),i.version!==q)throw new Error(`Pyodide version does not match: '${q}' <==> '${i.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.`);l.locateFile=c=>{throw new Error("Didn't expect to load any more file_packager files!")};let o;r&&(o=i.restoreSnapshot(r));let u=i.finalizeBootstrap(o);return i.sys.path.insert(0,i.config.env.HOME),u.version.includes("dev")||i.setCdnUrl(`https://cdn.jsdelivr.net/pyodide/v${u.version}/full/`),i._pyodide.set_excepthook(),await i.packageIndexReady,i.initializeStreams(a.stdin,a.stdout,a.stderr),u}m(be,"loadPyodide");class rt{constructor(){R(this,"pyodide");R(this,"pathname");this.pyodide=null,this.pathname=""}async initialise(t){this.pyodide=await be({indexURL:"https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"}),this.pathname=t,await this.pyodide.loadPackage("micropip");const n=this.pyodide.pyimport("micropip");await n.install(this.pathname+"my_python_module-0.0.1-py3-none-any.whl"),console.log(n.list())}isLoaded(){return this.pyodide!=null}addColours(t){if(!this.pyodide)throw new Error("Python backend not initialised");this.pyodide.globals.set("input_gj_string",JSON.stringify(t));const n=`
            from my_python_module import add_colours
            import json
            json.dumps(add_colours(json.loads(input_gj_string)))
        `;this.pyodide.loadPackagesFromImports(n);const a=this.pyodide.runPython(n);return console.log("PythonBackend.addColours result",a),JSON.parse(a)}}M(rt)});export default nt();
