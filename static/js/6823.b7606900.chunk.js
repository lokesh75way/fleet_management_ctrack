"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[6823],{86823:(e,t,r)=>{r.r(t),r.d(t,{default:()=>h});var s=r(65043),a=r(73216),n=r(44816),i=r(86856),o=r(24858),l=(r(9531),r(9866)),d=r(56748),c=r(39296),u=r(42364),m=(r(87742),r(42457)),g=(r(72213),r(70579));const h=()=>{const[e,t]=(0,s.useState)(0),r=["Profile","Additional Info","Document"],h=[d.A,c.A,u.A],v=r.length,{id:p}=(0,a.g)(),S=(0,a.Zp)(),{register:f,formState:{errors:x},setValue:j,getValues:A,control:N,handleSubmit:C}=(0,o.mN)({}),D=r=>{if(e===v-1)try{if(p){const e=JSON.parse(localStorage.getItem("userJsonData"));console.log(p);const t=e.findIndex((e=>e.id==p));return void(-1!==t&&(e[t]={...r,id:p,designation:"driver",role:"user"},localStorage.setItem("userJsonData",JSON.stringify(e)),(0,m.V)("Driver Updated!")))}{r={...r,designation:"driver",role:"user"};const e=JSON.parse(localStorage.getItem("userJsonData"));return r.id=e.length+1,e.push(r),localStorage.setItem("userJsonData",JSON.stringify(e)),(0,m.V)("New Driver Created!"),void S("/driver")}}catch(s){(0,m.U)("Some error occured !!")}t((e=>Math.min(e+1,v-1)))};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(l.A,{mainTitle:"Driver",pageTitle:"Edit",parentTitle:"Driver"}),(0,g.jsx)("div",{className:"m-2 p-2",children:(0,g.jsx)(o.Op,{children:(0,g.jsx)("form",{onSubmit:C(D),children:(0,g.jsx)("div",{className:"default-tab",children:(0,g.jsxs)(n.A.Container,{defaultActiveKey:r[0].toLowerCase(),children:[(0,g.jsx)(i.A,{as:"ul",className:"nav-tabs",children:r.map(((r,s)=>(0,g.jsx)(i.A.Item,{as:"li",children:(0,g.jsx)(i.A.Link,{style:{padding:".5rem 2rem"},eventKey:r.toLowerCase(),active:s===e,onClick:()=>t(s),children:r})},s)))}),(0,g.jsx)(n.A.Content,{className:"pt-4",children:r.map(((t,s)=>{const a=h[s];return(0,g.jsx)(n.A.Pane,{eventKey:t.toLowerCase(),active:s===e,children:(0,g.jsx)(a,{data:r,control:N,setValue:j,register:f,getValues:A,errors:x,handleSubmit:C,onSubmit:D})},s)}))})]})})})})})]})}}}]);
//# sourceMappingURL=6823.b7606900.chunk.js.map