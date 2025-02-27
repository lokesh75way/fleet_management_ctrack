import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import CustomInput from "../../../../components/Input/CustomInput";
import Error from "../../../../components/Error/Error";

import { useTranslation } from "react-i18next";
import FileUploader from "../../../../components/FileUploader";
import { useLocation, useParams } from "react-router-dom";
import data from "../../table/tableData";
import Spinner from "../../Spinner";

const Document = ({
  setValue,
  handleSubmit,
  onSubmit,
  getValues,
  formData,
  control,
  errors,
  register,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const [tempValue, setTempValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [issueDate, setIssueDate] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [dValues, setDvalues] = useState([]);

  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };

  const driverDocumentOptions = [
    { value: "DRIVING_LICENSE", label: "DRIVING_LICENSE" },
    { value: "AADHAR_CARD", label: "AADHAR_CARD" },
    { value: "PAN_CARD", label: "PAN_CARD" },
    { value: "BANK_ACCOUNT", label: "BANK_ACCOUNT" },
    { value: "MEDICLAIM", label: "MEDICLAIM" },
  ];

  useEffect(() => {
    if (id) {
      const data = location.state[0];
      setDvalues(data);
      setValue("documents", data.documents);
    }
  }, [id]);

  const formFields = dValues && dValues.documents ? dValues?.documents : fields;

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
                            dValues && dValues.documents?.length > 0
                              ? dValues?.documents[index]?.documentType
                              : driverDocumentOptions[1].value,
                          label:
                            dValues && dValues?.documents?.length > 0
                              ? dValues?.documents[index]?.documentType
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
                      dValues &&
                      dValues?.documents &&
                      dValues?.documents.length > 0 &&
                      dValues?.documents?.[index]?.file
                        ? dValues.documents?.[index]?.file
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

                  <Error
                    errorName={
                      errors?.documents?.[index]?.file ? "File is required" : ""
                    }
                  />
                </div>
                <div className="col-xl-3 d-flex flex-column mb-2 ">
                  <label className="form-label">{t("issueDate")}</label>
                  <Controller
                    name={`documents.${index}.issueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          dValues && dValues?.documents?.[index]?.issueDate
                            ? new Date(dValues?.documents[index]?.issueDate)
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
                <div className="col-xl-3 d-flex flex-column mb-2">
                  <label className="form-label">{t("expiryDate")}</label>
                  <Controller
                    name={`documents.${index}.expireDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          dValues && dValues?.documents?.[index]?.expireDate
                            ? new Date(dValues?.documents[index]?.expireDate)
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
            className="d-flex align-items-center justify-content-center"
            style={{ width: "120px", height: "40px" }}
          >
            {loading ? <Spinner /> : t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Document;
