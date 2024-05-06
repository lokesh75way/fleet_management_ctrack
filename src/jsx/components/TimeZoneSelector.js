import React, { useState, useEffect } from "react";
import ct from 'countries-and-timezones';
import Select from 'react-select';
import { t } from "i18next";

const TimeZoneSelector = ({ countryCode, customStyle, setValue, selectedTimezone,onChange,value }) => {
  const [timezones, setTimezones] = useState([]);


  useEffect(() => {
    const country = ct.getCountry(countryCode);
    if (country) {
      const timezoneList = country.timezones;
      if (timezoneList && timezoneList.length > 0) {
        setTimezones(timezoneList.map(timezone => ({
          label: getTimezoneLabel(timezone),
          value: timezone
        })));
        onChange({
          label: getTimezoneLabel(timezoneList[0]),
          value: timezoneList[0]
        });
        setValue('timezone', timezoneList[0]);
      }
    }
  }, [countryCode]);

  useEffect(() => {
      if (value) {
        onChange({
          label: getTimezoneLabel(value),
          value: value
        });
      }
  }, [value]);
  


  const getGMTOffset = (timezone) => {
    const offsetMinutes = ct.getTimezone(timezone).utcOffset;
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMinutesRemainder = Math.abs(offsetMinutes % 60);
    const offsetSign = offsetMinutes >= 0 ? '+' : '-';
    return `${offsetSign}${offsetHours}:${offsetMinutesRemainder.toString().padStart(2, '0')}`;
  };

  const getTimezoneLabel = (timezone) => {
    return `(GMT ${getGMTOffset(timezone)}) ${timezone}`;
  };

  return (
    <div className="col-xl-3">
      <label htmlFor="timezone">{t('timezone')}</label>
      <Select
        id="timezone"
        value={selectedTimezone || value}
        styles={customStyle}
        onChange={onChange}
        options={timezones}
      />
    </div>
  );
};

export default TimeZoneSelector;
