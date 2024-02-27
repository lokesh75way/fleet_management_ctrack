import React,{useState} from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Select from 'react-select'

const General = () => {
  const { register } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const customStyles = {
    control: base => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Branch <span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Vehicle Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("vehicleName", {
              required: "Vehicle Name is required",
            })}
            className="form-control"
            name="vehicleName"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Device Type <span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            IMEI Number <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("IMEINumber", {
              required: "IMEI Number is required",
            })}
            className="form-control"
            name="IMEINumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 ">
          <label className="form-label">
            Copy From <span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Server Address <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("serverAddress", {
              required: "Server Address is required",
            })}
            className="form-control"
            name="serverAddress"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            SIM Number <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("simNumber", {
              required: "SIM Number is required",
            })}
            className="form-control"
            name="simNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            Secondary SIM Number <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("secondarySimNumber", {
              required: "secondary SIM Number is required",
            })}
            className="form-control"
            name="secondarySimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Distance Counter<span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Unit of Distance<span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput6" className="form-label">
            Speed Detection<span className="text-danger">*</span>
          </label>
          <Select
            defaultValue={selectedOption}
            styles={customStyles}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          Device Accuracy Tolerance <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            {...register("deviceAccuracyTolerance", {
              required: "Device Accuracy Tolerance is required",
            })}
            className="form-control"
            name="deviceAccuracyTolerance"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Shift Group<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("shiftGroup", {
              required: "Shift Group is required",
            })}
            className="form-control"
            name="shiftGroup"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            Shift Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("shiftName", {
              required: "Shift Name is required",
            })}
            className="form-control"
            name="shiftName"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            QR Code<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            {...register("qrCode", {
              required: "QR Code is required",
            })}
            className="form-control"
            name="qrCode"
            placeholder=""
          />
        </div>
      </div>
      <div style={{ width: "100%", display:"flex", justifyContent:"center", margin:"2rem 0"}}>
          <Button style={{ width: "10%"}}> Next</Button>
        </div>
    </div>
  );
};

export default General;
