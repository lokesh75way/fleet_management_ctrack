import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import Select from "react-select";
import Error from "../../Error/Error";
import CustomInput from "../../Input/CustomInput";
import {useParams} from 'react-router-dom'
import '../../../../scss/pages/_driver-tracking.scss'

import {useTranslation} from 'react-i18next'

const Address = ({ register, setValue, getValues, errors, handleSubmit, control, onSubmit }) => {

  const { t } = useTranslation();
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ", // Adjust the height as needed
    }),
  };
  const { id } = useParams();

  const userData = JSON.parse(localStorage.getItem("userJsonData"));

  const newData = userData.filter((data) => data.id === parseInt(id, 10));

  const [filteredUserData, setFilteredUserData] = useState(newData);
  return (
    <div className="p-4">
      <div className="row" style={{ width: "70%", margin: "auto" }}>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
            {t('street1')}<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street1"
            name="street1"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].street1 : ""
            }
          />
          <Error errorName={errors.street1} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('street2')}
          </label>
          <CustomInput
            type="text"
            register={register}
            label="Street2"
            name="street2"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].street2 : ""
            }
          />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput3" className="form-label">
          {t('city')}<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].city : ""
            }
          />
          <Error errorName={errors.city} />
        </div>
        <div className="col-xl-6 mb-3">
          <label htmlFor="exampleFormControlInput4" className="form-label">
          {t('zipCode')}<span className="text-danger">*</span>
          </label>
          <CustomInput
            type="number"
            register={register}
            label="Zip Code"
            name="zipCode"
            min="0"
            onInput={(e)=>{const temp = Math.max(0, e.target.value); e.target.value = temp < 1 ? '': temp}}
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].zipCode : ""
            }
          />
          <Error errorName={errors.zipCode} />
        </div>
        <div className="col-xl-6 mb-3">
          <label className="form-label">{t('country')}<span className="text-danger">*</span></label>
          <CountrySelect
            onChange={(e) => {
              setCountryid(e.id);
              setValue("country", e.name);
            }}
            containerClassName="bg-white"
            inputClassName="border border-white customSelectHeight"
            placeHolder="Select Country"
            
          />
          {!getValues('country') &&<Error errorName={errors.country} />}
        </div>

        <div className="col-xl-6 mb-3 ">
          <label className="form-label">{t('mediclaimNumber')}</label>
          <CustomInput
            type="text"
            register={register}
            label="Mediclaim Number"
            name="mediclaimNumber"
            placeholder=""
            defaultValue={
              filteredUserData[0] ? filteredUserData[0].mediclaimNumber : ""
            }
          />
        </div>
        <div className="col-xl-6 mb-3 d-flex flex-column">
          <label className="form-label">{t('mediclaimExpiryDate')}</label>
          <Controller
            name="mediclaimExpiryDate"
            control={control}
            render={({ value, name }) => (
              <DatePicker
                selected={getValues("mediclaimExpiryDate") || new Date()}
                className="form-control"
                onChange={(newValue) =>
                  setValue("mediclaimExpiryDate", newValue)
                }
                defaultValue={
                  filteredUserData[0] ? filteredUserData[0].mediclaimExpiryDate : ""
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
        <Button type="submit" onClick={handleSubmit(onSubmit)} style={{ width: "10%" }}>
          {" "}
          {t('submit')}
        </Button>
      </div>
    </div>
  );
};

export default Address;
