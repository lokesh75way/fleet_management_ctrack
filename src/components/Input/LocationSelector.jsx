import React, { useEffect, useState } from "react";
import { GetCountries, GetState, GetCity } from "react-country-state-city/dist/cjs";
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
  showtimeZone = true,
}) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countryCode, setCountryCode] = useState("IND");
  const [countryId, setCountryId] = useState(null);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  useEffect(() => {
    if (id) {
      if (dValues?.city) {
        setValue("city", dValues.city);
        setSelectedCity({
          value: dValues.city,
          label: dValues.city,
        });
      }
      
      if (dValues?.country) {
        setValue("country", dValues.country);
        const option = countryOptions.find(
          (option) => option.value === dValues?.country
        );
        if (option) handleCountryChange(option);
      }
      
      if (dValues?.state) {
        setValue("state", dValues.state || "");
        setSelectedState({
          value: dValues.state,
          label: dValues.state || "",
        });
        
        // If we have both country and state, we can load cities
        if (dValues?.country && dValues?.state && countryId) {
          const stateObj = stateList.find(state => getStateName(state) === dValues.state);
          if (stateObj) {
            loadCities(countryId, stateObj.id);
          }
        }
      }
    } else {
      if (locationData?.country?.isoAlpha3) {
        setSelectedCountry({
          value: locationData?.country?.isoAlpha3,
          label: locationData?.country?.isoName,
        });
        setValue("country", locationData?.country?.isoAlpha3);
        setCountryCode(locationData?.country?.isoAlpha2);
        
        const selectedCountryId = isoToCountryId(locationData?.country?.isoAlpha3);
        setCountryId(selectedCountryId);
        
        if (locationData?.location?.principalSubdivision) {
          setSelectedState({
            value: locationData?.location?.principalSubdivision,
            label: locationData?.location?.principalSubdivision || "",
          });
          setValue("state", locationData?.location?.principalSubdivision || "");
          
          GetState(selectedCountryId).then((result) => {
            setStateList(result);
            // Find state ID to load cities
            const stateObj = result.find(state => 
              getStateName(state) === locationData?.location?.principalSubdivision);
            if (stateObj) {
              loadCities(selectedCountryId, stateObj.id);
            }
          });
        } else {
          GetState(selectedCountryId).then((result) => {
            setStateList(result);
          });
        }
        
        if (locationData?.location?.city) {
          setValue("city", locationData?.location?.city);
          setSelectedCity({
            value: locationData?.location?.city,
            label: locationData?.location?.city,
          });
        }
      }
    }
  }, [locationData, id, dValues, countriesList]);

  const isoToCountryId = (isoCode) => {
    const country = countriesList.find((country) => country.iso3 === isoCode);
    return country ? country.id : null;
  };

  const loadCities = async (countryId, stateId) => {
    if (countryId && stateId) {
      try {
        const cities = await GetCity(countryId, stateId);
        setCityList(cities);
      } catch (error) {
        console.error("Error loading cities:", error);
        setCityList([]);
      }
    } else {
      setCityList([]);
    }
  };

  const handleCountryChange = async (selectedOption) => {
    const selectedIsoCode = selectedOption.value;
    const selectedCountryId = isoToCountryId(selectedIsoCode);
    setCountryId(selectedCountryId);

    const selectedCountryObj = countriesList.find(
      (country) => country.iso3 === selectedIsoCode
    );
    setCountryCode(selectedCountryObj.iso2);

    setValue("country", selectedIsoCode);
    setSelectedCountry({ value: selectedIsoCode, label: selectedCountryObj.name });
    setStateList([]);
    setCityList([]);
    setSelectedState(null);
    setSelectedCity(null);
    setValue("state", "");
    setValue("city", "");
    
    const result = await GetState(selectedCountryId);
    setStateList(result);
  };

  const handleStateChange = async (selectedOption) => {
    const selectedStateName = selectedOption.value;
    const selectedStateObj = stateList.find(
      (state) => state.name === selectedStateName
    );
    
    const stateName = getStateName(selectedStateObj);
    setValue("state", stateName);
    setSelectedState({ value: stateName, label: stateName });
    
    // Reset city selection
    setCityList([]);
    setSelectedCity(null);
    setValue("city", "");
    
    // Load cities for the selected state
    await loadCities(countryId, selectedStateObj.id);
  };

  const handleCityChange = (selectedOption) => {
    const selectedCityName = selectedOption.value;
    setValue("city", selectedCityName);
    setSelectedCity({ value: selectedCityName, label: selectedCityName });
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

  const cityOptions = cityList.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  return (
    <>
      <div className="col-xl-3 mb-3">
        <label className="form-label">{t("country")}</label>
        {
          <Select
            options={countryOptions}
            key={`country-${selectedCountry?.value}`}
            value={selectedCountry}
            styles={customStyles}
            onChange={handleCountryChange}
          />
        }
        {!selectedCountry && <Error errorName={errors.country} />}
      </div>
      <div className="col-xl-3 mb-3">
        <label className="form-label">{t("state")}</label>
        <Select
          options={stateOptions}
          key={`state-${selectedState?.value}`}
          value={selectedState}
          styles={customStyles}
          onChange={handleStateChange}
          isDisabled={!selectedCountry}
        />
        {!selectedState && <Error errorName={errors.state} />}
      </div>
      {showCity && (
        <div className="col-xl-3 mb-3">
          <label className="form-label">{t("city")}</label>
          {cityList.length > 0 ? (
            <Select
              options={cityOptions}
              key={`city-${selectedCity?.value}`}
              value={selectedCity}
              styles={customStyles}
              onChange={handleCityChange}
              isDisabled={!selectedState}
            />
          ) : (
            <CustomInput
              type="text"
              register={register}
              label="City"
              name="city"
              placeholder=""
              defaultValue={getValues("city")}
            />
          )}
          <Error errorName={errors.city} />
        </div>
      )}
      {showCity && showtimeZone && (
        <TimeZoneSelector
          setValue={setValue}
          id={id}
          countryCode={countryCode}
          customStyle={customStyles}
          Comptype={Comptype}
        />
      )}
    </>
  );
};

export default LocationSelector;
