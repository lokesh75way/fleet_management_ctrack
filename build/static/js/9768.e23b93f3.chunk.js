"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[9768],{74621:(e,s,l)=>{l.d(s,{A:()=>i});l(65043);var a=l(6720),t=l(60184),n=l(51359),c=l(70579);const i=e=>{let{tableData:s,onConfirmDelete:l,editDrawerOpen:i}=e;return(0,c.jsx)(c.Fragment,{children:s.map(((e,s)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsx)("span",{children:e.id})}),(0,c.jsx)("td",{children:(0,c.jsx)("div",{className:"products",children:(0,c.jsxs)("div",{children:[(0,c.jsxs)("h6",{children:[e.firstName," ",e.lastName]}),(0,c.jsx)("span",{children:e.employeeDesignation})]})})}),(0,c.jsx)("td",{children:(0,c.jsx)("span",{children:e.age})}),(0,c.jsx)("td",{children:(0,c.jsx)("span",{children:e.contactNumber1})}),(0,c.jsx)("td",{children:(0,c.jsx)("span",{className:"text-primary ",children:e.drivingExperienceSince})}),(0,c.jsx)("td",{children:(0,c.jsx)("span",{children:e.city})}),(0,c.jsx)("td",{children:(0,c.jsx)("span",{className:"badge light border-0 ".concat(e.status?"badge-success":"badge-danger"," d-inline-block text-center"),style:{width:"5rem"},children:e.status?"Active":"InActive"})}),(0,c.jsx)("td",{children:(0,c.jsxs)("span",{className:"d-flex justify-content-center",children:[(0,c.jsx)("span",{className:"cursor-pointer",onClick:()=>i(e.id),children:(0,c.jsx)(t.uO9,{style:{color:"green",fontSize:"1.2rem"}})}),(0,c.jsx)(n.A,{className:"cursor-pointer ",onConfirmDelete:l,id:e.id,children:(0,c.jsx)(a.b6i,{style:{color:"red",fontSize:"1.2rem"}})})]})})]},e.id)))})}},972:(e,s,l)=>{l.d(s,{A:()=>j});var a=l(65043),t=l(73216),n=l(35475),c=l(28086),i=l(31899),r=l.n(i),d=l(42297),o=(l(9531),l(24858)),m=(l(23764),l(15075)),h=l(60184),x=l(70579);const j=(0,a.forwardRef)(((e,s)=>{let{Title:l,editData:i,setEditData:j}=e;const{control:u,formState:p}=(0,o.mN)(),[f,b]=(0,a.useState)(new Date),[v,N]=(0,a.useState)(new Date),[g,y]=(0,a.useState)(!1),[k,C]=(0,a.useState)(null),[w,S]=(0,a.useState)(null),[_,A]=(0,a.useState)(null);(0,a.useImperativeHandle)(s,(()=>({showModal(){y(!0)}})));const{register:D,setValue:T,getValues:E,handleSubmit:R,onSubmit:B}=(0,o.mN)(),F=((0,t.Zp)(),e=>{C(e.target.value),T("basedOn",e.target.value)}),I={control:e=>({...e,padding:".25rem 0 "})};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(c.A,{show:g,onHide:y,className:"offcanvas-end customeoff",placement:"end",children:[(0,x.jsxs)("div",{className:"offcanvas-header",children:[(0,x.jsx)("h5",{className:"modal-title",id:"#gridSystemModal",children:l}),(0,x.jsx)("button",{type:"button",className:"btn-close",onClick:()=>y(!1),children:(0,x.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,x.jsx)("div",{className:"offcanvas-body",children:(0,x.jsx)("div",{className:"container-fluid",children:(0,x.jsx)("form",{onClick:()=>R(B),children:(0,x.jsxs)("div",{className:"d-flex",children:[(0,x.jsxs)("div",{className:"row w-50 m-2",children:[(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Sub Company"}),(0,x.jsx)(o.xI,{name:"subCompany",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:t}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("subCompany",e.value),options:m._7,ref:t,name:a,styles:I,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Group"}),(0,x.jsx)(o.xI,{name:"vehicleGroup",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:t}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleGroup",e.value),options:m._7,ref:t,name:a,styles:I,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Type"}),(0,x.jsx)(o.xI,{name:"vehicleBrand",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:t}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleBrand",e.value),options:m._7,ref:t,name:a,styles:I,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Brand"}),(0,x.jsx)(o.xI,{name:"vehicleBrand",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:t}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleBrand",e.value),options:m._7,ref:t,name:a,styles:I,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Model"}),(0,x.jsx)(o.xI,{name:"vehicleModel",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:t}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleModel",e.value),options:m._7,ref:t,name:a,styles:I,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,x.jsx)("label",{className:"form-label",children:"Duration Time"}),(0,x.jsxs)("div",{className:"basic-form",style:{marginTop:".5rem"},children:[(0,x.jsxs)("div",{className:"form-check custom-checkbox form-check-inline",children:[(0,x.jsx)("input",{type:"radio",className:"form-check-input",id:"customRadioBox987",value:"hhmm",checked:"hhmm"===k,onChange:F,name:"optradioCustom1"}),(0,x.jsx)("label",{className:"form-check-label",htmlFor:"customRadioBox987",style:{marginBottom:"0"},children:"HH:MM"})]}),(0,x.jsxs)("div",{className:"form-check custom-checkbox form-check-inline",children:[(0,x.jsx)("input",{type:"radio",className:"form-check-input",id:"customRadioBox988",name:"optradioCustom1",value:"decimal",checked:"decimal"===k,onChange:F}),(0,x.jsx)("label",{className:"form-check-label",htmlFor:"customRadioBox988",style:{marginBottom:"0"},children:"Decimal"})]})]})]}),(0,x.jsxs)("div",{style:{marginTop:"3rem"},children:[(0,x.jsx)("button",{type:"submit",onClick:()=>y(!1),className:"btn btn-primary me-1",children:"Save Filter"}),(0,x.jsx)(n.N_,{to:"#",onClick:()=>y(!1),className:"btn btn-danger light ms-1",children:"Delete Filter"})]})]}),(0,x.jsxs)("div",{className:"row w-50 m-2",children:[(0,x.jsxs)("div",{className:"col-xl-12 mb-3",children:[(0,x.jsx)("label",{className:"form-label",children:" Date Selection"}),(0,x.jsx)(o.xI,{name:"dateSelection",control:u,render:e=>{let{value:s,name:l}=e;return(0,x.jsx)(r(),{selected:E("dateSelection")||new Date,className:"form-control",onChange:e=>T("dateSelection",e)})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Time Range"}),(0,x.jsxs)("div",{className:"d-flex align-items-center",children:[(0,x.jsx)("input",{type:"time",...D("timeRange"),className:"form-control",name:"timeRange",placeholder:""}),(0,x.jsx)("span",{className:"mx-2",children:"To"}),(0,x.jsx)("input",{type:"time",...D("timeRange"),className:"form-control",name:"timeRange",placeholder:""})]})]}),(0,x.jsxs)("div",{className:" p-2",style:{height:"80%"},children:[(0,x.jsx)("div",{className:"col-xl-12 mb-3 ",children:(0,x.jsxs)("div",{className:"search-driver-tab p-2 w-100 rounded-1",children:[(0,x.jsx)("input",{type:"text",placeholder:"search",className:"form-control-driver-tab"}),(0,x.jsx)(h.KSO,{style:{fontSize:"1.5rem",padding:"2px"}})]})}),(0,x.jsxs)("div",{className:"d-flex mt-2 fs-6 align-items-center",children:[(0,x.jsx)("div",{className:"form-check custom-checkbox mb-3",style:{marginRight:"5px"},children:(0,x.jsx)("input",{type:"checkbox",className:"form-check-input",id:"customCheckBox1",required:!0})}),(0,x.jsxs)("div",{className:" bg-white w-100 p-2 d-flex justify-content-between",children:[(0,x.jsx)("span",{children:"Company 1"}),(0,x.jsx)("span",{className:"text-end",children:"[1]"})]})]}),(0,x.jsxs)("div",{className:"d-flex mt-2 fs-6 align-items-center",children:[(0,x.jsx)("div",{className:"form-check custom-checkbox",style:{marginRight:"5px"},children:(0,x.jsx)("input",{type:"checkbox",className:"form-check-input",id:"customCheckBox1",required:!0})}),(0,x.jsxs)("div",{className:"bg-white w-100 d-flex align-items-center",children:[(0,x.jsx)(h.Qp1,{style:{fontSize:"1.2rem",padding:"2px",margin:"0 .3rem",background:"white",color:"rgb(39,129,0)"}}),(0,x.jsxs)("div",{className:"bg-white w-50 p-1 d-flex flex-column justify-content-between",style:{fontSize:".8rem"},children:[(0,x.jsx)("span",{children:"Test1"}),(0,x.jsx)("span",{children:"22-02-2024 3:00 PM"})]}),(0,x.jsxs)("div",{className:"d-flex w-50 justify-content-evenly",children:[(0,x.jsx)("span",{children:"11"}),(0,x.jsx)(h.z5x,{}),(0,x.jsx)(h.pXu,{}),(0,x.jsx)(h.Gov,{})]})]})]})]}),(0,x.jsx)("div",{style:{marginTop:"1rem"},children:(0,x.jsx)("button",{type:"submit",onClick:()=>y(!1),className:"btn btn-primary me-1",children:"Apply"})})]})]})})})})]})})}))},89768:(e,s,l)=>{l.r(s),l.d(s,{default:()=>o});var a=l(65043),t=l(35475),n=(l(62378),l(9866)),c=l(31412),i=l(972),r=l(74621),d=l(70579);const o=e=>{const[s,l]=(0,a.useState)(c.Fb),[o,m]=(0,a.useState)({id:0,status:"",title:"",contact:0,age:0,drivingExperience:0,gender:"",location:""}),[h,x]=(0,a.useState)(document.querySelectorAll("#employee-tbl_wrapper tbody tr")),j=10,u=(0,a.useRef)(0),[p,f]=(0,a.useState)(0),b=(e,s)=>{for(var l=0;l<h.length;++l)l>=e&&l<s?h[l].classList.remove("d-none"):h[l].classList.add("d-none")};(0,a.useEffect)((()=>{x(document.querySelectorAll("#employee-tbl_wrapper tbody tr"))}),[p]),0===u.current&&b(0,j);let v=Array(Math.ceil(h.length/j)).fill().map(((e,s)=>s+1));const N=e=>{u.current=e,b(u.current*j,(u.current+1)*j),f(e)},g=(0,a.useRef)();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.A,{mainTitle:"Activity",pageTitle:"Activity",parentTitle:"Home"}),(0,d.jsx)("div",{className:"container-fluid",children:(0,d.jsx)("div",{className:"row",children:(0,d.jsx)("div",{className:"col-xl-12",children:(0,d.jsx)("div",{className:"card",children:(0,d.jsx)("div",{className:"card-body p-0",children:(0,d.jsxs)("div",{className:"table-responsive active-projects style-1 ItemsCheckboxSec shorting",children:[(0,d.jsxs)("div",{className:"tbl-caption d-flex justify-content-between text-wrap align-items-center",children:[(0,d.jsx)("h4",{className:"heading mb-0",children:"Activity"}),(0,d.jsxs)("div",{children:[(0,d.jsx)(t.N_,{to:"#",className:"btn btn-primary btn-sm ms-1","data-bs-toggle":"offcanvas",onClick:()=>g.current.showModal(),children:"+ Filter"})," "," "]})]}),(0,d.jsxs)("div",{id:"employee-tbl_wrapper",className:"dataTables_wrapper no-footer",children:[(0,d.jsxs)("table",{id:"empoloyees-tblwrapper",className:"table ItemsCheckboxSec dataTable no-footer mb-0",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Employee ID"}),(0,d.jsx)("th",{children:"Employee Name"}),(0,d.jsx)("th",{children:"Age"}),(0,d.jsx)("th",{children:"Contact Number"}),(0,d.jsx)("th",{children:"Gender"}),(0,d.jsx)("th",{children:"Driving Experience"}),(0,d.jsx)("th",{children:"Location"}),(0,d.jsx)("th",{children:"Status"}),(0,d.jsx)("th",{children:"Action"})]})}),(0,d.jsx)("tbody",{children:(0,d.jsx)(r.A,{editData:o,tableData:s,onConfirmDelete:e=>{const a=s.filter((s=>s.id!==e));l(a)},editDrawerOpen:e=>{s.map((s=>s.id===e&&m(s))),g.current.showModal()},setEditData:m})})]}),(0,d.jsxs)("div",{className:"d-sm-flex text-center justify-content-between align-items-center",children:[(0,d.jsxs)("div",{className:"dataTables_info",children:["Showing ",u.current*j+1," to"," ",h.length>(u.current+1)*j?(u.current+1)*j:h.length," ","of ",h.length," entries"]}),(0,d.jsxs)("div",{className:"dataTables_paginate paging_simple_numbers",id:"example2_paginate",children:[(0,d.jsx)(t.N_,{className:"paginate_button previous disabled",to:"/activity",onClick:()=>u.current>0&&N(u.current-1),children:(0,d.jsx)("i",{className:"fa-solid fa-angle-left"})}),(0,d.jsx)("span",{children:v.map(((e,s)=>(0,d.jsx)(t.N_,{to:"/activity",className:"paginate_button  ".concat(u.current===s?"current":""," "),onClick:()=>N(s),children:e},s)))}),(0,d.jsx)(t.N_,{className:"paginate_button next",to:"/activity",onClick:()=>u.current+1<v.length&&N(u.current+1),children:(0,d.jsx)("i",{className:"fa-solid fa-angle-right"})})]})]})]})]})})})})})}),(0,d.jsx)(i.A,{ref:g,editData:o,setEditData:m,handleSubmit:e=>{e.preventDefault();const a=s.map((e=>e.id===o.id?(console.log(e.id),{...e,...o}):e));l(a)},Title:0===o.id?"Add Filter":"Edit Filter"})]})}}}]);
//# sourceMappingURL=9768.e23b93f3.chunk.js.map