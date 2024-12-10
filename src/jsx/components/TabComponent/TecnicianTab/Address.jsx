import React from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { CountrySelect } from "react-country-state-city/dist/cjs";
import Error from "../../../../components/Error/Error";
import CustomInput from "../../../../components/Input/CustomInput";
import "@/assets/scss/pages/_driver-tracking.scss";

import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Address = ({
  register,
  setValue,
  getValues,
  errors,
  handleSubmit,
  control,
  onSubmit,
  defaultCountry,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("street1")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            name="address.street1"
            placeholder=""
          />
          {!getValues("address.street1") && (
            <Error errorName={errors.address?.street1} />
          )}
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("street2")}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street2"
            name="address.street2"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t("city")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="address.city"
            placeholder=""
          />
          <Error errorName={errors.address?.city} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
            {t("zipCode")}
            <span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Zip Code"
            name="address.zipCode"
            min="0"
            onInput={(e) => {
              const temp = Math.max(0, e.target.value);
              e.target.value = temp < 1 ? "" : temp;
            }}
            placeholder=""
          />
          <Error errorName={errors.address?.zipCode} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">
            {t("country")}
            <span className="text-danger">*</span>
          </label>
          <CountrySelect
            onChange={(e) => {
              setValue("address.country", e.name);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white customSelectHeight"
            placeHolder="Select Country"
            defaultValue={id && { name: getValues("address.country") }}
          />
          {!getValues("address.country") && (
            <Error errorName={errors.address?.country} />
          )}
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t("mediclaimNumber")}</label>
          <CustomInput
            type="text"
            register={register}
            label="Mediclaim Number"
            name="address.mediclaimNumber"
            placeholder=""
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t("mediclaimExpiryDate")}</label>
          <Controller
            name="address.mediclaimExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={
                  getValues("address.mediclaimExpiryDate")
                    ? new Date(getValues("address.mediclaimExpiryDate"))
                    : new Date()
                }
                className="form-control"
                onChange={(newValue) =>
                  setValue("address.mediclaimExpiryDate", newValue)
                }
              />
            )}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "2rem 0",
        }}
      >
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          style={{ width: "10%" }}
        >
          {" "}
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default Address;
