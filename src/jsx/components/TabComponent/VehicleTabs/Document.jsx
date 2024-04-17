import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import Error from "../../Error/Error";
import "../../../../scss/pages/_driver-tracking.scss";
import { useTranslation } from "react-i18next";
import FileUploader from "../../../../components/FileUploader";

const Document = ({
  setValue,
  handleSubmit,
  onSubmit,
  formData,
  control,
  getValues,
  errors,
  register,
}) => {
  const [loading, setLoading] = useState();
  const { t } = useTranslation();
  const [tempValue, setTempValue] = useState(null);
  const [documents, setDocuments] = useState([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });
console.log(errors)
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  const driverDocumentOptions = [
    { value: "INSURANCE", label: "INSURANCE" },
    { value: "PSU", label: "PSU" },
    { value: "REGISTRARION_CERTIFICATE", label: "REGISTRARION_CERTIFICATE" },
    { value: "SERVICE_CONTRACT", label: "SERVICE_CONTRACT" },
    { value: "NATIONAL_PERMIT", label: "NATIONAL_PERMIT" },
    { value: "STATE_PERMIT", label: "STATE_PERMIT" },
    { value: "RTO_PASSING", label: "RTO_PASSING" },
    { value: "ROAD_TAX", label: "Road Tax" },
  ];
  const formFields =
    formData && formData[0] && formData[0].documents
      ? formData[0]?.documents
      : fields;
  // console.log(formFields)
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-12 d-flex align-items-center mb-4">
          <Button
            onClick={() => {
              append({
                documentType: "",
                file: null,
                issueDate: "",
                expireDate: "",
              });
              formFields.push({
                documentType: "",
                file: null,
                issueDate: "",
                expireDate: "",
              });
            }}
            className="ms-auto"
          >
            + {t("addDocument")}
          </Button>
        </div>
        {formFields.map((item, index) => {
          return (
            <>
              <div key={item.id} className="row mb-4 ">
                <div className="col-xl-3 mb-2">
                  <label className="form-label">
                    {t("selectDocument")}
                    <span className="text-danger">*</span>
                  </label>

                  <Controller
                    name={`documents.${index}.documentType`}
                    control={control}
                    render={({ field: { value, name, ref } }) => (
                      <Select
                        onChange={(newValue) => {
                          setValue(
                            `documents[${index}].documentType`,
                            newValue.value
                          );
                        }}
                        options={driverDocumentOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        defaultValue={{
                          value:
                            formData && formData[0].documents.length > 0
                              ? formData[0].documents[index].documentType
                              : driverDocumentOptions[1].value,
                          label:
                            formData && formData[0].documents.length > 0
                              ? formData[0].documents[index].documentType
                              : driverDocumentOptions[1].label,
                        }}
                      />
                    )}
                  />
                  {!getValues(`documents.${index}.documentType`) && (
                    <Error
                      errorName={errors?.documents?.[index]?.documentType}
                    />
                  )}
                </div>
                <div className="col-xl-3 mb-2">
                  <label className="form-label">
                    {t("uploadFile")}
                    <span className="text-danger">*</span>
                  </label>
                  <FileUploader
                    getValue={getValues}
                    link={
                      formData &&
                      formData.length > 0 &&
                      formData[0].documents &&
                      formData[0].documents[index]?.file
                        ? formData[0].documents[index]?.file
                        : false
                    }
                    register={register}
                    name={`documents.${index}.file`}
                    label="Select File"
                    defaultValue=""
                    setValue={setValue}
                    setLoading={setLoading}
                    loading={loading}
                  />

                  <Error errorName={errors?.documents?.[index]?.file ? "File is required" : '' } />
                </div>
                <div className="col-xl-3 d-flex flex-column mb-2 ">
                  <label className="form-label">{t("issueDate")}</label>
                  <Controller
                    name={`documents.${index}.issueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          formData && formData[0]?.documents[index]?.issueDate
                            ? new Date(formData[0]?.documents[index]?.issueDate)
                            : getValues(`documents.${index}.issueDate`)
                        }
                        className="form-control customDateHeight"
                        onChange={(newValue) => {
                          setValue(`documents.${index}.issueDate`, newValue);
                          if (documents[index]) {
                            let temp = [...documents];
                            temp[index].issueDate = newValue;
                            setDocuments(temp);
                          } else {
                            let temp = [...documents];
                            temp[index] = {
                              documentType: getValues(
                                `documents.${index}.fieldName`
                              ),
                              file: getValues(`documents.${index}.file`),
                              issueDate: newValue,
                              expireDate: getValues(
                                `documents.${index}.expireDate`
                              ),
                            };
                            setDocuments(temp);
                          }
                        }}
                      />
                    )}
                  />
                  {!getValues(`documents.${index}.issueDate`) && (
                    <Error errorName={errors?.documents?.[index]?.issueDate} />
                  )}
                </div>
                <div className="col-xl-3 d-flex flex-column  mb-2">
                  <label className="form-label">{t("expiryDate")}</label>
                  <Controller
                    name={`documents.${index}.expireDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          formData && formData[0]?.documents[index]?.expireDate
                            ? new Date(
                                formData[0]?.documents[index]?.expireDate
                              )
                            : getValues(`documents.${index}.expireDate`)
                        }
                        className="form-control customDateHeight"
                        onChange={(newValue) => {
                          setValue(`documents.${index}.expireDate`, newValue);
                          if (documents[index]) {
                            let temp = [...documents];
                            temp[index].expireDate = newValue;
                            setDocuments(temp);
                          } else {
                            let temp = [...documents];
                            temp[index] = {
                              documentType: getValues(
                                `documents.${index}.fieldName`
                              ),
                              file: getValues(`documents.${index}.file`),
                              issueDate: getValues(
                                `documents.${index}.IssueDate`
                              ),
                              expireDate: newValue,
                            };
                          }
                        }}
                      />
                    )}
                  />
                  {!getValues(`documents.${index}.expireDate`) && (
                    <Error errorName={errors?.documents?.[index]?.expireDate} />
                  )}
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
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {" "}
            {t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Document;
