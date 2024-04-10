import React, { useEffect, useState } from 'react';
import { getAllBranch } from '../../../services/api/BranchServices';
import Select from "react-select";
import usePagination from '../../../hooks/usePagination';

const BranchDropdown = ({
  onChange,
  value,
  customStyles,
  name,
  companyId,
  isDisabled,
  ref,
  isMulti = true,
}) => {
  const [dropDownOptions, setdropDownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const { page } = usePagination();
  useEffect(() => {
    const fetchBusinessGroups = async () => {
      const response = await getAllBranch(
        undefined,
        companyId ? companyId : undefined
      );
      const groupOptions = response.data.data.map((item) => ({
        value: item?._id,
        label: item?.branchName,
      }));
      setdropDownOptions(groupOptions);
    };
    fetchBusinessGroups();
  }, []);
  useEffect(() => {
    const selected = dropDownOptions.filter(
      (option) => value && value.includes(option.value)
    )?.[0];
    setSelectedOption(selected);
  }, [value, dropDownOptions]);

  return (
    <Select
      options={dropDownOptions}
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      name={name}
      ref={ref}
      isDisabled={isDisabled}
      isMulti={isMulti}
    />
  );
};
export default BranchDropdown;