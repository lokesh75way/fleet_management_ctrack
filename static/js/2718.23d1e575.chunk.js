"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[2718],{59153:(e,n,t)=>{var o=t(69484);Object.defineProperty(n,"M",{enumerable:!0,get:function(){return o.useScrollPosition}})},4120:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.useIsomorphicLayoutEffect=void 0;const o=t(78109);n.useIsomorphicLayoutEffect="undefined"!==typeof window?o.useLayoutEffect:o.useEffect},69484:(e,n,t)=>{Object.defineProperty(n,"__esModule",{value:!0}),n.useScrollPosition=void 0;const o=t(78109),r=t(4120),l="undefined"!==typeof window,i={x:0,y:0},u=e=>null===e||void 0===e?void 0:e.getBoundingClientRect(),s=e=>{let{element:n,useWindow:t,boundingElement:o}=e;if(!l)return i;if(t)return{x:window.scrollX,y:window.scrollY};const r=u((null===n||void 0===n?void 0:n.current)||document.body),s=u(null===o||void 0===o?void 0:o.current);return r?s?{x:(s.x||0)-(r.x||0),y:(s.y||0)-(r.y||0)}:{x:r.left,y:r.top}:i};n.useScrollPosition=(e,n,t,i,u,c)=>{const a=o.useRef(s({useWindow:i,boundingElement:c}));let d=null;const f=()=>{const n=s({element:t,useWindow:i,boundingElement:c});e({prevPos:a.current,currPos:n}),a.current=n,d=null};r.useIsomorphicLayoutEffect((()=>{var e;if(!l)return;const n=()=>{u?null===d&&(d=setTimeout(f,u)):f()};return c?null===(e=c.current)||void 0===e||e.addEventListener("scroll",n,{passive:!0}):window.addEventListener("scroll",n,{passive:!0}),()=>{var e;c?null===(e=c.current)||void 0===e||e.removeEventListener("scroll",n):window.removeEventListener("scroll",n),d&&clearTimeout(d)}}),n)},n.useScrollPosition.defaultProps={deps:[],element:!1,useWindow:!1,wait:null,boundingElement:!1}},40625:(e,n,t)=>{t.d(n,{A:()=>y});var o=t(79961),r=t.n(o),l=t(45805),i=t(78109),u=t(94339),s=t(11473),c=t(73845);const a=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.filter((e=>null!=e)).reduce(((e,n)=>{if("function"!==typeof n)throw new Error("Invalid Argument Type, must only provide functions, undefined, or null.");return null===e?n:function(){for(var t=arguments.length,o=new Array(t),r=0;r<t;r++)o[r]=arguments[r];e.apply(this,o),n.apply(this,o)}}),null)};var d=t(72188),f=t(78095),p=t(47337);const m={height:["marginTop","marginBottom"],width:["marginLeft","marginRight"]};function v(e,n){const t=n[`offset${e[0].toUpperCase()}${e.slice(1)}`],o=m[e];return t+parseInt((0,l.A)(n,o[0]),10)+parseInt((0,l.A)(n,o[1]),10)}const h={[u.kp]:"collapse",[u.ze]:"collapsing",[u.ns]:"collapsing",[u._K]:"collapse show"},y=i.forwardRef(((e,n)=>{let{onEnter:t,onEntering:o,onEntered:l,onExit:u,onExiting:m,className:y,children:E,dimension:g="height",in:w=!1,timeout:C=300,mountOnEnter:x=!1,unmountOnExit:b=!1,appear:M=!1,getDimensionValue:A=v,...L}=e;const V="function"===typeof g?g():g,H=(0,i.useMemo)((()=>a((e=>{e.style[V]="0"}),t)),[V,t]),P=(0,i.useMemo)((()=>a((e=>{const n=`scroll${V[0].toUpperCase()}${V.slice(1)}`;e.style[V]=`${e[n]}px`}),o)),[V,o]),O=(0,i.useMemo)((()=>a((e=>{e.style[V]=null}),l)),[V,l]),R=(0,i.useMemo)((()=>a((e=>{e.style[V]=`${A(V,e)}px`,(0,d.A)(e)}),u)),[u,A,V]),$=(0,i.useMemo)((()=>a((e=>{e.style[V]=null}),m)),[V,m]);return(0,p.jsx)(f.A,{ref:n,addEndListener:c.A,...L,"aria-expanded":L.role?w:null,onEnter:H,onEntering:P,onEntered:O,onExit:R,onExiting:$,childRef:(0,s.am)(E),in:w,timeout:C,mountOnEnter:x,unmountOnExit:b,appear:M,children:(e,n)=>i.cloneElement(E,{...n,className:r()(y,E.props.className,h[e],"width"===V&&"collapse-horizontal")})})}))},81765:(e,n,t)=>{function o(e){var n,t,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var l=e.length;for(n=0;n<l;n++)e[n]&&(t=o(e[n]))&&(r&&(r+=" "),r+=t)}else for(t in e)e[t]&&(r&&(r+=" "),r+=t);return r}function r(){for(var e,n,t=0,r="",l=arguments.length;t<l;t++)(e=arguments[t])&&(n=o(e))&&(r&&(r+=" "),r+=n);return r}t.d(n,{$:()=>r,A:()=>l});const l=r},61018:(e,n,t)=>{t.d(n,{e1C:()=>r});var o=t(25169);function r(e){return(0,o.k5)({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none"},child:[{tag:"path",attr:{fillRule:"evenodd",clipRule:"evenodd",d:"M19 4H5C4.44771 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44771 19.5523 4 19 4ZM5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V5C22 3.34315 20.6569 2 19 2H5Z",fill:"currentColor"},child:[]},{tag:"path",attr:{d:"M11 7H13V17H11V7Z",fill:"currentColor"},child:[]},{tag:"path",attr:{d:"M15 13H17V17H15V13Z",fill:"currentColor"},child:[]},{tag:"path",attr:{d:"M7 10H9V17H7V10Z",fill:"currentColor"},child:[]}]})(e)}}}]);
//# sourceMappingURL=2718.23d1e575.chunk.js.map