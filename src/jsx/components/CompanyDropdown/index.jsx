import React, { useEffect, useState } from 'react';
import { getCompany } from '../../../services/api/CompanyServices';
import Select from "react-select";
const CompanyDropdown = ({
    onChange,
    value,
    customStyles,
    name,
    ref,
    isDisabled
}) => {
    console.log(value, "this is value")
    const [dropdownOptions, setdropdownOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(value);
    useEffect(() => {
        const fetchBusinessGroups = async () => {
            const response = await getCompany();
            const options = response.data.data.data.map((item) => ({ value: item?.companyId?._id, label: item?.companyId?.companyName }));
            console.log(response.data, "this is groud data")
            console.log(options, "this is Company options")
            setdropdownOptions(options);
        };
        fetchBusinessGroups();
    }
    , []);
    useEffect(() => {
        const selected = dropdownOptions.find((option) => option.value === value);
        setSelectedOption(selected);
    }, [value, dropdownOptions]);

    return (
            <Select
                options = {dropdownOptions}
                value={selectedOption}
                onChange={(newValue) => onChange(newValue)}
                styles={customStyles}
                name={name}
                ref={ref}
                isDisabled={isDisabled}
                />
    );
}
export default CompanyDropdown;