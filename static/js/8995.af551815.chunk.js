"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[8995],{48995:(e,a,t)=>{t.r(a),t.d(a,{default:()=>C});var l=t(65043),n=t(73216),s=t(35475),r=t(9866),i=t(6720),c=t(60184),d=t(51359),o=(t(71232),t(59167),t(10966)),h=t(70579);const m=e=>{let{onConfirmDelete:a,params:t,currentPage:l,itemsPerPage:n,tempValue:r,tempValue2:m,tableData:u,editDrawerOpen:p,setDataLength:x}=e,v=u;const{can:b}=(0,o.S)(),j=b("branch","modify"),g=b("branch","delete");"All Companies"!==r&&(v=u.filter((e=>"branch"===e.role&&e.parentCompany===r))),"All Branches"!==m&&(v=u.filter((e=>"branch"===e.role&&e.parentBranch===m)));for(var f=[],N=0;N<v.length;N++){const e=v[N]._id;f[N]=v.filter((a=>{var t;return(null===a||void 0===a||null===(t=a.parentBranchId)||void 0===t?void 0:t._id)===e})).length}const y=(l-1)*n+1;return(0,h.jsx)(h.Fragment,{children:v.map(((e,t)=>{var l,n,r,o,m,u;return(0,h.jsxs)("tr",{children:[(0,h.jsx)("td",{children:(0,h.jsx)("span",{children:y+t})}),(0,h.jsx)("td",{children:(0,h.jsx)("span",{className:"text-primary",children:e.branchName})}),(0,h.jsx)("td",{children:(0,h.jsx)("span",{children:null!==(l=e.parentBranchId)&&void 0!==l&&l.branchName?null===(n=e.parentBranchId)||void 0===n?void 0:n.branchName:(0,h.jsx)("span",{className:"ps-4",children:"-"})})}),(0,h.jsx)("td",{children:(0,h.jsx)("span",{children:null!==(r=e.companyId)&&void 0!==r&&r.companyName?null===(o=e.companyId)||void 0===o?void 0:o.companyName:(0,h.jsx)("span",{className:"ps-4",children:"-"})})}),(0,h.jsx)("td",{children:(0,h.jsx)("span",{children:null!==(m=e.businessGroupId)&&void 0!==m&&m.groupName?null===(u=e.businessGroupId)||void 0===u?void 0:u.groupName:(0,h.jsx)("span",{className:"ps-4",children:"-"})})}),(0,h.jsx)("td",{children:(0,h.jsx)("span",{children:e.city})}),(0,h.jsx)("td",{children:(0,h.jsx)(s.N_,{to:"/branch/bid/".concat(e.id),className:"text-primary badge light border-0 badge-count",children:f[t]})}),(j||g)&&(0,h.jsx)("td",{children:(0,h.jsxs)("span",{className:"d-flex justify-content-center",children:[j&&(0,h.jsx)("span",{className:"cursor-pointer",onClick:()=>p(e._id),children:(0,h.jsx)(c.uO9,{style:{color:"green",fontSize:"1.2rem"}})}),g&&(0,h.jsx)(d.A,{className:"cursor-pointer ",onConfirmDelete:a,id:e._id,children:(0,h.jsx)(i.b6i,{style:{color:"red",fontSize:"1.2rem"}})})]})})]},t)}))})};var u=t(24858),p=(t(99482),t(74117)),x=t(33723),v=t(66948),b=t(42457),j=t(94692),g=t(12954),f=(t(85539),t(272)),N=t(83700),y=(t(92157),t(99895));const C=()=>{var e;const{isRtl:a}=(0,l.useContext)(x.D),{can:t,setUserPermission:i}=(0,o.S)(),{t:c}=(0,p.Bd)(),d=(0,n.Zp)(),[C,S]=((0,n.g)(),(0,l.useState)({value:"All Companies",label:"All Companies"})),[A,w]=(0,l.useState)({value:"All Branches",label:"All Branches"}),[B,I]=(0,l.useState)("All Companies"),[_,P]=(0,l.useState)("All Branches"),[D,k]=(0,l.useState)(document.querySelectorAll("#employee-tbl_wrapper tbody tr")),T={control:e=>({...e,marginRight:"1rem",marginLeft:"1rem",width:"15rem",height:"0.6rem",menuPortal:e=>({...e,zIndex:9999}),menu:e=>({...e,zIndex:9999})})},{control:E,setValue:V,getValues:O,watch:z}=(localStorage.getItem("loginDetails-name"),(0,u.mN)()),F=JSON.parse(localStorage.getItem("userDetails")),L=null===F||void 0===F||null===(e=F.user)||void 0===e?void 0:e.role,[q,G]=(0,l.useState)(null),[J,M]=(0,l.useState)([]),[R,H]=(0,l.useState)({id:0,reseller:"",contact:0,username:"",status:"",location:"",usergroup:"",branches:0}),[U,Y]=(0,l.useState)({label:"All Companies",value:"All Companies"}),[Z,K]=(0,l.useState)({label:"All Branches",value:"All Branches"}),[Q,W]=(0,l.useState)([]),[X,$]=(0,l.useState)([]),[ee,ae]=(0,l.useState)(null),[te,le]=(0,l.useState)(null),{page:ne,nextPage:se,prevPage:re,goToPage:ie,setCount:ce,totalCount:de,setPage:oe}=((0,f.Bc)(),(0,j.A)()),he=10*(ne-1),me=(J.slice(he,he+10),async(e,a,t)=>{try{if(a){const{data:e,success:t}=await(0,v.e3)(void 0,a);M(e.data),ce(e.totalCount),$(e.data)}else if(t){const{data:e,success:a}=await(0,v.e3)(void 0,void 0,t);M(e.data),ce(e.totalCount),$(e.data)}else{var l;const{data:a,success:t}=await(0,v.e3)(e),n=JSON.parse(localStorage.getItem("permission"));i(null===n||void 0===n||null===(l=n[0])||void 0===l?void 0:l.permission),M(a.data),ce(a.totalCount)}}catch(n){console.log("Error in fetching data",n)}});(0,l.useEffect)((()=>{me(ne)}),[ne]);X.filter((e=>ee&&e.companyId._id===ee.value)).map((e=>({value:e._id,label:e.branchName})));return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(r.A,{mainTitle:"Branch",pageTitle:"Branch",parentTitle:"Home"}),(0,h.jsx)("div",{className:"container-fluid",children:(0,h.jsx)("div",{className:"row",children:(0,h.jsx)("div",{className:"col-xl-12",children:(0,h.jsx)("div",{className:"card",children:(0,h.jsx)("div",{className:"card-body p-0",children:(0,h.jsxs)("div",{className:"table-responsive active-projects style-1 ItemsCheckboxSec shorting",children:[(0,h.jsxs)("div",{className:"tbl-caption d-flex justify-content-between text-wrap align-items-center",children:[(0,h.jsx)("h4",{className:"heading mb-0",children:c("branches")}),(0,h.jsxs)("div",{className:"d-flex align-items-center",children:[(0,h.jsx)(s.N_,{className:"btn  btn-xxs","data-bs-toggle":"offcanvas",onClick:()=>{me(),G(null),V("company",""),V("parent",""),Y({label:"All companies",value:"All companies"})},style:{background:"gray",border:"gray",color:"white"},children:"Clear"}),(0,h.jsx)(u.xI,{name:"company",control:E,rules:{required:!0},render:e=>{let{field:{onChange:a,value:t,name:l,ref:n}}=e;return(0,h.jsx)(g.A,{onChange:async e=>{var a;V("company",e.value),G(e.value),ae(a=e),S(a),G(a.value),oe(1),me(1,a.value)},value:t||U,customStyles:T,name:l,ref:n,isDisabled:"COMPANY"===L},q)}}),(0,h.jsx)(u.xI,{name:"parent",control:E,rules:{required:!0},render:e=>{let{field:{onChange:a,value:t,name:l,ref:n}}=e;return(0,h.jsx)(N.A,{onChange:e=>{var a;V("parent",e.value),le(a=e),w(a),oe(1),me(1,void 0,a.value)},companyId:q,value:t||Z,customStyles:T,ref:n,name:l},q)}}),t("branch","add")&&(0,h.jsxs)(s.N_,{to:"/branch/create",className:"btn btn-primary btn-sm ms-1",style:{paddingBlock:"9px"},"data-bs-toggle":"offcanvas",children:["+ ",c("addBranch")]})," "]})]}),(0,h.jsxs)("div",{id:"employee-tbl_wrapper",className:"dataTables_wrapper no-footer",children:[(0,h.jsxs)("table",{id:"empoloyees-tblwrapper",className:"table ItemsCheckboxSec dataTable no-footer mb-0",children:[(0,h.jsx)("thead",{children:(0,h.jsxs)("tr",{children:[(0,h.jsx)("th",{children:c("id")}),(0,h.jsx)("th",{children:c("branchName")}),(0,h.jsx)("th",{children:c("parentBranch")}),(0,h.jsx)("th",{children:c("companyName")}),(0,h.jsx)("th",{children:c("businessGroup")}),(0,h.jsx)("th",{children:c("location")}),(0,h.jsx)("th",{children:c("childBranches")}),(t("branch","modify")||t("branch","delete"))&&(0,h.jsx)("th",{children:c("action")})]})}),(0,h.jsx)("tbody",{children:(0,h.jsx)(m,{tempValue:B,tempValue2:_,editData:R,tableData:J,currentPage:ne,itemsPerPage:10,onConfirmDelete:async e=>{await(0,v.SN)(e),(0,b.V)("Branch Deleted"),await me()},editDrawerOpen:e=>{const a=null===J||void 0===J?void 0:J.filter((a=>a._id===e));d("edit/".concat(e),{state:a})},setEditData:H},J)})]}),(0,h.jsxs)("div",{className:"d-sm-flex text-center justify-content-between align-items-center",children:[(0,h.jsxs)("div",{className:"dataTables_info",children:[c("showing")," ",10*(ne-1)+1," ",c("to")," ",Math.min(10*ne,de)," ",c("of")," ",de," ",c("entries")]}),(0,h.jsx)("div",{className:"dataTables_paginate paging_simple_numbers",id:"example2_paginate",children:(0,h.jsx)(y.A,{totalCount:de,itemsPerPage:10,handlePageClick:e=>{let{selected:a}=e;ie(a+1)}})})]})]})]})})})})})})]})}}}]);
//# sourceMappingURL=8995.af551815.chunk.js.map