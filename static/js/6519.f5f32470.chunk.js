"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[6519],{56351:(e,s,t)=>{t.d(s,{A:()=>c});t(65043);var l=t(51359),a=t(6720),n=t(60184),r=(t(59167),t(10966)),i=t(70579);const c=e=>{let{tableData:s,onConfirmDelete:t,editDrawerOpen:c}=e;const{can:d}=(0,r.S)(),o=d("vehicle","modify"),h=d("vehicle","delete");if(0!==s.length)return null===s||void 0===s?void 0:s.map(((e,s)=>{var r;return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:(0,i.jsx)("div",{className:"products",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("h6",{children:e.vehicleName}),(0,i.jsx)("span",{children:"Car"})]})})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:e.plateNumber})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{className:"text-primary",children:null===e||void 0===e||null===(r=e.branchId)||void 0===r?void 0:r.branchName})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:e.simNumber})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:e.imeiNumber})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{className:"text-primary",children:e.registrationNumber})}),(0,i.jsx)("td",{children:(0,i.jsx)("span",{children:e.weightCapacity})}),(h||o)&&(0,i.jsx)("td",{children:(0,i.jsxs)("span",{className:"d-flex justify-content-center",children:[o&&(0,i.jsx)("span",{className:"cursor-pointer",onClick:()=>c(e.id),children:(0,i.jsx)(n.uO9,{style:{color:"green",fontSize:"1.2rem"}})}),h&&(0,i.jsx)(l.A,{className:"cursor-pointer ",onConfirmDelete:t,id:e._id,children:(0,i.jsx)(a.b6i,{style:{color:"red",fontSize:"1.2rem"}})})]})})]},e.id)}))}},36519:(e,s,t)=>{t.r(s),t.d(s,{default:()=>u});var l=t(65043),a=t(73216),n=t(35475),r=t(56351),i=t(33723),c=t(9866),d=t(58387),o=t(10966),h=t(78247),m=t(74117),x=t(70579);const u=()=>{const{t:e}=(0,m.Bd)(),{isRtl:s}=(0,l.useContext)(i.D),{can:t}=(0,o.S)(),u=(0,d.$)({"fa-solid fa-angle-right":s,"fa-solid fa-angle-left":!s}),j=(0,d.$)({"fa-solid fa-angle-left":s,"fa-solid fa-angle-right":!s}),p=(0,a.Zp)(),[b,f]=(0,l.useState)(),[v,N]=(0,l.useState)(document.querySelectorAll("#employee-tbl_wrapper tbody tr")),[g,y]=(0,l.useState)([]),[w,_]=(0,l.useState)({id:0,vehicleName:"",plateNumber:"",simNumber:0,IMEINumber:0,GPSDeviceType:"",distanceCounter:0}),C=10,S=(0,l.useRef)(0),[k,T]=(0,l.useState)(0),D=(e,s)=>{for(var t=0;t<v.length;++t)t>=e&&t<s?v[t].classList.remove("d-none"):v[t].classList.add("d-none")};async function E(){try{const{data:e,totalLength:s}=await(0,h.kw)();console.log(e),y(e)}catch(e){console.log("Error in fetching data",e)}}console.log(g),(0,l.useEffect)((()=>{N(document.querySelectorAll("#employee-tbl_wrapper tbody tr"))}),[k]),(0,l.useEffect)((()=>{E()}),[b]),0===S.current&&D(0,C);let I=Array(Math.ceil(v.length/C)).fill().map(((e,s)=>s+1));const A=e=>{S.current=e,D(S.current*C,(S.current+1)*C),T(e)};(0,l.useRef)();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(c.A,{mainTitle:e("vehicle"),pageTitle:e("vehicle"),parentTitle:e("home")}),(0,x.jsx)("div",{className:"container-fluid",children:(0,x.jsx)("div",{className:"row",children:(0,x.jsx)("div",{className:"col-xl-12",children:(0,x.jsx)("div",{className:"card",children:(0,x.jsx)("div",{className:"card-body p-0",children:(0,x.jsxs)("div",{className:"table-responsive active-projects style-1 ItemsCheckboxSec shorting",children:[(0,x.jsxs)("div",{className:"tbl-caption d-flex justify-content-between text-wrap align-items-center",children:[(0,x.jsx)("h4",{className:"heading mb-0",children:e("vehicle")}),(0,x.jsxs)("div",{children:[t("vehicle","add")&&(0,x.jsxs)(n.N_,{to:"/vehicle/create",className:"btn btn-primary btn-sm ms-1","data-bs-toggle":"offcanvas",children:["+ ",e("addVehicleInfo")]})," "]})]}),(0,x.jsxs)("div",{id:"employee-tbl_wrapper",className:"dataTables_wrapper no-footer",children:[(0,x.jsxs)("table",{id:"empoloyees-tblwrapper",className:"table ItemsCheckboxSec dataTable no-footer mb-0",children:[(0,x.jsx)("thead",{children:(0,x.jsxs)("tr",{children:[(0,x.jsx)("th",{children:e("vehicleName")}),(0,x.jsx)("th",{children:e("plateNumber")}),(0,x.jsx)("th",{children:e("branch")}),(0,x.jsx)("th",{children:e("simNumber")}),(0,x.jsx)("th",{children:e("IMEINumber")}),(0,x.jsx)("th",{children:e("registrationNumber")}),(0,x.jsx)("th",{children:e("weightCapacity")}),(t("vehicle","modify")||t("vehicle","delete"))&&(0,x.jsx)("th",{children:e("action")})]})}),(0,x.jsx)("tbody",{children:(0,x.jsx)(r.A,{tableData:g,onConfirmDelete:e=>{(0,h.HI)(e),E(),f(e)},editDrawerOpen:e=>{g.map((s=>s.id===e&&_(s))),p("edit/".concat(e))}})})]}),(0,x.jsxs)("div",{className:"d-sm-flex text-center justify-content-between align-items-center",children:[(0,x.jsxs)("div",{className:"dataTables_info",children:[e("showing")," ",S.current*C+1," ",e("to")," ",v.length>(S.current+1)*C?(S.current+1)*C:v.length," ",e("of")," ",v.length," ",e("entries")]}),(0,x.jsxs)("div",{className:"dataTables_paginate paging_simple_numbers",id:"example2_paginate",children:[(0,x.jsx)(n.N_,{className:"paginate_button previous disabled",to:"/vehicle",onClick:()=>S.current>0&&A(S.current-1),children:(0,x.jsx)("i",{className:u})}),(0,x.jsx)("span",{children:I.map(((e,s)=>(0,x.jsx)(n.N_,{to:"/vehicle",className:"paginate_button  ".concat(S.current===s?"current":""," "),onClick:()=>A(s),children:e},s)))}),(0,x.jsx)(n.N_,{className:"paginate_button next",to:"/vehicle",onClick:()=>S.current+1<I.length&&A(S.current+1),children:(0,x.jsx)("i",{className:j})})]})]})]})]})})})})})})]})}}}]);
//# sourceMappingURL=6519.f5f32470.chunk.js.map