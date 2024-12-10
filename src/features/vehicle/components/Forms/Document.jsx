import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";

import Error from "@/components/Error/Error";
import "@/assets/scss/pages/_driver-tracking.scss";
import FileUploader from "@/components/FileUploader";
import CustomInput from "@/components/Input/CustomInput";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ",
  }),
};

const Document = ({
  setValue,
  handleSubmit,
  onSubmit,
  control,
  getValues,
  errors,
  register,
  isFormSubmitting,
}) => {
  const [loading, setLoading] = useState();
  const { t } = useTranslation();
  const [documents, setDocuments] = useState([]);
  const { fields, append } = useFieldArray({
    control,
    name: "documents",
  });

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
  return (
    <div className="p-4">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-xl-12 d-flex align-items-center mb-4">
          <Button
            onClick={() => {
              append({
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
        {fields.map((item, index) => {
          return (
            <>
              <div key={item.id} className="row mb-4 ">
                <div className="col-xl-2 mb-2">
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
                      />
                    )}
                  />

                  <Error errorName={errors?.documents?.[index]?.documentType} />
                </div>

                <div className="col-xl-2 d-flex flex-column mb-2 ">
                  <label className="form-label">{t("issueDate")}</label>
                  <Controller
                    name={`documents.${index}.issueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={getValues(`documents.${index}.issueDate`)}
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

                  <Error errorName={errors?.documents?.[index]?.issueDate} />
                </div>
                <div className="col-xl-2 d-flex flex-column  mb-2">
                  <label className="form-label">{t("expiryDate")}</label>
                  <Controller
                    name={`documents.${index}.expireDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={getValues(`documents.${index}.expireDate`)}
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

                  <Error errorName={errors?.documents?.[index]?.expireDate} />
                </div>
                <div className="col-xl-2 d-flex flex-column mb-2 ">
                  <label className="form-label">
                    {t("Reminder(Before Days)")}
                  </label>
                  <Controller
                    name={`documents.${index}.reminder`}
                    control={control}
                    render={() => (
                      <CustomInput
                        type="number"
                        required
                        register={register}
                        name="reminder"
                        defaultValue={getValues(`documents.${index}.reminder`)}
                      />
                    )}
                  />

                  <Error errorName={errors?.documents?.[index]?.issueDate} />
                </div>
                <div className="col-xl-2 mb-2">
                  <label className="form-label">{t("uploadFile")}</label>
                  <FileUploader
                    getValue={getValues}
                    link={getValues(`documents.${index}.file`)}
                    register={register}
                    name={`documents.${index}.file`}
                    label="Select File"
                    defaultValue=""
                    setValue={setValue}
                    setLoading={setLoading}
                    loading={loading}
                  />

                  <Error errorName={errors.documents?.[index]?.file} />
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
            disabled={loading || isFormSubmitting}
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
