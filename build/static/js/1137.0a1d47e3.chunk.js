"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[1137],{38089:(e,s,l)=>{l.d(s,{A:()=>c});l(65043);var a=l(6720),n=l(60184),t=l(51359),r=l(70579);const c=e=>{let{tableData:s,onConfirmDelete:l,editDrawerOpen:c}=e;return(0,r.jsx)(r.Fragment,{children:s.map(((e,s)=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:(0,r.jsx)("span",{children:e.id})}),(0,r.jsx)("td",{children:(0,r.jsx)("div",{className:"products",children:(0,r.jsx)("h6",{children:e.name})})}),(0,r.jsx)("td",{children:(0,r.jsx)("span",{children:e.alertType})}),(0,r.jsx)("td",{children:(0,r.jsx)("span",{children:e.createdDate})}),(0,r.jsx)("td",{children:(0,r.jsx)("span",{children:e.notification})}),(0,r.jsx)("td",{children:(0,r.jsx)("span",{children:e.reason})}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"d-flex justify-content-center",children:[(0,r.jsx)("span",{className:"cursor-pointer",children:(0,r.jsx)(n.uO9,{style:{color:"green",fontSize:"1.2rem"}})}),(0,r.jsx)(t.A,{className:"cursor-pointer ",onConfirmDelete:l,id:e.id,children:(0,r.jsx)(a.b6i,{style:{color:"red",fontSize:"1.2rem"}})})]})})]},s)))})}},972:(e,s,l)=>{l.d(s,{A:()=>j});var a=l(65043),n=l(73216),t=l(35475),r=l(28086),c=l(31899),i=l.n(c),d=l(42297),o=(l(9531),l(24858)),m=(l(23764),l(15075)),h=l(60184),x=l(70579);const j=(0,a.forwardRef)(((e,s)=>{let{Title:l,editData:c,setEditData:j}=e;const{control:u,formState:p}=(0,o.mN)(),[f,b]=(0,a.useState)(new Date),[N,v]=(0,a.useState)(new Date),[g,y]=(0,a.useState)(!1),[k,C]=(0,a.useState)(null),[w,S]=(0,a.useState)(null),[_,A]=(0,a.useState)(null);(0,a.useImperativeHandle)(s,(()=>({showModal(){y(!0)}})));const{register:D,setValue:T,getValues:R,handleSubmit:B,onSubmit:F}=(0,o.mN)(),M=((0,n.Zp)(),e=>{C(e.target.value),T("basedOn",e.target.value)}),V={control:e=>({...e,padding:".25rem 0 "})};return(0,x.jsx)(x.Fragment,{children:(0,x.jsxs)(r.A,{show:g,onHide:y,className:"offcanvas-end customeoff",placement:"end",children:[(0,x.jsxs)("div",{className:"offcanvas-header",children:[(0,x.jsx)("h5",{className:"modal-title",id:"#gridSystemModal",children:l}),(0,x.jsx)("button",{type:"button",className:"btn-close",onClick:()=>y(!1),children:(0,x.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,x.jsx)("div",{className:"offcanvas-body",children:(0,x.jsx)("div",{className:"container-fluid",children:(0,x.jsx)("form",{onClick:()=>B(F),children:(0,x.jsxs)("div",{className:"d-flex",children:[(0,x.jsxs)("div",{className:"row w-50 m-2",children:[(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Sub Company"}),(0,x.jsx)(o.xI,{name:"subCompany",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:n}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("subCompany",e.value),options:m._7,ref:n,name:a,styles:V,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Group"}),(0,x.jsx)(o.xI,{name:"vehicleGroup",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:n}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleGroup",e.value),options:m._7,ref:n,name:a,styles:V,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Type"}),(0,x.jsx)(o.xI,{name:"vehicleBrand",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:n}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleBrand",e.value),options:m._7,ref:n,name:a,styles:V,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Brand"}),(0,x.jsx)(o.xI,{name:"vehicleBrand",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:n}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleBrand",e.value),options:m._7,ref:n,name:a,styles:V,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Vehicle Model"}),(0,x.jsx)(o.xI,{name:"vehicleModel",control:u,render:e=>{let{field:{onChange:s,value:l,name:a,ref:n}}=e;return(0,x.jsx)(d.Ay,{onChange:e=>T("vehicleModel",e.value),options:m._7,ref:n,name:a,styles:V,defaultValue:m._7[0]})}})]}),(0,x.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,x.jsx)("label",{className:"form-label",children:"Duration Time"}),(0,x.jsxs)("div",{className:"basic-form",style:{marginTop:".5rem"},children:[(0,x.jsxs)("div",{className:"form-check custom-checkbox form-check-inline",children:[(0,x.jsx)("input",{type:"radio",className:"form-check-input",id:"customRadioBox987",value:"hhmm",checked:"hhmm"===k,onChange:M,name:"optradioCustom1"}),(0,x.jsx)("label",{className:"form-check-label",htmlFor:"customRadioBox987",style:{marginBottom:"0"},children:"HH:MM"})]}),(0,x.jsxs)("div",{className:"form-check custom-checkbox form-check-inline",children:[(0,x.jsx)("input",{type:"radio",className:"form-check-input",id:"customRadioBox988",name:"optradioCustom1",value:"decimal",checked:"decimal"===k,onChange:M}),(0,x.jsx)("label",{className:"form-check-label",htmlFor:"customRadioBox988",style:{marginBottom:"0"},children:"Decimal"})]})]})]}),(0,x.jsxs)("div",{style:{marginTop:"3rem"},children:[(0,x.jsx)("button",{type:"submit",onClick:()=>y(!1),className:"btn btn-primary me-1",children:"Save Filter"}),(0,x.jsx)(t.N_,{to:"#",onClick:()=>y(!1),className:"btn btn-danger light ms-1",children:"Delete Filter"})]})]}),(0,x.jsxs)("div",{className:"row w-50 m-2",children:[(0,x.jsxs)("div",{className:"col-xl-12 mb-3",children:[(0,x.jsx)("label",{className:"form-label",children:" Date Selection"}),(0,x.jsx)(o.xI,{name:"dateSelection",control:u,render:e=>{let{value:s,name:l}=e;return(0,x.jsx)(i(),{selected:R("dateSelection")||new Date,className:"form-control",onChange:e=>T("dateSelection",e)})}})]}),(0,x.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,x.jsx)("label",{className:"form-label",children:"Time Range"}),(0,x.jsxs)("div",{className:"d-flex align-items-center",children:[(0,x.jsx)("input",{type:"time",...D("timeRange"),className:"form-control",name:"timeRange",placeholder:""}),(0,x.jsx)("span",{className:"mx-2",children:"To"}),(0,x.jsx)("input",{type:"time",...D("timeRange"),className:"form-control",name:"timeRange",placeholder:""})]})]}),(0,x.jsxs)("div",{className:" p-2",style:{height:"80%"},children:[(0,x.jsx)("div",{className:"col-xl-12 mb-3 ",children:(0,x.jsxs)("div",{className:"search-driver-tab p-2 w-100 rounded-1",children:[(0,x.jsx)("input",{type:"text",placeholder:"search",className:"form-control-driver-tab"}),(0,x.jsx)(h.KSO,{style:{fontSize:"1.5rem",padding:"2px"}})]})}),(0,x.jsxs)("div",{className:"d-flex mt-2 fs-6 align-items-center",children:[(0,x.jsx)("div",{className:"form-check custom-checkbox mb-3",style:{marginRight:"5px"},children:(0,x.jsx)("input",{type:"checkbox",className:"form-check-input",id:"customCheckBox1",required:!0})}),(0,x.jsxs)("div",{className:" bg-white w-100 p-2 d-flex justify-content-between",children:[(0,x.jsx)("span",{children:"Company 1"}),(0,x.jsx)("span",{className:"text-end",children:"[1]"})]})]}),(0,x.jsxs)("div",{className:"d-flex mt-2 fs-6 align-items-center",children:[(0,x.jsx)("div",{className:"form-check custom-checkbox",style:{marginRight:"5px"},children:(0,x.jsx)("input",{type:"checkbox",className:"form-check-input",id:"customCheckBox1",required:!0})}),(0,x.jsxs)("div",{className:"bg-white w-100 d-flex align-items-center",children:[(0,x.jsx)(h.Qp1,{style:{fontSize:"1.2rem",padding:"2px",margin:"0 .3rem",background:"white",color:"rgb(39,129,0)"}}),(0,x.jsxs)("div",{className:"bg-white w-50 p-1 d-flex flex-column justify-content-between",style:{fontSize:".8rem"},children:[(0,x.jsx)("span",{children:"Test1"}),(0,x.jsx)("span",{children:"22-02-2024 3:00 PM"})]}),(0,x.jsxs)("div",{className:"d-flex w-50 justify-content-evenly",children:[(0,x.jsx)("span",{children:"11"}),(0,x.jsx)(h.z5x,{}),(0,x.jsx)(h.pXu,{}),(0,x.jsx)(h.Gov,{})]})]})]})]}),(0,x.jsx)("div",{style:{marginTop:"1rem"},children:(0,x.jsx)("button",{type:"submit",onClick:()=>y(!1),className:"btn btn-primary me-1",children:"Apply"})})]})]})})})})]})})}))},1137:(e,s,l)=>{l.r(s),l.d(s,{default:()=>o});var a=l(65043),n=l(35475),t=(l(62378),l(9866)),r=l(31412),c=l(972),i=l(38089),d=l(70579);const o=e=>{const[s,l]=(0,a.useState)(r.No),[o,m]=(0,a.useState)({id:0,status:"",title:"",contact:0,age:0,drivingExperience:0,gender:"",location:""}),[h,x]=(0,a.useState)(document.querySelectorAll("#employee-tbl_wrapper tbody tr")),j=10,u=(0,a.useRef)(0),[p,f]=(0,a.useState)(0),b=(e,s)=>{for(var l=0;l<h.length;++l)l>=e&&l<s?h[l].classList.remove("d-none"):h[l].classList.add("d-none")};(0,a.useEffect)((()=>{x(document.querySelectorAll("#employee-tbl_wrapper tbody tr"))}),[p]),0===u.current&&b(0,j);let N=Array(Math.ceil(h.length/j)).fill().map(((e,s)=>s+1));const v=e=>{u.current=e,b(u.current*j,(u.current+1)*j),f(e)},g=(0,a.useRef)();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.A,{mainTitle:"Alert",pageTitle:"Alert",parentTitle:"Home"}),(0,d.jsx)("div",{className:"container-fluid",children:(0,d.jsx)("div",{className:"row",children:(0,d.jsx)("div",{className:"col-xl-12",children:(0,d.jsx)("div",{className:"card",children:(0,d.jsx)("div",{className:"card-body p-0",children:(0,d.jsxs)("div",{className:"table-responsive active-projects style-1 ItemsCheckboxSec shorting",children:[(0,d.jsxs)("div",{className:"tbl-caption d-flex justify-content-between text-wrap align-items-center",children:[(0,d.jsx)("h4",{className:"heading mb-0",children:"Alert"}),(0,d.jsxs)("div",{children:[(0,d.jsx)(n.N_,{to:"#",className:"btn btn-primary btn-sm ms-1","data-bs-toggle":"offcanvas",onClick:()=>g.current.showModal(),children:"+ Filter"})," "," "]})]}),(0,d.jsxs)("div",{id:"employee-tbl_wrapper",className:"dataTables_wrapper no-footer",children:[(0,d.jsxs)("table",{id:"empoloyees-tblwrapper",className:"table ItemsCheckboxSec dataTable no-footer mb-0",children:[(0,d.jsx)("thead",{children:(0,d.jsxs)("tr",{children:[(0,d.jsx)("th",{children:"Alert ID"}),(0,d.jsx)("th",{children:"Alert Name"}),(0,d.jsx)("th",{children:"Alert Type"}),(0,d.jsx)("th",{children:"Created At "}),(0,d.jsx)("th",{children:"Notification"}),(0,d.jsx)("th",{children:"Reason"}),(0,d.jsx)("th",{children:"Action"})]})}),(0,d.jsx)("tbody",{children:(0,d.jsx)(i.A,{editData:o,tableData:s,onConfirmDelete:e=>{const a=s.filter((s=>s.id!==e));l(a)},editDrawerOpen:e=>{s.map((s=>s.id===e&&m(s))),g.current.showModal()},setEditData:m})})]}),(0,d.jsxs)("div",{className:"d-sm-flex text-center justify-content-between align-items-center",children:[(0,d.jsxs)("div",{className:"dataTables_info",children:["Showing ",u.current*j+1," to"," ",h.length>(u.current+1)*j?(u.current+1)*j:h.length," ","of ",h.length," entries"]}),(0,d.jsxs)("div",{className:"dataTables_paginate paging_simple_numbers",id:"example2_paginate",children:[(0,d.jsx)(n.N_,{className:"paginate_button previous disabled",to:"/alert",onClick:()=>u.current>0&&v(u.current-1),children:(0,d.jsx)("i",{className:"fa-solid fa-angle-left"})}),(0,d.jsx)("span",{children:N.map(((e,s)=>(0,d.jsx)(n.N_,{to:"/alert",className:"paginate_button  ".concat(u.current===s?"current":""," "),onClick:()=>v(s),children:e},s)))}),(0,d.jsx)(n.N_,{className:"paginate_button next",to:"/alert",onClick:()=>u.current+1<N.length&&v(u.current+1),children:(0,d.jsx)("i",{className:"fa-solid fa-angle-right"})})]})]})]})]})})})})})}),(0,d.jsx)(c.A,{ref:g,editData:o,setEditData:m,handleSubmit:e=>{e.preventDefault();const a=s.map((e=>e.id===o.id?(console.log(e.id),{...e,...o}):e));l(a)},Title:0===o.id?"Add Filter":"Edit Filter"})]})}}}]);
//# sourceMappingURL=1137.0a1d47e3.chunk.js.map