import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { getDrivers } from '../../../services/api/driverService';
const DriverDropdown = ({
    onChange,
    value,
    customStyles,
    ref,
    isDisabled,
    name
}) => {
    // console.log(value, "this is isDisabled")
    const [dropDownOptions, setdropDownOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(value);
    useEffect(() => {
        const fetchDrivers = async () => {
            const response = await getDrivers();
            console.log(response.data,"dsis");
            const driverOptions = response.data.map((item) => ({
                label: item?.firstName,
                value: item?._id,
            }));
            // console.log(response.data, "this is groud data")
            // console.log(driverOptions, "this is group options")
            setdropDownOptions(driverOptions);
        };
        fetchDrivers();
    }
    , []);
    useEffect(() => {
        const selected = dropDownOptions.find((option) => option.value === value);
        setSelectedOption(selected);
    }, [value, dropDownOptions]);

    return (
            <Select
                options = {dropDownOptions}
                value={selectedOption}
                onChange={(newValue) => onChange(newValue)}
                styles={customStyles}
                ref={ref}
                name={name}
                />
    );
}
export default DriverDropdown;