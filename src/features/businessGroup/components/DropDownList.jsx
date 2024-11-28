import React, { useEffect, useState } from "react";
import Select from "react-select";

import { getAllGroups } from "@/features/businessGroup/api";
import usePagination from "@/hooks/usePagination";
import { usePermissions } from "@/context/PermissionContext";

const GroupDropdownList = ({
  onChange,
  value,
  customStyles,
  isDisabled,
  name,
}) => {
  const [allOptions, setAllOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const [loading, setLoading] = useState(false);
  const { page, setPage } = usePagination();
  const [initialDataFetched, setInitialDataFetched] = useState(false);
  const { userDetails } = usePermissions();
  const [isComplete, setIsComplete] = useState(false);

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
    const response = await getAllGroups(page);
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
    const response = await getAllGroups(page);
    const newOptions = response.data.map((item) => ({
      label: item?.businessGroupId?.groupName,
      value: item?.businessGroupId?._id,
    }));
    setAllOptions((prevOptions) => [...prevOptions, ...newOptions]);
    if (newOptions.length == 0) setIsComplete(true);
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
    if (bottom && !loading && !isComplete) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Select
      options={allOptions}
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      name={name}
      isDisabled={isDisabled}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        ...customStyles,
      }}
    />
  );
};

export default GroupDropdownList;
