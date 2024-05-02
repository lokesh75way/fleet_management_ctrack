import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { getDrivers } from '../../../services/api/driverService';
import { getVehicles } from '../../../services/api/VehicleService';
import usePagination from '../../../hooks/usePagination';
const VehicleDropdown = ({
    onChange,
    value,
    customStyles,
    branchids,
    ref,
    isDisabled,
    name
}) => {
    const [dropDownOptions, setdropDownOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(value);
    const { page } = usePagination();
    useEffect(() => {
        const fetchVehicles = async () => {
            const response = await getVehicles(page, branchids ? branchids : undefined);
            const vehicleOptions = response.data.map((item) => ({
                label: item?.vehicleName,
                value: item?._id,
            }));

            setdropDownOptions(vehicleOptions);
        };
        fetchVehicles();
    }
    , [page,branchids]);
    useEffect(() => {
        if (value && Array.isArray(value)) {
          const selected = dropDownOptions.filter((option) =>
            value.some((val) => val === option.value)
          );
          setSelectedOption(selected);
        } else {
          setSelectedOption(value);
        }
      }, [value, dropDownOptions,branchids]);

    return (
            <Select
                options = {dropDownOptions}
                value={selectedOption}
                onChange={(newValue) => onChange(newValue)}
                styles={customStyles}
                ref={ref}
                name={name}
                isMulti
                />
    );
}
export default VehicleDropdown;