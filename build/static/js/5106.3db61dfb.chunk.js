"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[5106],{95106:(e,s,a)=>{a.r(s),a.d(s,{default:()=>w});var l=a(65043),t=a(35475),r=(a(62378),a(71232),a(9866)),n=(a(96610),a(6720)),i=a(60184),c=a(51359),o=a(70579);const d=e=>{let{tableData:s,onConfirmDelete:a,editDrawerOpen:l}=e;return(0,o.jsx)(o.Fragment,{children:s.map(((e,s)=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{children:(0,o.jsx)("span",{children:e.tripId})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{children:e.startTime})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{children:e.startLocation})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{children:e.reachTime})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{children:e.reachLocation})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{className:"text-primary",children:e.distance})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{children:e.fuelConsumption})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{children:e.driver})}),(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"d-flex justify-content-center",children:[(0,o.jsx)("span",{className:"cursor-pointer",children:(0,o.jsx)(i.uO9,{style:{color:"green",fontSize:"1.2rem"}})}),(0,o.jsx)(c.A,{className:"cursor-pointer ",onConfirmDelete:a,id:e.tripId,children:(0,o.jsx)(n.b6i,{style:{color:"red",fontSize:"1.2rem"}})})]})})]},s)))})};var m=a(31412),x=(a(72213),a(73216)),h=a(28086),j=a(31899),p=a.n(j),b=a(42297),u=(a(9531),a(24858)),f=a(23764),N=a(15075),g=a(69367);const v=(0,l.forwardRef)(((e,s)=>{let{Title:a,errors:r,control:n,register:c,setValue:d,getValues:m,handleSubmit:j,onSubmit:f}=e;const[g,v]=(0,l.useState)(!1),[y,C]=(0,l.useState)();(0,l.useImperativeHandle)(s,(()=>({showModal(){v(!0)}})));(0,x.Zp)();const S={control:e=>({...e,padding:".25rem 0 "})};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(h.A,{show:g,onHide:v,className:"offcanvas-end customeoff",placement:"end",children:[(0,o.jsxs)("div",{className:"offcanvas-header",children:[(0,o.jsx)("h5",{className:"modal-title",id:"#gridSystemModal",children:a}),(0,o.jsx)("button",{type:"button",className:"btn-close",onClick:()=>v(!1),children:(0,o.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,o.jsx)("div",{className:"offcanvas-body",children:(0,o.jsx)("div",{className:"container-fluid",children:(0,o.jsx)(u.Op,{children:(0,o.jsx)("form",{onClick:j(f),children:(0,o.jsxs)("div",{className:"d-flex",children:[(0,o.jsxs)("div",{className:"row w-50 m-2",children:[(0,o.jsxs)("div",{className:"col-xl-12 mb-3 ",children:[(0,o.jsx)("label",{className:"form-label",children:"Branch"}),(0,o.jsx)(u.xI,{name:"branch",control:n,render:e=>{let{field:{onChange:s,value:a,name:l,ref:t}}=e;return(0,o.jsx)(b.Ay,{onChange:e=>d("branch",e.value),options:N._7,ref:t,name:l,styles:S,defaultValue:N._7[0]})}})]}),(0,o.jsxs)("div",{className:"col-xl-12 mb-3",children:[(0,o.jsx)("label",{className:"form-label",children:"From Date"}),(0,o.jsx)(u.xI,{name:"fromDate",control:n,render:e=>{let{value:s,name:a}=e;return(0,o.jsx)(p(),{selected:m("fromDate")||new Date,className:"form-control",onChange:e=>{C(e),d("fromDate",e)}})}})]}),(0,o.jsxs)("div",{className:"col-xl-12 mb-3",children:[(0,o.jsx)("label",{className:"form-label",children:"To Date"}),(0,o.jsx)(u.xI,{name:"toDate",control:n,render:e=>{let{value:s,name:a}=e;return(0,o.jsx)(p(),{selected:m("toDate")||new Date,className:"form-control",onChange:e=>{C(e),d("toDate",e)}})}})]}),(0,o.jsxs)("div",{className:"position-absolute bottom-0 mb-4",children:[(0,o.jsx)("button",{type:"submit",onClick:()=>v(!1),className:"btn btn-primary light me-1",children:"Save Filter"}),(0,o.jsx)(t.N_,{to:"#",onClick:()=>v(!1),className:"btn btn-danger light ms-1",children:"Delete Filter"})]})]}),(0,o.jsxs)("div",{className:"row w-50 m-2",children:[(0,o.jsxs)("div",{className:" p-2",style:{height:"80%"},children:[(0,o.jsx)("div",{className:"col-xl-12 mb-3",children:(0,o.jsxs)("div",{className:"search-driver-tab p-2 rounded-1 w-100",children:[(0,o.jsx)("input",{type:"text",...c("search"),label:"Search",placeholder:"search",className:"form-control-driver-tab"}),(0,o.jsx)(i.KSO,{style:{fontSize:"1.5rem",padding:"2px"}})]})}),(0,o.jsxs)("div",{className:"d-flex mt-2 fs-6 align-items-center",children:[(0,o.jsx)("div",{className:"form-check custom-checkbox mb-3",style:{marginRight:"5px"},children:(0,o.jsx)("input",{type:"checkbox",className:"form-check-input",id:"customCheckBox1",required:!0})}),(0,o.jsxs)("div",{className:" bg-white w-100 p-2 d-flex justify-content-between",children:[(0,o.jsx)("span",{children:"Company 1"}),(0,o.jsx)("span",{className:"text-end",children:"[1]"})]})]}),(0,o.jsxs)("div",{className:"d-flex mt-2 fs-6 align-items-center",children:[(0,o.jsx)("div",{className:"form-check custom-checkbox",style:{marginRight:"5px"},children:(0,o.jsx)("input",{type:"checkbox",className:"form-check-input",id:"customCheckBox1",required:!0})}),(0,o.jsxs)("div",{className:"bg-white w-100 d-flex align-items-center",children:[(0,o.jsx)(i.Qp1,{style:{fontSize:"1.2rem",padding:"2px",margin:"0 .3rem",background:"white",color:"rgb(39,129,0)"}}),(0,o.jsxs)("div",{className:"bg-white w-50 p-1 d-flex flex-column justify-content-between",style:{fontSize:".8rem"},children:[(0,o.jsx)("span",{children:"Test1"}),(0,o.jsx)("span",{children:"22-02-2024 3:00 PM"})]}),(0,o.jsxs)("div",{className:"d-flex w-50 justify-content-evenly",children:[(0,o.jsx)("span",{children:"11"}),(0,o.jsx)(i.z5x,{}),(0,o.jsx)(i.pXu,{}),(0,o.jsx)(i.Gov,{})]})]})]})]}),(0,o.jsxs)("div",{className:"position-absolute bottom-0 mb-4",children:[(0,o.jsx)("button",{type:"submit",onClick:()=>v(!1),className:"btn btn-primary me-4",children:"Apply"}),(0,o.jsx)("button",{className:"btn btn-primary me-4",children:"XLS"}),(0,o.jsx)("button",{className:"btn btn-primary me-4",children:"PDF"})]})]})]})})})})})]})})})),y=(0,l.forwardRef)(((e,s)=>{let{Title:a,editData:r,setEditData:n,register:i,setValue:c,getValues:d,handleSubmit:m,onSubmit:j,errors:v,control:y}=e;const[C,S]=(0,l.useState)(!1),[w,T]=(0,l.useState)();(0,l.useImperativeHandle)(s,(()=>({showModal(){S(!0)}})));(0,x.Zp)();const D={control:e=>({...e,padding:".25rem 0 "})};return(0,o.jsx)(o.Fragment,{children:(0,o.jsxs)(h.A,{show:C,onHide:S,className:"offcanvas-end customeoff",placement:"end",children:[(0,o.jsxs)("div",{className:"offcanvas-header",children:[(0,o.jsx)("h5",{className:"modal-title",id:"#gridSystemModal",children:a}),(0,o.jsx)("button",{type:"button",className:"btn-close",onClick:()=>S(!1),children:(0,o.jsx)("i",{className:"fa-solid fa-xmark"})})]}),(0,o.jsx)("div",{className:"offcanvas-body",children:(0,o.jsx)("div",{className:"container-fluid",children:(0,o.jsx)(u.Op,{children:(0,o.jsxs)("form",{onSubmit:m(j),children:[(0,o.jsxs)("div",{className:"row",children:[(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:["Start Time ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(g.A,{type:"time",register:i,label:"Start Time",name:"startTime",placeholder:""}),(0,o.jsx)(f.A,{errorName:v.startTime})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:["Start Location ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(g.A,{type:"text",register:i,label:"Start Location",name:"startLocation",placeholder:""}),(0,o.jsx)(f.A,{errorName:v.startLocation})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:["Reach Time ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(g.A,{type:"time",register:i,label:"Reach Time",name:"reachTime",placeholder:""}),(0,o.jsx)(f.A,{errorName:v.reachTime})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:["Reach Location ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(g.A,{type:"text",register:i,label:"Reach Location",name:"reachLocation",placeholder:""}),(0,o.jsx)(f.A,{errorName:v.reachLocation})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsx)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:"Distance"}),(0,o.jsx)(g.A,{type:"number",register:i,label:"Distance",name:"distance",placeholder:""})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsx)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:"Fuel Consumption"}),(0,o.jsx)(g.A,{type:"number",register:i,label:"Fuel Consumption",name:"fuelConsumption",placeholder:""})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsxs)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:["Driver ",(0,o.jsx)("span",{className:"text-danger",children:"*"})]}),(0,o.jsx)(g.A,{type:"text",register:i,label:"Driver",name:"driver",placeholder:""}),(0,o.jsx)(f.A,{errorName:v.driver})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsx)("label",{htmlFor:"exampleFormControlInput3",className:"form-label",children:"Last Modified By"}),(0,o.jsx)(g.A,{type:"text",register:i,label:"Last Modified By",name:"lastModifiedBy",placeholder:""})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3",children:[(0,o.jsx)("label",{className:"form-label",children:"Last Modified Date"}),(0,o.jsx)(u.xI,{name:"lastModifiedDate",control:y,render:e=>{let{value:s,name:a}=e;return(0,o.jsx)(p(),{selected:d("lastModifiedDate")||new Date,className:"form-control",onChange:e=>{T(e.value),c("lastModifiedDate",e)}})}})]}),(0,o.jsxs)("div",{className:"col-xl-6 mb-3 ",children:[(0,o.jsx)("label",{className:"form-label",children:"Trip Status"}),(0,o.jsx)(u.xI,{name:"tripStatus",control:y,render:e=>{let{field:{onChange:s,value:a,name:l,ref:t}}=e;return(0,o.jsx)(b.Ay,{onChange:e=>{T(e.value),c("tripStatus",e.value)},options:N.av,ref:t,name:l,styles:D,defaultValue:N.av[0]})}})]})]}),(0,o.jsxs)("div",{children:[(0,o.jsx)("button",{type:"submit",onClick:()=>{m(j)},className:"btn btn-primary me-1",children:"Submit"}),(0,o.jsx)(t.N_,{to:"#",onClick:()=>S(!1),className:"btn btn-danger light ms-1",children:"Cancel"})]})]})})})})]})})}));var C=a(18403),S=a(87742);const w=e=>{const[s,a]=(0,l.useState)(m.G0),{register:n,setValue:i,getValues:c,handleSubmit:x,formState:{errors:h},control:j}=(0,u.mN)({resolver:(0,C.t)(S.M0)}),[p,b]=(0,l.useState)({id:0,status:"",title:"",contact:0,age:0,drivingExperience:0,gender:"",location:""}),[f,N]=(0,l.useState)(document.querySelectorAll("#employee-tbl_wrapper tbody tr")),g=10,w=(0,l.useRef)(0),[T,D]=(0,l.useState)(0),k=(e,s)=>{for(var a=0;a<f.length;++a)a>=e&&a<s?f[a].classList.remove("d-none"):f[a].classList.add("d-none")};(0,l.useEffect)((()=>{N(document.querySelectorAll("#employee-tbl_wrapper tbody tr"))}),[T]),0===w.current&&k(0,g);let F=Array(Math.ceil(f.length/g)).fill().map(((e,s)=>s+1));const A=e=>{w.current=e,k(w.current*g,(w.current+1)*g),D(e)},_=e=>{console.log(e)},I=(0,l.useRef)(),L=(0,l.useRef)();return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.A,{mainTitle:"Classify Trip",pageTitle:"Classify Trip",parentTitle:"Settings"}),(0,o.jsx)("div",{className:"container-fluid",children:(0,o.jsx)("div",{className:"row",children:(0,o.jsx)("div",{className:"col-xl-12",children:(0,o.jsx)("div",{className:"card",children:(0,o.jsx)("div",{className:"card-body p-0",children:(0,o.jsxs)("div",{className:"table-responsive active-projects style-1 ItemsCheckboxSec shorting",children:[(0,o.jsxs)("div",{className:"tbl-caption d-flex justify-content-between text-wrap align-items-center",children:[(0,o.jsx)("h4",{className:"heading mb-0",children:"Classify Trip"}),(0,o.jsxs)("div",{className:"",children:[(0,o.jsx)(t.N_,{to:"#",className:"btn btn-primary btn-sm ms-1","data-bs-toggle":"offcanvas",onClick:()=>L.current.showModal(),children:"+ Filter"})," "," ",(0,o.jsx)(t.N_,{to:"#",className:"btn btn-primary btn-sm ms-1","data-bs-toggle":"offcanvas",onClick:()=>I.current.showModal(),children:"+ Add Trips"})," "," "]})]}),(0,o.jsxs)("div",{id:"employee-tbl_wrapper",className:"dataTables_wrapper no-footer",children:[(0,o.jsxs)("table",{id:"empoloyees-tblwrapper",className:"table ItemsCheckboxSec dataTable no-footer mb-0",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:"Trip ID"}),(0,o.jsx)("th",{children:"Start Time"}),(0,o.jsx)("th",{children:"Start Location"}),(0,o.jsx)("th",{children:"Reach Time"}),(0,o.jsx)("th",{children:"Reach Location"}),(0,o.jsx)("th",{children:"Distance"}),(0,o.jsx)("th",{children:"Fuel Consumption"}),(0,o.jsx)("th",{children:"Driver"}),(0,o.jsx)("th",{children:"Action"})]})}),(0,o.jsx)("tbody",{children:(0,o.jsx)(d,{editData:p,tableData:s,onConfirmDelete:e=>{const l=s.filter((s=>s.id!==e));a(l)},editDrawerOpen:e=>{s.map((s=>s.id===e&&b(s))),I.current.showModal()},setEditData:b})})]}),(0,o.jsxs)("div",{className:"d-sm-flex text-center justify-content-between align-items-center",children:[(0,o.jsxs)("div",{className:"dataTables_info",children:["Showing ",w.current*g+1," to"," ",f.length>(w.current+1)*g?(w.current+1)*g:f.length," ","of ",f.length," entries"]}),(0,o.jsxs)("div",{className:"dataTables_paginate paging_simple_numbers",id:"example2_paginate",children:[(0,o.jsx)(t.N_,{className:"paginate_button previous disabled",to:"/classifyTrip",onClick:()=>w.current>0&&A(w.current-1),children:(0,o.jsx)("i",{className:"fa-solid fa-angle-left"})}),(0,o.jsx)("span",{children:F.map(((e,s)=>(0,o.jsx)(t.N_,{to:"/classifyTrip",className:"paginate_button  ".concat(w.current===s?"current":""," "),onClick:()=>A(s),children:e},s)))}),(0,o.jsx)(t.N_,{className:"paginate_button next",to:"/classifyTrip",onClick:()=>w.current+1<F.length&&A(w.current+1),children:(0,o.jsx)("i",{className:"fa-solid fa-angle-right"})})]})]})]})]})})})})})}),(0,o.jsx)(v,{ref:L,handleSubmit:x,onSubmit:_,register:n,control:j,errors:h,setValue:i,getValues:c,Title:"Add Filter"}),(0,o.jsx)(y,{ref:I,handleSubmit:x,onSubmit:_,register:n,control:j,errors:h,setValue:i,getValues:c,Title:"Add Trips"})]})}},72213:()=>{}}]);
//# sourceMappingURL=5106.3db61dfb.chunk.js.map