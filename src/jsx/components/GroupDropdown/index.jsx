import React, { useEffect, useState } from "react";
import { getGroups } from "../../../services/api/BusinessGroup";
import Select from "react-select";
import usePagination from "../../../hooks/usePagination";

const GroupDropdown = ({ onChange, value, customStyles, isDisabled, name }) => {
  const [dropDownOptions, setdropDownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const [loading, setLoading] = useState(false);
  const { page, setPage } = usePagination();
  const [initialDataFetched, setInitialDataFetched] = useState(false);

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
    setdropDownOptions(newOptions);
    setLoading(false);
  };
  const fetchNextPageData = async () => {
    setLoading(true);
    const response = await getGroups(page);
    const newOptions = response.data.map((item) => ({
      label: item?.businessGroupId?.groupName,
      value: item?.businessGroupId?._id,
    }));
    setdropDownOptions((prevOptions) => [...prevOptions, ...newOptions]);
    setLoading(false);
  };

  useEffect(() => {
    const selected = dropDownOptions.find((option) => option.value === value);
    setSelectedOption(selected);
  }, [value, dropDownOptions]);

  // Event handler to load more options when scrolling to the bottom
  const handleMenuScroll = async (event) => {
    console.log("menuscroll");
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Select
      options={dropDownOptions}
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
