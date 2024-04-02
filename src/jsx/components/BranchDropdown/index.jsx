import React, { useEffect, useState } from 'react';
import { getAllBranch } from '../../../services/api/BranchServices';
import Select from "react-select";
const BranchDropdown = ({
    onChange,
    value,
    customStyles,
    name,
    isDisabled,
    ref
}) => {
    const [dropDownOptions, setdropDownOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(value);
    useEffect(() => {
        const fetchBusinessGroups = async () => {
            const response = await getAllBranch();
            const groupOptions = response.data.data.map(item => ({ value: item?._id, label: item?.branchName }));
            console.log(response.data, "this is Branch data")
            console.log(groupOptions, "this is Branch options")
            setdropDownOptions(groupOptions);
        };
        fetchBusinessGroups();
    }
    , []);
    useEffect(() => {
        const selected = dropDownOptions.filter((option) => value && value.includes(option.value));
        setSelectedOption(selected);
    }, [value, dropDownOptions]);

    return (
        <div className="branch-dropdown">
            <Select
                options = {dropDownOptions}
                value={selectedOption}
                onChange={(newValue) => onChange(newValue)}
                style={customStyles}
                name={name}
                ref={ref}
                isDisabled={isDisabled}
                isMulti
                />
            
        </div>
    );
}
export default BranchDropdown;