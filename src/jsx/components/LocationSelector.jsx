import React, { useEffect, useState } from "react";
import { CountrySelect, StateSelect } from "react-country-state-city/dist/cjs";
import Error from "./Error/Error";
import CustomInput from "./Input/CustomInput";

const LocationSelector = ({ register, setValue, errors,getValues,locationData,dValues,id, showCity }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countryid, setCountryid] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  useEffect(() => {
    if (dValues && id){
        setValue("city", dValues.city);
        setSelectedCountry({ name: dValues.country });
        setValue("country", dValues.country);
        setSelectedState({ name: dValues.state || "" });
        setValue("state", dValues.state || "");
    }
    else if(locationData){
        setSelectedCountry({ name: locationData?.country?.name || '' });
        setValue("country", locationData?.country?.name);
        setSelectedState({
          name: locationData?.location?.principalSubdivision,
        });
        setValue("state", locationData?.location?.principalSubdivision || "");
    }
  }, [locationData,id,dValues]);

  const handleCountryChange = (e) => {
    setSelectedState({ name: "" });
    setCountryid(e.id);
    setValue("country", e.name);
    setIsStateDisabled(false);
  };

  const handleStateChange = (e) => {
    console.log(e, "sdg:-")
    setValue("state", e.name);
  };


  return (
    <>
      <div className="col-xl-3 mb-3">
        <label className="form-label">Country</label>
        <CountrySelect
          onChange={handleCountryChange}
          containerClassName="bg-white"
          inputClassName="border border-white customSelectHeight"
          placeHolder="Select Country"
          defaultValue={selectedCountry}
        />
        {!selectedCountry && <Error errorName={errors.country} />}
      </div>
      <div className="col-xl-3 mb-3">
        <label className="form-label">State</label>
        <StateSelect
          countryid={isStateDisabled ? 0 : countryid}
          onChange={handleStateChange}
          containerClassName="bg-white"
          inputClassName="border border-white customSelectHeight"
          placeHolder="Select State"
          defaultValue={selectedState}
        />
        {!selectedState && <Error errorName={errors.state} />}
      </div>
      { showCity && <div className="col-xl-3 mb-3">
        <label className="form-label">City</label>
        <CustomInput
          type="text"
          register={register}
          label="City"
          name="city"
          placeholder=""
          defaultValue={getValues('city')}
        />
        <Error errorName={errors.city} />
      </div>}
    </>
  );
};

export default LocationSelector;
