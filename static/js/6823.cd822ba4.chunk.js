"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[6823],{86823:(e,r,t)=>{t.r(r),t.d(r,{default:()=>h});var s=t(65043),a=t(73216),n=t(44816),i=t(86856),o=t(24858),l=(t(9531),t(9866)),d=t(56748),c=t(39296),u=t(42364),m=(t(87742),t(42457)),g=(t(72213),t(70579));const h=()=>{const[e,r]=(0,s.useState)(0),t=["Profile","Additional Info","Document"],h=[d.A,c.A,u.A],v=t.length,{id:p}=(0,a.g)(),f=(0,a.Zp)(),{register:S,formState:{errors:x},setValue:j,getValues:A,control:N,handleSubmit:C}=(0,o.mN)({}),D=t=>{if(e===v-1)try{if(p){const e=JSON.parse(localStorage.getItem("userJsonData"));console.log(p);const r=e.findIndex((e=>e.id==p));return void(-1!==r&&(e[r]={...t,id:p,designation:"driver",role:"user"},localStorage.setItem("userJsonData",JSON.stringify(e)),(0,m.V)("Driver Updated!")))}{t={...t,designation:"driver",role:"user"};const e=JSON.parse(localStorage.getItem("userJsonData"));return t.id=e.length+1,e.push(t),localStorage.setItem("userJsonData",JSON.stringify(e)),(0,m.V)("New Driver Created!"),void f("/driver")}}catch(s){(0,m.U)("Some error occured !!")}console.log("data from drivers",t),r((e=>Math.min(e+1,v-1)))};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(l.A,{mainTitle:"Driver",pageTitle:"Edit",parentTitle:"Driver"}),(0,g.jsx)("div",{className:"m-2 p-2",children:(0,g.jsx)(o.Op,{children:(0,g.jsx)("form",{onSubmit:C(D),children:(0,g.jsx)("div",{className:"default-tab",children:(0,g.jsxs)(n.A.Container,{defaultActiveKey:t[0].toLowerCase(),children:[(0,g.jsx)(i.A,{as:"ul",className:"nav-tabs",children:t.map(((t,s)=>(0,g.jsx)(i.A.Item,{as:"li",children:(0,g.jsx)(i.A.Link,{style:{padding:".5rem 2rem"},eventKey:t.toLowerCase(),active:s===e,onClick:()=>r(s),children:t})},s)))}),(0,g.jsx)(n.A.Content,{className:"pt-4",children:t.map(((r,s)=>{const a=h[s];return(0,g.jsx)(n.A.Pane,{eventKey:r.toLowerCase(),active:s===e,children:(0,g.jsx)(a,{data:t,control:N,setValue:j,register:S,getValues:A,errors:x,handleSubmit:C,onSubmit:D})},s)}))})]})})})})})]})}}}]);
//# sourceMappingURL=6823.cd822ba4.chunk.js.map