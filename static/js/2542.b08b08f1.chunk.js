"use strict";(self.webpackChunkFLEET=self.webpackChunkFLEET||[]).push([[2542],{62542:(e,a,n)=>{n.r(a),n.d(a,{default:()=>A});var t=n(78109),s=n(67236),r=n(36145),i=n(93576),l=n(86554),d=(n(1682),n(53252)),o=n(4900),u=n(67889),c=n(6986),h=n(34571),m=n(32343),v=n(44988),b=n(70529),g=n(96152),p=n(71459),f=n(19076),j=n(20460),x=n(20811),y=n(47337);const A=()=>{var e,a;const{t:n}=(0,h.Bd)(),[A,E]=(0,t.useState)(0),{id:S}=(0,s.g)(),w=[n(S?"editBranch":"newBranch")],C=[f.A],F=(0,s.Zp)(),I=(0,o.jE)(),{data:B,isLoading:L,isError:N}=(0,u.I)({queryKey:["branch",S],queryFn:()=>(0,p.dh)(S),enabled:!!S,staleTime:1/0});(0,t.useEffect)((()=>{N&&S&&((0,b.U)("Not able to fetch branch data"),F("/not-found"))}),[N&&S]);const V=(0,t.useMemo)((()=>{var e,a;return{...B,businessGroupId:null===B||void 0===B||null===(e=B.businessGroupId)||void 0===e?void 0:e._id,companyId:null===B||void 0===B||null===(a=B.companyId)||void 0===a?void 0:a._id}}),[B]),{register:k,formState:{errors:T},setValue:K,getValues:U,control:G,handleSubmit:P,watch:q}=(0,l.mN)({defaultValues:{companyId:"",businessGroupId:"",userInfo:[{name:"",designation:"",mobileNumber:null,email:""}],timeFormat:null===(e=j.lD[1])||void 0===e?void 0:e.value,dateFormat:null===(a=j.wJ[1])||void 0===a?void 0:a.value},resolver:(0,d.t)(v.dZ),values:V}),{mutate:Q,isPending:Z}=(0,c.n)({mutationFn:p.v9,onSuccess:()=>{(0,b.V)("Branch has been created"),I.invalidateQueries(["branches"]),F("/branch")},onError:e=>(0,b.U)((0,g.SU)(e))}),{mutate:_,isPending:D}=(0,c.n)({mutationFn:e=>{let{data:a,id:n}=e;return(0,p.t0)(n,a)},onSuccess:()=>{(0,b.V)("Branch has been updated!"),I.invalidateQueries(["branches"]),F("/branch")},onError:e=>{(0,b.U)(e.message)}}),J=async e=>{0===A&&(null!=e.logo&&0!==e.logo.length||delete e.logo,e.file&&0===e.file.length&&delete e.file,S?_({data:e,id:S}):Q(e))};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(m.A,{mainTitle:"Branch",pageTitle:S?"Edit":"Create",parentTitle:"Branch"}),(0,y.jsx)("div",{className:"m-2 p-2",children:(0,y.jsx)(l.Op,{children:(0,y.jsx)("form",{onSubmit:P(J),children:(0,y.jsx)("div",{className:"default-tab",children:(0,y.jsxs)(r.A.Container,{defaultActiveKey:w[0].toLowerCase(),children:[(0,y.jsx)(i.A,{as:"ul",className:"nav-tabs",children:w.map(((e,a)=>(0,y.jsx)(i.A.Item,{as:"li",children:(0,y.jsx)(i.A.Link,{style:{padding:".5rem 2rem"},eventKey:e.toLowerCase(),active:a===A,onClick:()=>E(a),children:e})},a)))}),(0,y.jsx)(r.A.Content,{className:"pt-4",children:L?(0,y.jsx)(x.A,{height:500}):w.map(((e,a)=>{const n=C[a];return(0,y.jsx)(r.A.Pane,{eventKey:e.toLowerCase(),active:a===A,children:(0,y.jsx)(n,{data:w,control:G,setValue:K,register:k,getValues:U,errors:T,handleSubmit:P,onSubmit:J,watch:q,isFormSubmitting:Z||D})},a)}))})]})})})})})]})}}}]);
//# sourceMappingURL=2542.b08b08f1.chunk.js.map