import usePagination from "@/hooks/usePagination";
import usePermissions from "@/hooks/usePermissions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";

import { getAllTechnicians, getTechnicianById } from "../api";
import Spinner from "@/components/Loader/Spinner";

const TechnicianDropdownList = ({
  onChange,
  value,
  groupId,
  customStyles,
  name,
  ref,
  isDisabled,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can } = usePermissions();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["technicians", page],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllTechnicians(pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("technician", "view"),
      staleTime: Infinity,
    });

  const { refetch } = useQuery({
    queryKey: ["technician", defaultValue],
    queryFn: () => getTechnicianById(defaultValue),
    enabled: false,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    let flatData = [];
    data?.pages.forEach((pageData) => {
      pageData.data.forEach((item) => {
        flatData.push({
          label: `${item?.firstName ?? ""} ${item?.lastName ?? ""}`,
          value: item?._id,
        });
      });
    });
    return flatData;
  }, [data]);

  useEffect(() => {
    if (value?.value != selectedOption?.value) {
      setSelectedOption(value);
    }

    return () => {};
  }, [value]);

  useEffect(() => {
    const initializeValue = async () => {
      if (!value && !defaultValue) {
        return;
      }

      if (defaultValue) {
        const selected = options.find(
          (option) => option.value === defaultValue
        );
        if (selected) {
          setSelectedOption(selected);
          onChange(selected);
          return;
        }
        try {
          const { data: technician } = await refetch();
          if (technician) {
            const newOption = {
              label: `${technician?.firstName ?? ""} ${technician?.lastName ?? ""}`,
              value: technician._id,
            };
            setSelectedOption(newOption);
            onChange(newOption);
          }
        } catch (error) {
          console.error("Error fetching technician details:", error);
        }
      } else {
        setSelectedOption(value);
      }
    };
    initializeValue();
  }, [defaultValue, options, isFetching]);

  const handleMenuScroll = async (event) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;
    if (bottom && !isFetching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  //

  //   useEffect(() => {
  //     const selected = dropdownOptions.find((option) => option.value === value);
  //     setSelectedOption(selected);
  //   }, [value, dropdownOptions, groupId]);

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={onChange}
      styles={customStyles}
      name={name}
      ref={ref}
      isDisabled={isDisabled || !can("technician", "view")}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
      isLoading={isFetching}
      components={{
        LoadingIndicator: Spinner,
      }}
    />
  );
};
export default TechnicianDropdownList;
