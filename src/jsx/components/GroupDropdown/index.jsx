import React, { useContext, useEffect, useState } from "react";
import { getGroups } from "../../../services/api/BusinessGroup";
import Select from "react-select";
import usePagination from "../../../hooks/usePagination";
import { usePermissions } from "../../../context/PermissionContext";

const GroupDropdown = ({ onChange, value, customStyles, isDisabled, name }) => {
  const [allOptions, setAllOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const [loading, setLoading] = useState(false);
  const { page, setPage } = usePagination();
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const { userDetails } = usePermissions();

  useEffect(() => {
    if (!initialDataFetched) {
      fetchInitialData();
      setInitialDataFetched(true);
    } else {
      fetchNextPageData();
    }
  }, [page]);

  const fetchInitialData = async () => {
    setLoading(true);
    const response = await getGroups(page);
    const newOptions = response.data.map((item) => ({
      label: item?.businessGroupId?.groupName,
      value: item?.businessGroupId?._id,
    }));

    let updatedOptions = [...newOptions];

    if (
      userDetails &&
      (userDetails.user.role === "BUSINESS_GROUP" ||
        userDetails.user.role === "COMPANY")
    ) {
      const userGroup = userDetails.user.businessGroupId[0];
      const userGroupOption = {
        label: userGroup.groupName,
        value: userGroup._id,
      };
      updatedOptions.unshift(userGroupOption);
    }

    setAllOptions(updatedOptions);
    setLoading(false);
  };

  const fetchNextPageData = async () => {
    setLoading(true);
    const response = await getGroups(page);
    const newOptions = response.data.map((item) => ({
      label: item?.businessGroupId?.groupName,
      value: item?.businessGroupId?._id,
    }));
    setAllOptions((prevOptions) => [...prevOptions, ...newOptions]);
    setLoading(false);
  };

  useEffect(() => {
    if (
      userDetails &&
      userDetails.user.role !== "BUSINESS_GROUP" &&
      userDetails.user.role !== "COMPANY"
    ) {
      const selected = allOptions.find((option) => option.value === value);
      setSelectedOption(selected);
    }
  }, [value, allOptions, userDetails]);

  const handleMenuScroll = async (event) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Select
      options={allOptions}
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      name={name}
      isDisabled={isDisabled}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
    />
  );
};

export default GroupDropdown;
