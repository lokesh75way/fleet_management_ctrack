"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[5674],{41337:(n,e,t)=>{t.d(e,{Z:()=>y});var r=t(13808),o=t(72791),i=t(53649),a=t(73201),l=t(74784),s=t(78633),c=t(90165),u=t(71306),d=t(24787),v=t(80184);const f=["as","onSelect","activeKey","role","onKeyDown"];const E=()=>{},x=(0,u.PB)("event-key"),b=o.forwardRef(((n,e)=>{let{as:t="div",onSelect:d,activeKey:b,role:y,onKeyDown:m}=n,g=function(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,f);const O=(0,i.Z)(),h=(0,o.useRef)(!1),p=(0,o.useContext)(s.Z),C=(0,o.useContext)(c.Z);let Z,j;C&&(y=y||"tablist",b=C.activeKey,Z=C.getControlledId,j=C.getControllerId);const P=(0,o.useRef)(null),K=n=>{const e=P.current;if(!e)return null;const t=(0,r.Z)(e,"[".concat(x,"]:not([aria-disabled=true])")),o=e.querySelector("[aria-selected=true]");if(!o||o!==document.activeElement)return null;const i=t.indexOf(o);if(-1===i)return null;let a=i+n;return a>=t.length&&(a=0),a<0&&(a=t.length-1),t[a]},w=(n,e)=>{null!=n&&(null==d||d(n,e),null==p||p(n,e))};(0,o.useEffect)((()=>{if(P.current&&h.current){const n=P.current.querySelector("[".concat(x,"][aria-selected=true]"));null==n||n.focus()}h.current=!1}));const k=(0,a.Z)(e,P);return(0,v.jsx)(s.Z.Provider,{value:w,children:(0,v.jsx)(l.Z.Provider,{value:{role:y,activeKey:(0,s.h)(b),getControlledId:Z||E,getControllerId:j||E},children:(0,v.jsx)(t,Object.assign({},g,{onKeyDown:n=>{if(null==m||m(n),!C)return;let e;switch(n.key){case"ArrowLeft":case"ArrowUp":e=K(-1);break;case"ArrowRight":case"ArrowDown":e=K(1);break;default:return}e&&(n.preventDefault(),w(e.dataset[(0,u.$F)("EventKey")]||null,n),h.current=!0,O())},ref:k,role:y}))})})}));b.displayName="Nav";const y=Object.assign(b,{Item:d.Z})},24787:(n,e,t)=>{t.d(e,{Z:()=>E,v:()=>v});var r=t(72791),o=t(39007),i=t(74784),a=t(78633),l=t(15341),s=t(71306),c=t(90165),u=t(80184);const d=["as","active","eventKey"];function v(n){let{key:e,onClick:t,active:l,id:u,role:d,disabled:v}=n;const f=(0,r.useContext)(a.Z),E=(0,r.useContext)(i.Z),x=(0,r.useContext)(c.Z);let b=l;const y={role:d};if(E){d||"tablist"!==E.role||(y.role="tab");const n=E.getControllerId(null!=e?e:null),t=E.getControlledId(null!=e?e:null);y[(0,s.PB)("event-key")]=e,y.id=n||u,b=null==l&&null!=e?E.activeKey===e:l,!b&&(null!=x&&x.unmountOnExit||null!=x&&x.mountOnEnter)||(y["aria-controls"]=t)}return"tab"===y.role&&(y["aria-selected"]=b,b||(y.tabIndex=-1),v&&(y.tabIndex=-1,y["aria-disabled"]=!0)),y.onClick=(0,o.Z)((n=>{v||(null==t||t(n),null!=e&&f&&!n.isPropagationStopped()&&f(e,n))})),[y,{isActive:b}]}const f=r.forwardRef(((n,e)=>{let{as:t=l.ZP,active:r,eventKey:o}=n,i=function(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,d);const[c,f]=v(Object.assign({key:(0,a.h)(o,i.href),active:r},i));return c[(0,s.PB)("active")]=f.isActive,(0,u.jsx)(t,Object.assign({},i,c,{ref:e}))}));f.displayName="NavItem";const E=f},90165:(n,e,t)=>{t.d(e,{Z:()=>r});const r=t(72791).createContext(null)},33573:(n,e,t)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(){for(var n=arguments.length,e=Array(n),t=0;t<n;t++)e[t]=arguments[t];return(0,i.default)((function(){for(var n=arguments.length,t=Array(n),r=0;r<n;r++)t[r]=arguments[r];var o=null;return e.forEach((function(n){if(null==o){var e=n.apply(void 0,t);null!=e&&(o=e)}})),o}))};var r,o=t(46054),i=(r=o)&&r.__esModule?r:{default:r};n.exports=e.default},46054:(n,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(n){function e(e,t,r,o,i,a){var l=o||"<<anonymous>>",s=a||r;if(null==t[r])return e?new Error("Required "+i+" `"+s+"` was not specified in `"+l+"`."):null;for(var c=arguments.length,u=Array(c>6?c-6:0),d=6;d<c;d++)u[d-6]=arguments[d];return n.apply(void 0,[t,r,l,i,s].concat(u))}var t=e.bind(null,!1);return t.isRequired=e.bind(null,!0),t},n.exports=e.default},96040:(n,e,t)=>{t.d(e,{Z:()=>o});const r=t(72791).createContext(null);r.displayName="CardHeaderContext";const o=r},69532:(n,e,t)=>{t.d(e,{Z:()=>g});var r=t(81694),o=t.n(r),i=(t(33573),t(72791)),a=t(32592),l=t(41337),s=t(10162),c=t(5715),u=t(96040);const d=(0,t(66543).Z)("nav-item");var v=t(16445),f=t(24787),E=t(78633),x=t(80184);const b=i.forwardRef(((n,e)=>{let{bsPrefix:t,className:r,as:i=v.Z,active:a,eventKey:l,...c}=n;t=(0,s.vE)(t,"nav-link");const[u,d]=(0,f.v)({key:(0,E.h)(l,c.href),active:a,...c});return(0,x.jsx)(i,{...c,...u,ref:e,className:o()(r,t,c.disabled&&"disabled",d.isActive&&"active")})}));b.displayName="NavLink",b.defaultProps={disabled:!1};const y=b,m=i.forwardRef(((n,e)=>{const{as:t="div",bsPrefix:r,variant:d,fill:v,justify:f,navbar:E,navbarScroll:b,className:y,activeKey:m,...g}=(0,a.Ch)(n,{activeKey:"onSelect"}),O=(0,s.vE)(r,"nav");let h,p,C=!1;const Z=(0,i.useContext)(c.Z),j=(0,i.useContext)(u.Z);return Z?(h=Z.bsPrefix,C=null==E||E):j&&({cardHeaderBsPrefix:p}=j),(0,x.jsx)(l.Z,{as:t,ref:e,activeKey:m,className:o()(y,{[O]:!C,["".concat(h,"-nav")]:C,["".concat(h,"-nav-scroll")]:C&&b,["".concat(p,"-").concat(d)]:!!p,["".concat(O,"-").concat(d)]:!!d,["".concat(O,"-fill")]:v,["".concat(O,"-justified")]:f}),...g})}));m.displayName="Nav",m.defaultProps={justify:!1,fill:!1};const g=Object.assign(m,{Item:d,Link:y})},91752:(n,e,t)=>{t.d(e,{Z:()=>A});var r=t(52007),o=t.n(r),i=t(72791),a=t(83722),l=t(89181),s=t(90165),c=t(78633),u=t(25666),d=t(80184);const v=["active","eventKey","mountOnEnter","transition","unmountOnExit","role","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],f=["activeKey","getControlledId","getControllerId"],E=["as"];function x(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}function b(n){let{active:e,eventKey:t,mountOnEnter:r,transition:o,unmountOnExit:a,role:l="tabpanel",onEnter:u,onEntering:d,onEntered:E,onExit:b,onExiting:y,onExited:m}=n,g=x(n,v);const O=(0,i.useContext)(s.Z);if(!O)return[Object.assign({},g,{role:l}),{eventKey:t,isActive:e,mountOnEnter:r,transition:o,unmountOnExit:a,onEnter:u,onEntering:d,onEntered:E,onExit:b,onExiting:y,onExited:m}];const{activeKey:h,getControlledId:p,getControllerId:C}=O,Z=x(O,f),j=(0,c.h)(t);return[Object.assign({},g,{role:l,id:p(t),"aria-labelledby":C(t)}),{eventKey:t,isActive:null==e&&null!=j?(0,c.h)(h)===j:e,transition:o||Z.transition,mountOnEnter:null!=r?r:Z.mountOnEnter,unmountOnExit:null!=a?a:Z.unmountOnExit,onEnter:u,onEntering:d,onEntered:E,onExit:b,onExiting:y,onExited:m}]}const y=i.forwardRef(((n,e)=>{let{as:t="div"}=n,r=x(n,E);const[o,{isActive:i,onEnter:a,onEntering:l,onEntered:v,onExit:f,onExiting:y,onExited:m,mountOnEnter:g,unmountOnExit:O,transition:h=u.Z}]=b(r);return(0,d.jsx)(s.Z.Provider,{value:null,children:(0,d.jsx)(c.Z.Provider,{value:null,children:(0,d.jsx)(h,{in:i,onEnter:a,onEntering:l,onEntered:v,onExit:f,onExiting:y,onExited:m,mountOnEnter:g,unmountOnExit:O,children:(0,d.jsx)(t,Object.assign({},o,{ref:e,hidden:!i,"aria-hidden":!i}))})})})}));y.displayName="TabPanel";const m=n=>{const{id:e,generateChildId:t,onSelect:r,activeKey:o,defaultActiveKey:u,transition:v,mountOnEnter:f,unmountOnExit:E,children:x}=n,[b,y]=(0,a.$c)(o,u,r),m=(0,l.gP)(e),g=(0,i.useMemo)((()=>t||((n,e)=>m?"".concat(m,"-").concat(e,"-").concat(n):null)),[m,t]),O=(0,i.useMemo)((()=>({onSelect:y,activeKey:b,transition:v,mountOnEnter:f||!1,unmountOnExit:E||!1,getControlledId:n=>g(n,"tabpane"),getControllerId:n=>g(n,"tab")})),[y,b,v,f,E,g]);return(0,d.jsx)(s.Z.Provider,{value:O,children:(0,d.jsx)(c.Z.Provider,{value:y||null,children:x})})};m.Panel=y;const g=m;var O=t(72709);function h(n){return"boolean"===typeof n?n?O.Z:u.Z:n}const p=n=>{let{transition:e,...t}=n;return(0,d.jsx)(g,{...t,transition:h(e)})};p.displayName="TabContainer";const C=p;const Z=(0,t(66543).Z)("tab-content");var j=t(81694),P=t.n(j),K=t(10162);const w=i.forwardRef(((n,e)=>{let{bsPrefix:t,transition:r,...o}=n;const[{className:i,as:a="div",...l},{isActive:u,onEnter:v,onEntering:f,onEntered:E,onExit:x,onExiting:y,onExited:m,mountOnEnter:g,unmountOnExit:p,transition:C=O.Z}]=b({...o,transition:h(r)}),Z=(0,K.vE)(t,"tab-pane");return(0,d.jsx)(s.Z.Provider,{value:null,children:(0,d.jsx)(c.Z.Provider,{value:null,children:(0,d.jsx)(C,{in:u,onEnter:v,onEntering:f,onEntered:E,onExit:x,onExiting:y,onExited:m,mountOnEnter:g,unmountOnExit:p,children:(0,d.jsx)(a,{...l,ref:e,className:P()(i,Z,u&&"active")})})})})}));w.displayName="TabPane";const k=w,I={eventKey:o().oneOfType([o().string,o().number]),title:o().node.isRequired,disabled:o().bool,tabClassName:o().string,tabAttrs:o().object},N=()=>{throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly")};N.propTypes=I;const A=Object.assign(N,{Container:C,Content:Z,Pane:k})}}]);
//# sourceMappingURL=5674.a3d95586.chunk.js.map