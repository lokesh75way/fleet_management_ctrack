import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Error from "../../Error/Error";
import '../../../../scss/pages/_driver-tracking.scss'
import { useTranslation } from 'react-i18next'
import FileUploader from "../../../../components/FileUploader"

const Document = ({
  setValue,
  handleSubmit,
  onSubmit,
  control,
  getValues,
  errors,
  register,
}) => {
  const { t } = useTranslation();
  const [tempValue, setTempValue] = useState(null);
  const [documents, setDocuments] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "vehicleDocument",
  });

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  const [driverDocumentOptions, setDriverDocumentOptions] = useState([
    { value: "INSURANCE", label: "INSURANCE" },
    { value: "PSU", label: "PSU" },
    { value: "REGISTRARION_CERTIFICATE", label: "REGISTRARION_CERTIFICATE" },
    { value: "SERVICE_CONTRACT", label: "SERVICE_CONTRACT" },
    { value: "NATIONAL_PERMIT", label: "NATIONAL_PERMIT" },
    { value: "STATE_PERMIT", label: "STATE_PERMIT" },
    { value: "RTO_PASSING", label: "RTO_PASSING" },
    { value: "ROAD_TAX", label: "Road Tax" },
  ]);
  const handleFileUploadSuccess = (fileLink, name) => {
    const index = name.split(".")[1];
    //name format test.0.file,
    // let document = {
    //   documentType: getValues(`test.${index}.fieldName`),
    //   file: fileLink,
    //   issueDate: getValues(`test.${index}.IssueDate`),
    //   expireDate: getValues(`test.${index}.ExpiryDate`),
    // };
    if (documents[index]) {
      let temp = [...documents];
      temp[index].file = fileLink;
      setDocuments(temp);
    } else {
      let temp = [...documents];
      temp[index] = {
        documentType: getValues(`test.${index}.fieldName`),
        file: fileLink,
        issueDate: getValues(`test.${index}.IssueDate`),
        expireDate: getValues(`test.${index}.ExpiryDate`),
      };
      setDocuments(temp);
    }

    console.log(documents);
    }
    
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-12 d-flex align-items-center mb-4">
          <Button onClick={() => {
            append({ fieldName: tempValue, file: null, IssueDate: "", ExpiryDate: "" })
            
            }} className="ms-auto">
            + {t('addDocument')}
          </Button>
        </div>
        {fields.map((item, index) => {
          return (
            <>
              <div key={item.id} className="row mb-4 ">
                <div className="col-xl-3 mb-2">
                  <label className="form-label">
                    {t("selectDocument")}
                    <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name={`test.${index}.fieldName`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <CreatableSelect
                        onChange={(newValue) => {
                          setTempValue(newValue?.value);
                          setValue(`test.${index}.fieldName`, newValue?.value);
                          if (documents[index]) {
                            let temp = [...documents];
                            temp[index].fieldName = newValue?.value;
                            setDocuments(temp);
                          } else {
                            let temp = [...documents];
                            temp[index] = {
                              documentType: newValue?.value,
                              file: getValues(`test.${index}.file`),
                              issueDate: getValues(`test.${index}.IssueDate`),
                              expireDate: getValues(`test.${index}.ExpiryDate`),
                            };
                            setDocuments(temp);
                          }

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
                  {!getValues(`test.${index}.fieldName`) && <Error errorName={errors?.test?.[index]?.fieldName} />}
                </div>
                <div className="col-xl-3 mb-2">
                  <label className="form-label">{t('uploadFile')}<span className="text-danger">*</span></label>
                  <FileUploader
                    register={register}
                    name={`test.${index}.file`}
                    label="Select File"
                    defaultValue=""
                    setValue={setValue}
                    setLoading={() => {}}
                    loading={false}
                    onSuccess={handleFileUploadSuccess}
                  />
                  <Error errorName={errors?.test?.[index]?.file} />
                </div>
                <div className="col-xl-3 d-flex flex-column mb-2 ">
                  <label className="form-label">{t("issueDate")}</label>
                  <Controller
                    name={`test.${index}.IssueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`test.${index}.IssueDate`) ||
                          new Date()
                        }
                        className="form-control customDateHeight"
                        onChange={(newValue) =>{
                          setValue(`test.${index}.IssueDate`, newValue)
                          if (documents[index]) {
                            let temp = [...documents];
                            temp[index].issueDate = newValue;
                            setDocuments(temp);
                          } else {
                            let temp = [...documents];
                            temp[index] = {
                              documentType: getValues(`test.${index}.fieldName`),
                              file: getValues(`test.${index}.file`),
                              issueDate: newValue,
                              expireDate: getValues(`test.${index}.ExpiryDate`),
                            };
                            setDocuments(temp);
                          }
                        }}
                      />
                    )}
                  />
                  {!getValues(`test.${index}.IssueDate`) && <Error errorName={errors?.test?.[index]?.IssueDate} />}
                </div>
                <div className="col-xl-3 d-flex flex-column  mb-2">
                  <label className="form-label">{t("expiryDate")}</label>
                  <Controller
                    name={`test.${index}.ExpiryDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          getValues(`test.${index}.ExpiryDate`) ||
                          new Date()
                        }
                        className="form-control customDateHeight"
                        onChange={(newValue) =>{
                          setValue(`test.${index}.ExpiryDate`, newValue)
                          if (documents[index]) {
                            let temp = [...documents];
                            temp[index].expireDate = newValue;
                            setDocuments(temp);
                          } else {
                            let temp = [...documents];
                            temp[index] = {
                              documentType: getValues(`test.${index}.fieldName`),
                              file: getValues(`test.${index}.file`),
                              issueDate: getValues(`test.${index}.IssueDate`),
                              expireDate: newValue,
                            };
                        }}}
                      />
                    )}
                  />
                  {!getValues(`test.${index}.ExpiryDate`) && <Error errorName={errors?.test?.[index]?.ExpiryDate} />}
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
            {t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
}


export default Document;
