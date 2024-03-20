import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import CreatableSelect from 'react-select/creatable';
import Select from "react-select";
import CustomInput from "../../Input/CustomInput";
import Error from "../../Error/Error";

const Document = ({
  setValue,
  handleSubmit,
  onSubmit,
  getValues,
  control,
  errors,
  register,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });

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
  ]);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-12 d-flex align-items-center mb-4">
          <Button onClick={()=>append({fieldName:tempValue, file:null,IssueDate:"", ExpiryDate:"" })} className="ms-auto">
            + Add Document
          </Button>
        </div>
        {fields.map((item, index) => {
          return (
            <>
              <div key={item.id} className="row mb-4 ">
                <div className="col-xl-3 mb-2">
                  <label className="form-label">Select Document</label>
                  <Controller
                    name={`test.${index}.fieldName`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <CreatableSelect
                        onChange={(newValue) => {
                          setTempValue(newValue?.value);
                          setValue(`test.${index}.fieldName`, newValue?.value);
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
                  {!getValues(`test.${index}.fieldName`) && <Error errorName={errors?.test?.[index]?.fieldName} /> }
                </div>
                <div className="col-xl-3 mb-2">
                  <label className="form-label">Upload File</label>
                  <input
                    type="file" 
                    {...register(`test.${index}.file`)}
                    label="Document Name"
                    name={`test.${index}.file`}
                    // onChange={(newValue)=> console.log(newValue.target.value)}
                    className="form-control customDateHeight"
                  />
                  <Error errorName={errors?.test?.[index]?.file} /> 
                </div>
                <div className="col-xl-3 d-flex flex-column mb-2 ">
                  <label className="form-label">Issue Date</label>
                  <Controller
                    name={`test.${index}IssueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`test.${index}IssueDate`) ||
                          new Date()
                        }
                        className="form-control"
                        onChange={(newValue) =>
                          setValue(`test.${index}IssueDate`, newValue)
                        }
                      />
                    )}
                  />
                  {!getValues(`test.${index}.IssueDate`) && <Error errorName={errors?.test?.[index]?.IssueDate} /> }
                </div>
                <div className="col-xl-3 d-flex flex-column  mb-2">
                  <label className="form-label">Expiry Date</label>
                  <Controller
                    name={`test.${index}ExpiryDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`test.${index}ExpiryDate`) ||
                          new Date()
                        }
                        className="form-control"
                        onChange={(newValue) =>
                          setValue(`test.${index}ExpiryDate`, newValue)
                        }
                      />
                    )}
                  />
                  {!getValues(`test.${index}.ExpiryDate`) && <Error errorName={errors?.test?.[index]?.ExpiryDate} /> }
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
