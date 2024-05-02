import React, { useState } from "react";

import { LuEye, LuEyeOff } from "react-icons/lu";
import { t } from "i18next";
import CustomInput from "./Input/CustomInput";
import Error from "./Error/Error";

const CredentialsInput = ({ heading, register, errors, id, getValues }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="row">

        <h3 className="mt-4 mb-4">{heading}</h3>
    
    <div className="col-xl-3 mb-3">
      <label className="form-label">
        {t('userName')} <span className="text-danger">*</span>
      </label>
      <CustomInput
        type="text"
        register={register}
        label="userName"
        name="userName"
        placeholder=""
        defaultValue={getValues("userName")}
        disabled={id ? true : false}
        />
      <Error errorName={errors.userName} />
      </div>
     
        { !id && (<div className="col-xl-3 mb-3 ">
          <label className="form-label">
            {t("password")} <span className="text-danger">*</span>
          </label>
        <div className="position-relative">
          <CustomInput
            type={showPassword ? "text" : "password"}
            register={register}
            label="Password"
            name="password"
            placeholder=""
            />
          <span
            className="showPasswordIcon"
            onClick={() => {
                setShowPassword(!showPassword);
            }}
            >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </span>
        </div>
      {!id && <Error errorName={errors.password} />}
      </div>
      
      )}
    </div>
    
  );
};

export default CredentialsInput;
