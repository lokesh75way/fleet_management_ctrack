import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';

const Document = ({ setValue, handleSubmit, onSubmit, control, getValues, errors, register }) => {
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
    { value: "Insurance", label: "Insurance" },
    { value: "PCU", label: "PCU" },
    { value: "Registration Certificate", label: "Registration Certificate" },
    { value: "Service Contract", label: "Service Contract" },
    { value: "National Permit", label: "National Permit" },
    { value: "State Permit", label: "State Permit" },
    { value: "RTO Passing", label: "RTO Passing" },
    { value: "Road Tax", label: "Road Tax" },
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
              <div className="row mb-4 ">
                <div className="col-xl-3 mb-2">
                  <label className="form-label">Select Document</label>
                  <Controller
                    name={`documentType${index}`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <CreatableSelect
                        onChange={(newValue) => {
                          setTempValue(newValue?.value);
                          setValue(`documentType${index}`, newValue?.value);
                        }}
                        isClearable
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
                <div className="col-xl-3 mb-2">
                  <label className="form-label">Upload File</label>
                  <input
                    type="file"
                    {...register(`documentFile${index}`)}
                    label="Document Name"
                    name={`documentFile${index}`}
                    className="form-control"
                  />
                </div>
                <div className="col-xl-3 d-flex flex-column mb-2 ">
                  <label className="form-label">Issue Date</label>
                  <Controller
                    name={`documentName${index}IssueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`documentName${index}IssueDate`) ||
                          new Date()
                        }
                        className="form-control"
                        onChange={(newValue) =>
                          setValue(`documentName${index}IssueDate`, newValue)
                        }
                      />
                    )}
                  />
                </div>
                <div className="col-xl-3 d-flex flex-column  mb-2">
                  <label className="form-label">Expiry Date</label>
                  <Controller
                    name={`documentName${index}ExpiryDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`documentName${index}ExpiryDate`) ||
                          new Date()
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
