import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import CustomInput from "../../Input/CustomInput";
import Error from "../../Error/Error";

import { useTranslation } from "react-i18next";
import FileUploader from "../../../../components/FileUploader";

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
  const [loading , setLoading] = useState(false);
  const [issueDate, setIssueDate] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const { t } = useTranslation();

  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };

  const [driverDocumentOptions, setDriverDocumentOptions] = useState([
    { value: "DRIVING_LICENSE", label: "Driving License" },
    { value: "AADHAR_CARD", label: "Aadhar Card" },
    { value: "PAN_CARD", label: "PAN Card" },
    { value: "BANK_ACCOUNT", label: "Bank Account" },
    { value: "MEDICLAIM", label: "Mediclaim" },
  ]);

  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-12 d-flex align-items-center mb-4">
          <Button
            onClick={() =>
              append({
                documentType: "",
                file: "",
                issueDate: "",
                expireDate: "",
              })
            }
            className="ms-auto"
          >
            + {t("addDocument")}
          </Button>
        </div>
        {fields.map((item, index) => {
          return (
            <>
              <div  key={item.id} className="row mb-4 ">
                <div className="col-xl-3 mb-2">
                  <label className="form-label">
                    {t("selectDocument")}
                    <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name={`documents.${index}.documentType`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <CreatableSelect
                        onChange={(newValue) => {
                          setTempValue(newValue?.value);
                          setValue(
                            `documents.${index}.documentType`,
                            newValue?.value
                          );
                        }}
                        isClearable
                        options={driverDocumentOptions}
                        ref={ref}
                        name={name}
                        styles={customStyles}
                        defaultValue={{ label: value, value }}
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
                    register={register}
                    label="Document Name"
                    name={`documents.${index}.file`}
                    className="form-control "
                    setValue={setValue}
                    setLoading={setLoading}
                    loading={loading}
                  />
                  {loading && <small>Uploading...</small>}
                  <Error errorName={errors?.documents?.[index]?.file} />
                </div>
                <div className="col-xl-3 d-flex flex-column mb-2 ">
                  <label className="form-label">{t("issueDate")}
                  <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name={`documents.${index}.issueDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                          issueDate ||
                          new Date()
                        }
                        className="form-control customDateHeight"
                        onChange={(newValue) =>{ 
                          console.log(newValue.toISOString().split('T')[0])
                          setIssueDate(newValue) 
                          setValue(`documents.${index}.issueDate`, newValue.toISOString().split('T')[0])
                        }}
                      />
                    )}
                  />
                  {!getValues(`documents.${index}.issueDate`) && (
                    <Error errorName={errors?.documents?.[index]?.issueDate} />
                  )}
                </div>
                <div className="col-xl-3 d-flex flex-column  mb-2">
                  <label className="form-label">{t("expiryDate")}
                  <span className="text-danger">*</span>
                  </label>
                  <Controller
                    name={`documents.${index}.expireDate`}
                    control={control}
                    render={({ value, name }) => (
                      <DatePicker
                        selected={
                         expiryDate ||
                          new Date()
                        }
                        className="form-control customDateHeight"
                        onChange={(newValue) =>{
                          setExpiryDate(newValue)
                          setValue(`documents.${index}.expireDate`, newValue.toISOString().split('T')[0])
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
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            {t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Document;
