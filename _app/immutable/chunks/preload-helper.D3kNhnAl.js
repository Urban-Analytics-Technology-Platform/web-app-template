import{k as C,H as $,l as k,o as L,q as w,E as x,h as B,v as N,d as S,w as U,S as Y,x as F,y as z,L as G,P as H,z as M,g as E,s as V,A as W,B as Z,C as I,D as j,F as J,m as K,c as P,G as R,b as Q,i as X}from"./runtime.BRhglTBZ.js";import{h as ee,r as te,g as T,i as re}from"./disclose-version.CU51-J4l.js";function ce(e,t,s,i=null,u=!1){var r=null,n=null,l=null,a=u?x:0;C(()=>{if(l===(l=!!t()))return;let o=!1;if(ee){const _=e.data===$;l===_&&(te(re),T(!1),o=!0)}l?(r?k(r):r=L(()=>s(e)),n&&w(n,()=>{n=null})):(n?k(n):i&&(n=L(()=>i(e))),r&&w(r,()=>{r=null})),o&&T(!0)},a)}function q(e,t){var i;var s=e&&((i=e[Y])==null?void 0:i.t);return e===t||s===t}function oe(e,t,s,i){B(()=>{var u,r;return N(()=>{u=r,r=[],S(()=>{e!==s(...r)&&(t(e,...r),u&&q(s(...u),e)&&t(null,...u))})}),()=>{U(()=>{r&&q(s(...r),e)&&t(null,...r)})}})}function ve(e,t,s,i){var p;var u=(s&W)!==0,r=(s&Z)!==0,n=(s&J)!==0,l=e[t],a=(p=F(e,t))==null?void 0:p.set,o=i,_=!0,g=()=>(n&&_&&(_=!1,o=S(i)),o);l===void 0&&i!==void 0&&(a&&r&&z(),l=g(),a&&a(l));var f;if(r)f=()=>{var c=e[t];return c===void 0?g():(_=!0,c)};else{var v=(u?I:j)(()=>e[t]);v.f|=G,f=()=>{var c=E(v);return c!==void 0&&(o=void 0),c===void 0?o:c}}if(!(s&H))return f;if(a){var d=e.$$legacy;return function(c,h){return arguments.length>0?((!r||!h||d)&&a(h?f():c),c):f()}}var y=!1,b=K(l),m=I(()=>{var c=f(),h=E(b);return y?(y=!1,h):b.v=c});return u||(m.equals=M),function(c,h){var O=E(m);if(arguments.length>0){const A=h?E(m):c;return m.equals(A)||(y=!0,V(b,A),E(m)),c}return O}}function ne(e){P===null&&R(),P.l!==null?ae(P).m.push(e):Q(()=>{const t=S(e);if(typeof t=="function")return t})}function _e(e){P===null&&R(),ne(()=>()=>S(e))}function se(e,t,{bubbles:s=!1,cancelable:i=!1}={}){return new CustomEvent(e,{detail:t,bubbles:s,cancelable:i})}function de(){const e=P;return e===null&&R(),(t,s,i)=>{var r;const u=(r=e.s.$$events)==null?void 0:r[t];if(u){const n=X(u)?u.slice():[u],l=se(t,s,i);for(const a of n)a.call(e.x,l);return!l.defaultPrevented}return!0}}function ae(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}const ie="modulepreload",ue=function(e,t){return new URL(e,t).href},D={},he=function(t,s,i){let u=Promise.resolve();if(s&&s.length>0){const r=document.getElementsByTagName("link"),n=document.querySelector("meta[property=csp-nonce]"),l=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));u=Promise.all(s.map(a=>{if(a=ue(a,i),a in D)return;D[a]=!0;const o=a.endsWith(".css"),_=o?'[rel="stylesheet"]':"";if(!!i)for(let v=r.length-1;v>=0;v--){const d=r[v];if(d.href===a&&(!o||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${_}`))return;const f=document.createElement("link");if(f.rel=o?"stylesheet":ie,o||(f.as="script",f.crossOrigin=""),f.href=a,l&&f.setAttribute("nonce",l),document.head.appendChild(f),o)return new Promise((v,d)=>{f.addEventListener("load",v),f.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${a}`)))})}))}return u.then(()=>t()).catch(r=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=r,window.dispatchEvent(n),!n.defaultPrevented)throw r})};export{he as _,_e as a,oe as b,de as c,ce as i,ne as o,ve as p};
