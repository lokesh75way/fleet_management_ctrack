import React, { useEffect, useState } from 'react';
import { getAllBranch } from '../../../services/api/BranchServices';
import Select from "react-select";

import usePagination from '../../../hooks/usePagination';
const ParentBranchDropdown = ({
    onChange,
    value,
    customStyles,
    name,
    isDisabled,
    companyId,
    ref
}) => {

    const [dropDownOptions, setdropDownOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(value);
    const {page} = usePagination()
    useEffect(() => {
        const fetchBusinessGroups = async () => {
            const response = await getAllBranch(undefined,companyId ? companyId : undefined);
            const groupOptions = response.data.data.map(item => ({ value: item?._id, label: item?.branchName }));
            // console.log(response.data, "this is Branch data")
            // console.log(groupOptions, "this is Branch options")
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
            <Select
                options = {dropDownOptions}
                value={selectedOption}
                onChange={(newValue) => onChange(newValue)}
                styles={customStyles}
                name={name}
                ref={ref}
                isDisabled={isDisabled || !companyId}
                />
    );
}
export default ParentBranchDropdown;