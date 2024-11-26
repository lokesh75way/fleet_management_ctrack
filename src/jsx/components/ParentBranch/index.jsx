import React, { useEffect, useState } from "react";
import { getAllBranch } from "../../../services/api/BranchServices";
import Select from "react-select";
import usePagination from "../../../hooks/usePagination";
import { t } from "i18next";

const ParentBranchDropdown = ({
  onChange,
  value,
  customStyles,
  name,
  isDisabled,
  companyId,
  inputRef,
}) => {
  const [dropDownOptions, setdropDownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();

  useEffect(() => {
    fetchBranches();
  }, [page, companyId]);

  const fetchBranches = async () => {
    try {
      const response = await getAllBranch(page, companyId);
      const newOptions = response.data.data.map((item) => ({
        value: item?._id,
        label: item?.branchName,
      }));
      if (page === 1) {
        setdropDownOptions(newOptions);
      } else {
        setdropDownOptions((prevOptions) => [...prevOptions, ...newOptions]);
      }
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  useEffect(() => {
    const selected = value
      ? dropDownOptions.find((option) => option.value === value)
      : null;
    setSelectedOption(selected);
  }, [value, dropDownOptions]);

  const handleChange = (newValue) => {
    if (!newValue) {
      newValue = {
        target: inputRef,
        value: "",
      };
    }
    onChange(newValue);
  };

  const handleMenuScroll = async (event) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Select
      options={dropDownOptions}
      value={selectedOption}
      onChange={handleChange}
      styles={customStyles}
      name={name}
      ref={inputRef}
      placeholder={t("selectParentBranch")}
      isDisabled={isDisabled}
      isClearable
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
    />
  );
};

export default ParentBranchDropdown;
