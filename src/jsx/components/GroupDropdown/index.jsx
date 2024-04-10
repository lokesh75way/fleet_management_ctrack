import React, { useEffect, useState } from 'react';
import { getGroups } from '../../../services/api/BusinessGroup';
import Select from "react-select";
const GroupDropdown = ({
    onChange,
    value,
    customStyles,
    ref,
    isDisabled,
    name
}) => {
    const [dropDownOptions, setdropDownOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(value);
    useEffect(() => {
        const fetchBusinessGroups = async () => {
            const response = await getGroups();
            const groupOptions = response.data.map((item) => ({
                label: item?.businessGroupId?.groupName,
                value: item?.businessGroupId?._id,
            }));
            setdropDownOptions(groupOptions);
        };
        fetchBusinessGroups();
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
                isDisabled={isDisabled}
                />
    );
}
export default GroupDropdown;