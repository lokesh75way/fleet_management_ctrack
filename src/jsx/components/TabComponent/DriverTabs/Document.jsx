import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import CustomInput from "../../Input/CustomInput";
const Document = ({
  setValue,
  handleSubmit,
  onSubmit,
  getValues,
  control,
  errors,
  register
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [document, setDocument] = useState([0]);
  const [tempValue, setTempValue] = useState(null);

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };

  const [driverDocumentOptions, setDriverDocumentOptions] = useState([
    { value: "Driving License", label: "Driving License" },
    { value: "Aadhar Card", label: "Aadhar Card" },
    { value: "PAN Card", label: "PAN Card" },
    { value: "Bank Account", label: "Bank Account" },
    { value: "Mediclaim", label: "Mediclaim" },
    { value: "Custom", label: "Custom" },
  ]);

  const changeValueCall = (val) => {
    const option = {
      value: val,
      label: val,
    };
    setDriverDocumentOptions(...driverDocumentOptions, option);
  };

  const documentCountChange = () => {
    setDocument((prev) => {
      const newArr = [...prev];
      newArr.push(0);
      return newArr;
    });
  };
  const handleChange = (e) => {
    setTempValue(e.target.value);
  };
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-12 d-flex align-items-center mb-4">
          <Button onClick={documentCountChange} className="ms-auto">
            + Add Document
          </Button>
        </div>
        {document.map((item, index) => {
          return (
            <>
              <div className="col-xl-6 mb-4 pb-4 d-flex flex-column">
                <div className="col-xl-12 mb-2">
                  <label className="form-label">Select Document</label>
                  <Controller
                    name={`documentType${index}`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setTempValue(newValue?.value);
                          setValue(`documentType${index}`, newValue?.value);
                        }}
                        options={driverDocumentOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        defaultValue={{
                          label: "Select Document",
                          value: "Select Document",
                        }}
                      />
                    )}
                  />
                </div>
                <div className="col-xl-12 mb-2">
                  <label className="form-label">
                    Document Name
                  </label>
                  <input
                    type="text"
                    {...register(`documentName${index}`)}
                    label="Document Name"
                    name={`documentName${index}`}
                    onChange={handleChange}
                    className="form-control"
                    value={tempValue}
                  />
                </div>{" "}
                <div className="d-flex col-xl-12 me-2 mb-2 flex-column">
                  <label className="form-label">Issue Date</label>
                  <Controller
                    name={`documentName${index}IssueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`documentName${index}IssueDate`) || new Date()
                        }
                        className="form-control"
                        onChange={(newValue) =>
                          setValue(`documentName${index}IssueDate`, newValue)
                        }
                      />
                    )}
                  />
                </div>
                <div className="d-flex col-xl-12 flex-column">
                  <label className="form-label">Expiry Date</label>
                  <Controller
                    name={`documentName${index}ExpiryDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`documentName${index}ExpiryDate`) || new Date()
                        }
                        className="form-control"
                        onChange={(newValue) =>
                          setValue(`documentName${index}ExpiryDate`, newValue)
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div key={index} className="col-xl-6 d-flex align-items-center">
                <div
                  style={{ border: "1px dashed black", borderRadius:"1rem", padding: "auto" }}
                  className="dz-default dlab-message upload-img w-100 text-primary"
                >
                  <form action="#" className="dropzone">
                    <svg
                      width="41"
                      height="40"
                      viewBox="0 0 41 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.5 20V35"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M34.4833 30.6501C36.1088 29.7638 37.393 28.3615 38.1331 26.6644C38.8731 24.9673 39.027 23.0721 38.5703 21.2779C38.1136 19.4836 37.0724 17.8926 35.6111 16.7558C34.1497 15.619 32.3514 15.0013 30.4999 15.0001H28.3999C27.8955 13.0488 26.9552 11.2373 25.6498 9.70171C24.3445 8.16614 22.708 6.94647 20.8634 6.1344C19.0189 5.32233 17.0142 4.93899 15.0001 5.01319C12.9861 5.0874 11.015 5.61722 9.23523 6.56283C7.45541 7.50844 5.91312 8.84523 4.7243 10.4727C3.53549 12.1002 2.73108 13.9759 2.37157 15.959C2.01205 17.9421 2.10678 19.9809 2.64862 21.9222C3.19047 23.8634 4.16534 25.6565 5.49994 27.1667"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.1666 26.6667L20.4999 20L13.8333 26.6667"
                        stroke="#DADADA"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="fallback">
                      <input name="file" type="file" multiple />
                    </div>
                  </form>
                </div>
              </div>
            </>
          );
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            {" "}
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Document;
