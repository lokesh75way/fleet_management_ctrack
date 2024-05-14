import React, { useState, useEffect } from "react";
import ct from 'countries-and-timezones';
import Select from 'react-select';
import { useTranslation } from "react-i18next";

const TimeZoneSelector = ({ countryCode,customStyle,setValue,id,dValues,Comptype }) => {
  console.log(dValues, "compnay timexzone")
  const { t } = useTranslation();
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState(null);
  useEffect(() => {
    const country = ct.getCountry(countryCode);
    if (country) {
      const timezoneList = country.timezones;
      if (timezoneList && timezoneList.length > 0) {
        setTimezones(timezoneList.map(timezone => ({
          label: `(GMT ${getGMTOffset(timezone)}) ${timezone} `,
          value: timezone
        })));
        // Set default timezone to the first one in the list
        setSelectedTimezone({
          label: `(GMT ${getGMTOffset(timezoneList[0])}) ${timezoneList[0]} `,
          value: timezoneList[0]
        });
        setValue('timezone',timezoneList[0])
      }
    }
  }, [countryCode]);

  useEffect(()=>{
    if(dValues && id){
      const timezone = Comptype === 'companyId'
      ? dValues.companyId?.timezone
      : Comptype === 'businessGroupId'
        ? dValues.businessGroupId?.timezone
        : dValues.timezone;

        setValue('timezone', timezone);

        if(timezone){
            setSelectedTimezone({
                label: `(GMT ${getGMTOffset(timezone)}) ${timezone}`,
                 value: timezone
                 });
            console.log(selectedTimezone, "hi")
        }
    }
  },[dValues,id])

  const handleTimezoneChange = (selectedOption) => {
    // console.log(selectedOption, "ds:-")
    setValue('timezone', selectedOption.value)
    setSelectedTimezone(selectedOption);
  };
  const getGMTOffset = (timezone) => {
    const offsetMinutes = ct.getTimezone(timezone).utcOffset;
    const offsetHours = Math.abs(Math.floor(offsetMinutes / 60));
    const offsetMinutesRemainder = Math.abs(offsetMinutes % 60);
    const offsetSign = offsetMinutes >= 0 ? '+' : '-';
    return `${offsetSign}${offsetHours}:${offsetMinutesRemainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="col-xl-3">
      <label htmlFor="timezone">{t("timezone")}:</label>
      <Select
        id="timezone"
        value={selectedTimezone}
        styles={customStyle}
        onChange={handleTimezoneChange}
        options={timezones}
      />
    </div>
  );
};

export default TimeZoneSelector;
