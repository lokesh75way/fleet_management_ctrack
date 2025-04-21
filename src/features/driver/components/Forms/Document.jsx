import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import {driverDocumentOptions} from "../../../../constants/options"
import Error from "@/components/Error/Error";
import FileUploader from "@/components/FileUploader";
import useTranslate from "@/hooks/useTranslate";

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
  getValues,
  control,
  errors,
  register,
  isFormSubmitting,
}) => {
  const { fields, append } = useFieldArray({
    control,
    name: "documents",
  });

  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);

  const { t } = useTranslation();

  const driverDocumentTranslated = useTranslate(driverDocumentOptions);


  return (
    <div className="p-4">
      <div className="row" style={{ width: "90%", margin: "auto" }}>
        <div className="col-xl-12 d-flex align-items-center mb-4">
          <Button
            onClick={() => {
              append({
                documentType: "",
                file: null,
                issueDate: new Date(),
                expireDate: new Date(),
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
                        options={driverDocumentTranslated}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        defaultValue={{
                          value:
                            getValues(`documents.${index}.documentType`) ??
                            driverDocumentTranslated[1].value,
                          label:
                            getValues(`documents.${index}.documentType`) ??
                            driverDocumentTranslated[1].label,
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
                <div className="col-xl-3 d-flex flex-column mb-2 ">
                  <label className="form-label">{t("issueDate")}</label>
                  <Controller
                    name={`documents.${index}.issueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          new Date(getValues(`documents.${index}.issueDate`))
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
                          new Date(getValues(`documents.${index}.expireDate`))
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
                <div className="col-xl-3 mb-2">
                  <label className="form-label">
                    {t("uploadFile")}
                    <span className="text-danger">*</span>
                  </label>
                  <FileUploader
                    getValue={getValues}
                    link={getValues(`documents.${index}.file`) ?? false}
                    register={register}
                    name={`documents.${index}.file`}
                    label={t("selectFile")}
                    defaultValue=""
                    setValue={setValue}
                    setLoading={setLoading}
                    loading={loading}
                    componentType="driver"
                  />

                  <Error
                    errorName={
                      errors?.documents?.[index]?.file ? "File is required" : ""
                    }
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
          <Button
            type="submit"
            disabled={isFormSubmitting || loading}
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
