import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import FileUploader from "../../../../components/FileUploader";
import Error from "../../../../components/Error/Error";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";
import Spinner from "../../Spinner";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const Document = ({
  setValue,
  handleSubmit,
  onSubmit,
  getValues,
  control,
  errors,
  register,
  watch,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "documents",
  });

  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const driverDocumentOptions = [
    { value: "DRIVING_LICENSE", label: "Driving License" },
    { value: "AADHAR_CARD", label: "Aadhar Card" },
    { value: "PAN_CARD", label: "PAN Card" },
    { value: "BANK_ACCOUNT", label: "Bank Account" },
    { value: "MEDICLAIM", label: "Mediclaim" },
  ];

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

 useEffect(() => {
  if (id && location.state?.[0]?.documents) {
    const initialDocs = location.state[0].documents.map(doc => ({
      ...doc,
      issueDate: parseDate(doc.issueDate),
      expireDate: parseDate(doc.expireDate)
    }));
    setValue("documents", initialDocs);
  } else if (!id && fields.length === 0) {
    append({
      documentType: "",
      file: null,
      issueDate: null,
      expireDate: null
    });
  }
}, [id]);

  const selectedDocs = watch("documents")?.map((doc) => doc.documentType);
  const availableOptions = driverDocumentOptions.filter(
    (option) => !selectedDocs?.includes(option.value)
  );

  return (
    <div className="p-2">
      <div className="row" style={{ width: "80%", margin: "auto" }}>
        {fields.map((item, index) => (
          <div
            key={index}
            className="row mb-4 p-2 border rounded shadow-sm bg-light position-relative"
          >
            <div className="col-xl-11 d-flex align-items-center space-between">
              <div className="col-xl-3">
                <label className="form-label">
                  {t("selectDocument")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name={`documents.${index}.documentType`}
                  control={control}
                  rules={{ required: "Please select a document type" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={availableOptions}
                      placeholder="Document Type"
                      styles={{
                        control: (base) => ({ ...base, width: "100%" }),
                      }}
                      value={
                        driverDocumentOptions.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(selectedOption) =>
                        field.onChange(selectedOption.value)
                      }
                    />
                  )}
                />
                <Error errorName={errors?.documents?.[index]?.documentType && "Please select a Valid Doc type"} />
              </div>
              <div className="col-xl-3">
                <label className="form-label">
                  {t("uploadFile")} <span className="text-danger">*</span>
                </label>
                <FileUploader
                  register={register}
                  name={`documents.${index}.file`}
                  setValue={setValue}
                  setLoading={setLoading}
                  loading={loading}
                />
                <Error
                  errorName={
                    errors?.documents?.[index]?.file && "Please upload a file"
                  }
                />
              </div>
              <div className="col-xl-3">
                <label className="form-label">
                  {t("issueDate")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name={`documents.${index}.issueDate`}
                  control={control}
                  rules={{ required: "Please select an issue date" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      className="form-control"
                    />
                  )}
                />
                <Error errorName={errors?.documents?.[index]?.issueDate} />
              </div>
              <div className="col-xl-3">
                <label className="form-label">
                  {t("expiryDate")} <span className="text-danger">*</span>
                </label>
                <Controller
                  name={`documents.${index}.expireDate`}
                  control={control}
                  rules={{ required: "Please select an expiry date" }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      className="form-control"
                    />
                  )}
                />
                <Error errorName={errors?.documents?.[index]?.expireDate} />
              </div>
            </div>
            <div className="col-xl-1 d-flex justify-content-end align-items-center">
              {fields.length > 1 && (
                <Button variant="danger" onClick={() => remove(index)}>
                  <AiOutlineDelete size={20} />
                </Button>
              )}
              {index === fields.length - 1 && fields.length < 5 && (
                <Button
                  className="ms-2"
                  onClick={() =>
                    append({
                      documentType: "",
                      file: null,
                      issueDate: "",
                      expireDate: "",
                    })
                  }
                >
                  <AiOutlinePlus size={20} />
                </Button>
              )}
            </div>
          </div>
        ))}
        <div className="col-xl-12 d-flex justify-content-center">
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            style={{minWidth: '7rem'}}
          >
            {loading ? <Spinner /> : t("submit")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Document;
