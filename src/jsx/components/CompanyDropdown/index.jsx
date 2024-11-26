import React, { useEffect, useState } from "react";
import { getCompany } from "../../../services/api/CompanyServices";
import Select from "react-select";
import usePagination from "../../../hooks/usePagination";
import { usePermissions } from "../../../context/PermissionContext";

const CompanyDropdown = ({
  onChange,
  value,
  groupId,
  customStyles,
  name,
  ref,
  isDisabled,
}) => {
  console.log(groupId, "groupId");
  const [dropdownOptions, setdropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { userDetails } = usePermissions(); // Import usePermissions hook

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await getCompany(page, groupId ? groupId : undefined);
      const options = response.data.data.data.map((item) => ({
        value: item?.companyId?._id,
        label: item?.companyId?.companyName,
      }));
      if (page === 1) {
        setdropdownOptions(options);
      } else {
        setdropdownOptions((prevOptions) => [...prevOptions, ...options]);
      }
    };
    fetchCompanies();
  }, [page, groupId]);

  useEffect(() => {
    if (userDetails && userDetails.user.role === "COMPANY") {
      const companyId = userDetails.user.companyId[0]._id;
      const companyName = userDetails.user.companyId[0].companyName;
      const selectedCompany = { value: companyId, label: companyName };
      setSelectedOption(selectedCompany);
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails && userDetails.user.role !== "COMPANY") {
      const selected = dropdownOptions.find((option) => option.value === value);
      setSelectedOption(selected);
    }
  }, [value, dropdownOptions, groupId, userDetails]);

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
      options={dropdownOptions}
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      name={name}
      ref={ref}
      isDisabled={isDisabled}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
    />
  );
};

export default CompanyDropdown;
