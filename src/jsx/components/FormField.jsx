import React from "react";
import CustomInput from "./Input/CustomInput";
import Error from "./Error/Error";
import { SVGICON } from "../constant/theme";
import { t } from "i18next";


const FormField = ({ field, fields,index, register, getValues, errors,remove,id }) => {
    const handleRemoveForm = (index) => {
        remove(index)
      };
    
  return (
    <div key={field.id} className="row">
      <div className="d-flex align-items-center">
        {fields.length > 1 && (
          <div className="flex-grow-1 mb-3">
            <h5>User {index + 1}</h5>
          </div>
        )}
        {fields.length > 1 && (
          <div className="mr-5" onClick={() => handleRemoveForm(index)}>
            {SVGICON.Delete} 
          </div>
        )}
      </div>
      <div className="col-xl-4 mb-3">
        <label className="form-label">
          {t("name")} <span className="text-danger">*</span>
        </label>
        <CustomInput
          type="text"
          register={register}
          label="name"
          name={`userInfo.${index}.name`}
          placeholder=""
          defaultValue={getValues(`userInfo.${index}.name`)}
        />
        <Error errorName={errors.userInfo?.[index]?.name} />
      </div>
      <div className="col-xl-4 mb-3">
        <label className="form-label">
          {t("Designation")} <span className="text-danger">*</span>
        </label>
        <CustomInput
          type="text"
          register={register}
          label="designation"
          name={`userInfo.${index}.designation`}
          placeholder=""
          defaultValue={getValues(`userInfo.${index}.designation`)}
        />
        <Error errorName={errors.userInfo?.[index]?.designation} />
      </div>
      <div className="col-xl-4 mb-3">
        <label className="form-label">
          {t("mobileNumber")}
          <span className="text-danger">*</span>
        </label>
        <CustomInput
          type="number"
          register={register}
          name={`userInfo.${index}.mobileNumber`}
          label="Mobile Number"
          placeholder=""
          min="0"
          onInput={(e) => {
            const temp = Math.max(0, e.target.value);
            e.target.value = temp < 1 ? "" : temp;
          }}
          defaultValue={getValues(`userInfo.${index}.mobileNumber`)}
        />
        <Error errorName={errors.userInfo?.[index]?.mobileNumber} />
      </div>
      <div className="col-xl-4 mb-3">
        <label className="form-label">
          {t("email")}
          <span className="text-danger">*</span>
        </label>
        <CustomInput
          type="email"
          register={register}
          name={`userInfo.${index}.email`}
          label="email"
          placeholder=""
          defaultValue={getValues(`userInfo.${index}.email`)}
        />
        <Error errorName={errors.userInfo?.[index]?.email} />
      </div>
    </div>
  );
};

export default FormField;
