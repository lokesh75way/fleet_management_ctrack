// import React, { useState, forwardRef, useImperativeHandle } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { Dropdown, Nav, Offcanvas, Tab } from "react-bootstrap";
// import { FormProvider, useForm } from "react-hook-form";
// import "react-country-state-city/dist/react-country-state-city.css";
// import MainPagetitle from "../../../../layouts/MainPagetitle";
// import MyAccount from "../../../../components/TabComponent/CompanyTabs/MyAccount";
// import UserSetting from "../../../../components/TabComponent/CompanyTabs/UserSetting";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { companyAccountSchema, companySettingSchema } from '../../../../../yup' ;
// import { notifySuccess } from "../../../../../utils/toast";

// const UpdateCompanyForm = () => {
  
//   const [activeIndex, setActiveIndex] = useState(0);
//   const tabHeading = ["My Account", "User Setting"];
//   const component = [MyAccount, UserSetting];
//   const totalTabs = tabHeading.length;
//   const {register, formState:{errors}, setValue, getValues, control, handleSubmit} = useForm({
//     resolver: yupResolver(activeIndex === 0 ? companyAccountSchema: companySettingSchema)
//   })
//   const {id} = useParams()
//   const navigate = useNavigate()
//   const onSubmit = (data)=>{
//     console.log("Hello")
//     if(activeIndex === (totalTabs -1)){
//       // const val = JSON.parse(localStorage.getItem("userJsonData"));
//       //     console.log("Id is needed",id, data)
//       //     const indexToUpdate = val.findIndex((item) => item.id == id);
//       //     if (indexToUpdate !== -1) {
//       //       val[indexToUpdate] = { ...data, id , role : "company"};
//       //       localStorage.setItem("userJsonData", JSON.stringify(val));
//       //       notifySuccess("Company Updated!");
//       //       navigate("/company");}
//     }
//     console.log(data)
//     setActiveIndex((prevIndex) => Math.min(prevIndex + 1, totalTabs - 1));
//   }
//   return (
//     <>
//       <MainPagetitle
//         mainTitle="Company"
//         pageTitle={"Create"}
//         parentTitle={"Company"}
//       />
//       <div className="m-2 p-2">
//         <FormProvider>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="default-tab">
//               <Tab.Container defaultActiveKey={tabHeading[0].toLowerCase()}>
//                 <Nav as="ul" className="nav-tabs">
//                   {tabHeading.map((data, i) => (
//                     <Nav.Item as="li" key={i}>
//                       <Nav.Link
//                         style={{ padding: ".5rem 2rem" }}
//                         eventKey={data.toLowerCase()}
//                         active={i === activeIndex}
//                         onClick={() => setActiveIndex(i)}
//                       >
//                         {data}
//                       </Nav.Link>
//                     </Nav.Item>
//                   ))}
//                 </Nav>
//                 <Tab.Content className="pt-4">
//                   {tabHeading.map((data, i) => {
//                     const Component = component[i];
//                     return (
//                       <Tab.Pane
//                         eventKey={data.toLowerCase()}
//                         key={i}
//                         active={i === activeIndex}
//                       >
//                         <Component
//                           data={tabHeading}
//                           control={control}
//                           setValue={setValue}
//                           register={register}
//                           getValues={getValues}
//                           errors={errors}
//                           onSubmit={onSubmit}
//                           handleSubmit={handleSubmit}
//                         />
//                       </Tab.Pane>
//                     );
//                   })}
//                 </Tab.Content>
//               </Tab.Container>
//             </div>
//           </form>
//         </FormProvider>
//       </div>
//     </>
//   );
// };
// export default UpdateCompanyForm;
