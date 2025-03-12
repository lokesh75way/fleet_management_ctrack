import React, { useEffect, useState } from "react";
import { GetCountries, GetState } from "react-country-state-city/dist/cjs";
import Error from "../Error/Error";
import CustomInput from "./CustomInput";
import Select from "react-select";
import TimeZoneSelector from "../../jsx/components/TimeZoneSelector";
import { useTranslation } from "react-i18next";

const customStyles = {
  control: (base) => ({
    ...base,
    padding: ".25rem 0 ",
  }),
};

const LocationSelector = ({
  register,
  setValue,
  errors,
  getValues,
  locationData,
  dValues,
  id,
  showCity,
  Comptype,
}) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [countryCode, setCountryCode] = useState("IND");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await GetCountries();
        setCountriesList(result);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);
  

  useEffect(() => { 
    if (dValues && id) {
      setValue("city", dValues.city);
      setValue("country", dValues.country);
      const option = countryOptions.find(
        (option) => option.value == dValues?.country
      );
      setSelectedCountry(option);
      setValue("state", dValues.state || "");
      setSelectedState({
        value: dValues.state,
        label: dValues.state || "",
      });
    } else {
      setSelectedCountry({
        value: locationData?.country?.isoAlpha3,
        label: locationData?.country?.isoName,
      });
      setValue("country", locationData?.country?.isoAlpha3);
      setCountryCode(locationData?.country?.isoAlpha2);
      setSelectedState({
        value: locationData?.location?.principalSubdivision,
        label: locationData?.location?.principalSubdivision || "",
      });
      setValue("state", locationData?.location?.principalSubdivision || "");
      const selectedCountryId = isoToCountryId(
        locationData?.country?.isoAlpha3
      );
      GetState(selectedCountryId).then((result) => {
        setStateList(result);
      });
    }
  }, [locationData, id, dValues, countriesList]);
 
  const isoToCountryId = (isoCode) => {
    const country = countriesList.find((country) => country.iso3 === isoCode);
    return country ? country.id : null;
  };

  const handleCountryChange = async (selectedOption) => {
    try {
        const selectedIsoCode = selectedOption.value;
        const selectedCountryId = isoToCountryId(selectedIsoCode);

        if (!selectedCountryId) {
            console.error("Invalid country ID for:", selectedIsoCode);
            return;
        }

        const selectedCountry = countriesList.find(country => country.iso3 === selectedIsoCode);
        setCountryCode(selectedCountry.iso2);
        setValue("country", selectedIsoCode);
        setSelectedCountry({ value: selectedIsoCode, label: selectedCountry.name });

        setSelectedState(null);  
        setValue("state", "");  
        setStateList([]);   

        const result = await GetState(selectedCountryId);
        if (result.length > 0) {
            setStateList(result);
        } else {
            console.warn("No states found for:", selectedCountry.name);
        }
    } catch (error) {
        console.error("Failed to fetch states:", error);
    }
};

  const handleStateChange = (selectedOption) => {
    const selectedStateId = selectedOption.value;
    const selectedState = stateList.find(state => state.name === selectedStateId);
    if (!selectedState) return;

    let formattedStateName = selectedState.name;
    if (selectedCountry?.label === "United Arab Emirates" &&
        selectedState.name.endsWith(" Emirate")) {
        formattedStateName = selectedState.name.replace(" Emirate", "");
    }

    setValue("state", formattedStateName);
    setSelectedState({ value: formattedStateName, label: formattedStateName });
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
        <label className="form-label">{t("country")}</label>
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
        {/* <label className="form-label"> State</label> */}
        <label className="form-label">{t("state")}</label>
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
          <label className="form-label">{t("city")}</label>
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
      {showCity && (
        <TimeZoneSelector
          setValue={setValue}
          id={id}
          dValues={dValues}
          countryCode={countryCode}
          customStyle={customStyles}
          Comptype={Comptype}
        />
      )}
    </>
  );
};

export default LocationSelector;
