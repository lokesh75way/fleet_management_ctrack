import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { getDrivers } from '../../../services/api/driverService';
import { getVehicles } from '../../../services/api/VehicleService';
const VehicleDropdown = ({
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
        const fetchVehicles = async () => {
            const response = await getVehicles();
            console.log(response.data,"dsis");
            const vehicleOptions = response.data.map((item) => ({
                label: item?.vehicleName,
                value: item?._id,
            }));

            setdropDownOptions(vehicleOptions);
        };
        fetchVehicles();
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
export default VehicleDropdown;