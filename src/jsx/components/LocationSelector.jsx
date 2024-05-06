import React, { useEffect, useState } from "react";
import { GetCountries, GetState } from "react-country-state-city/dist/cjs";
import Error from "./Error/Error";
import CustomInput from "./Input/CustomInput";
import Select from "react-select";

const LocationSelector = ({
  register,
  setValue,
  errors,
  getValues,
  locationData,
  dValues,
  id,
  showCity,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [isStateDisabled, setIsStateDisabled] = useState(true);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  
  const customStyles = {
    control: (base) => ({
      ...base,
      padding: ".25rem 0 ",
    }),
  };
  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  useEffect(() => {
    if (dValues && id) {
      setValue("city", dValues.city);
      setValue("country", dValues.country);
      const option = countryOptions.find(
        (option) => option.value == dValues?.country
      );
      setSelectedCountry(option)
      setValue("state", dValues.state || "");
      setSelectedState({
        value : dValues.state,
        label: dValues.state || ''
      })
    } else {
      setSelectedCountry({
        value : locationData?.country?.isoAlpha3,
        label: locationData?.country?.isoName
      })
      setValue("country", locationData?.country?.isoAlpha3);
      setSelectedState({
        value: locationData?.location?.principalSubdivision,
        label: locationData?.location?.principalSubdivision || "",
      });
      setValue("state", locationData?.location?.principalSubdivision || "");
      const selectedCountryId = isoToCountryId(locationData?.country?.isoAlpha3);
      GetState(selectedCountryId).then((result) => {
        setStateList(result);
      });
    }
  }, [locationData, id, dValues]);

  const isoToCountryId = (isoCode) => {
    const country = countriesList.find(country => country.iso3 === isoCode);
    return country ? country.id : null;
  };
  
  const handleCountryChange = async (selectedOption) => {
    const selectedIsoCode = selectedOption.value;
    setCountryId(selectedIsoCode);
  
    const selectedCountryId = isoToCountryId(selectedIsoCode);
  
    const selectedCountry = countriesList.find(
      (country) => country.iso3 === selectedIsoCode
    );
  
    setValue("country", selectedIsoCode);
    setSelectedCountry({value : selectedIsoCode, label : selectedCountry.name});
    setStateList([]);
    setStateId(0);
  
    const result = await GetState(selectedCountryId);
    setStateList(result);
  };

  const handleStateChange = (selectedOption) => {
    const selectedStateId = selectedOption.value;
    const selectedState = stateList.find(
      (state) => state.name === selectedStateId
    );
    if (
      selectedCountry?.label === "United Arab Emirates" &&
      selectedState?.name.endsWith(" Emirate")
    ) {
      selectedState.name = selectedState.name.replace(" Emirate", "");
    }
    setValue("state", selectedState.name);
    setSelectedState({value : selectedState.name, label : selectedState.name});
  };

  const getStateName = (state) => {
    if (
      selectedCountry?.label === "United Arab Emirates" &&
      state.name.endsWith(" Emirate")
    ) {
      return state.name.replace(" Emirate", "");
    }
    return state.name;
  };

// console.log({selectedCountry}, {selectedState})
  const countryOptions = countriesList.map((country) => ({
    value: country.iso3,
    label: country.name,
  }));

  const stateOptions = stateList.map((state) => ({
    value: state.name,
    label: getStateName(state),
  }));



  return (
    <>
      <div className="col-xl-3 mb-3">
        <label className="form-label">Country</label>
        {
          <Select
            options={countryOptions}
            key={selectedCountry}
            value={selectedCountry}
            styles={customStyles}
            onChange={handleCountryChange}
          />
        }
        {!selectedCountry && <Error errorName={errors.country} />}
      </div>
      <div className="col-xl-3 mb-3">
        <label className="form-label">State</label>
        <Select
          options={stateOptions}
          key={selectedState}
          value={selectedState}
          styles={customStyles}
          onChange={handleStateChange}
        />
        {!selectedState && <Error errorName={errors.state} />}
      </div>
      {showCity && (
        <div className="col-xl-3 mb-3">
          <label className="form-label">City</label>
          <CustomInput
            type="text"
            register={register}
            label="City"
            name="city"
            placeholder=""
            defaultValue={getValues("city")}
          />
          <Error errorName={errors.city} />
        </div>
      )}
    </>
  );
};

export default LocationSelector;
