// import React, {
//   useState,
//   forwardRef,
//   useImperativeHandle,
//   useEffect,
// } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Offcanvas } from "react-bootstrap";
// import DatePicker from "react-datepicker";
// import Select from "react-select";
// import "react-country-state-city/dist/react-country-state-city.css";
// import { Controller, FormProvider, useForm } from "react-hook-form";
// import Error from "../components/Error/Error";
// import { tripStatusOptions } from "@/constants/options";
// import CustomInput from "../components/Input/CustomInput";
// import "@/assets/scss/pages/_driver-tracking.scss";
// import DriverDropdown from "../components/DriverDropdown";
// const ClassifyTripsOffcanvas = forwardRef(
//   (
//     {
//       Title,
//       editData,
//       setEditData,
//       register,
//       setValue,
//       getValues,
//       handleSubmit,
//       onSubmit,
//       errors,
//       control,
//       clearErrors,
//     },
//     ref
//   ) => {
//     const [addEmploye, setAddEmploye] = useState(false);
//     const [tempValue, setTempValue] = useState();

//     useImperativeHandle(ref, () => ({
//       showModal() {
//         setAddEmploye(true);
//       },
//     }));
//     const nav = useNavigate();
//     const customStyles = {
//       control: (base) => ({
//         ...base,
//         padding: ".25rem 0 ", // Adjust the height as needed
//       }),
//     };
//     useEffect(() => {
//       if (addEmploye === true) {
//         clearErrors("startTime");
//         clearErrors("startLocation");
//         clearErrors("reachTime");
//         clearErrors("reachLocation");
//         clearErrors("driver");
//         setValue("startTime", "");
//         setValue("startLocation", "");
//         setValue("reachTime", "");
//         setValue("reachLocation", "");
//         setValue("driver", "");
//         setValue("distance", "");
//         setValue("fuelConsumption", "");
//         setValue("lastModifiedBy", "");
//       }
//     }, [addEmploye]);

//     return (
//       <>
//         <Offcanvas
//           show={addEmploye}
//           onHide={setAddEmploye}
//           className="offcanvas-end customeoff"
//           placement="end"
//         >
//           <div className="offcanvas-header">
//             <h5 className="modal-title" id="#gridSystemModal">
//               {Title}
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={() => setAddEmploye(false)}
//             >
//               <i className="fa-solid fa-xmark"></i>
//             </button>
//           </div>
//           <div className="offcanvas-body">
//             <div className="container-fluid">
//               <FormProvider>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="row">
//                     <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Start Time <span className="text-danger">*</span>
//                       </label>
//                       <Controller
//                         name="startTime"
//                         control={control}
//                         render={({ value, name }) => (
//                           <DatePicker
//                             selected={getValues("startTime") || new Date()}
//                             className="form-control customDateHeight"
//                             onChange={(newValue) =>
//                               setValue("startTime", newValue)
//                             }
//                           />
//                         )}
//                       />
//                       <Error errorName={errors.startTime} />
//                     </div>
//                     <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Start Location <span className="text-danger">*</span>
//                       </label>
//                       <CustomInput
//                         type="text"
//                         register={register}
//                         label="Start Location"
//                         name="startLocation"
//                         placeholder=""
//                       />
//                       <Error errorName={errors.startLocation} />
//                     </div>
//                     <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Reach Time <span className="text-danger">*</span>
//                       </label>
//                       <Controller
//                         name="reachTime"
//                         control={control}
//                         render={({ value, name }) => (
//                           <DatePicker
//                             selected={getValues("reachTime") || new Date()}
//                             className="form-control customDateHeight"
//                             onChange={(newValue) =>
//                               setValue("reachTime", newValue)
//                             }
//                           />
//                         )}
//                       />
//                       <Error errorName={errors.reachTime} />
//                     </div>
//                     <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Reach Location <span className="text-danger">*</span>
//                       </label>
//                       <CustomInput
//                         type="text"
//                         register={register}
//                         label="Reach Location"
//                         name="reachLocation"
//                         placeholder=""
//                       />
//                       <Error errorName={errors.reachLocation} />
//                     </div>
//                     <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Distance
//                       </label>
//                       <CustomInput
//                         type="number"
//                         register={register}
//                         label="Distance"
//                         name="distance"
//                         placeholder=""
//                       />
//                     </div>
//                     <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Fuel Consumption
//                       </label>
//                       <CustomInput
//                         type="number"
//                         register={register}
//                         label="Fuel Consumption"
//                         name="fuelConsumption"
//                         placeholder=""
//                       />
//                     </div>
//                     <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Driver <span className="text-danger">*</span>
//                       </label>
//                       <Controller
//                         name="driverId"
//                         control={control}
//                         rules={{ required: true }}
//                         render={({ field: { onChange, value, name, ref } }) => (
//                           <DriverDropdown
//                             onChange={(newValue) => {
//                               setValue("driverId", newValue.value);
//                               setValue("driverId", newValue.value);
//                             }}
//                             value={value}
//                             customStyles={customStyles}
//                             ref={ref}
//                             name={name}
//                           />
//                         )}
//                       />
//                       <Error errorName={errors.driver} />
//                     </div>
//                     {/* <div className="col-xl-6 mb-3">
//                       <label
//                         htmlFor="exampleFormControlInput3"
//                         className="form-label"
//                       >
//                         Last Modified By
//                       </label>
//                       <CustomInput
//                         type="text"
//                         register={register}
//                         label="Last Modified By"
//                         name="lastModifiedBy"
//                         placeholder=""
//                       />
//                     </div> */}
//                     {/* <div className="col-xl-6 mb-3 d-flex flex-column">
//                       <label className="form-label">Last Modified Date</label>
//                       <Controller
//                         name="lastModifiedDate"
//                         control={control}
//                         render={({ value, name }) => (
//                           <DatePicker
//                             selected={
//                               getValues("lastModifiedDate") || new Date()
//                             }
//                             className="form-control customDateHeight"
//                             onChange={(newValue) => {
//                               setTempValue(newValue.value);
//                               setValue("lastModifiedDate", newValue);
//                             }}
//                           />
//                         )}
//                       />
//                     </div> */}
//                     <div className="col-xl-6 mb-3 ">
//                       <label className="form-label">Trip Status</label>
//                       <Controller
//                         name="tripStatus"
//                         control={control}
//                         render={({ field: { onChange, value, name, ref } }) => (
//                           <Select
//                             onChange={(newValue) => {
//                               setTempValue(newValue.value);
//                               setValue("tripStatus", newValue.value);
//                             }}
//                             options={tripStatusOptions}
//                             ref={ref}
//                             name={name}
//                             styles={customStyles}
//                             defaultValue={tripStatusOptions[0]}
//                           />
//                         )}
//                       />
//                     </div>
//                   </div>
//                   <div>
//                     <button
//                       type="submit"
//                       onClick={() => {
//                         handleSubmit(onSubmit);
//                       }}
//                       className="btn btn-primary me-1"
//                     >
//                       Submit
//                     </button>
//                     <Link
//                       to={"#"}
//                       onClick={() => setAddEmploye(false)}
//                       className="btn btn-danger light ms-1"
//                     >
//                       Cancel
//                     </Link>
//                   </div>
//                 </form>
//               </FormProvider>
//             </div>
//           </div>
//         </Offcanvas>
//       </>
//     );
//   }
// );

// export default ClassifyTripsOffcanvas;
