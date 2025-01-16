import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getAllGroups, getGroupById } from "@/features/businessGroup/api";
import usePagination from "@/hooks/usePagination";
import usePermissions from "@/hooks/usePermissions";
import Spinner from "@/components/Loader/Spinner";

const GroupDropdownList = ({
  onChange,
  value,
  defaultValue,
  customStyles,
  isDisabled,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can, role } = usePermissions();
  const userDetails = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["groups"],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllGroups(pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("business", "view"),
      staleTime: Infinity,
    });

  const { refetch } = useQuery({
    queryKey: ["group", defaultValue],
    queryFn: () => getGroupById(defaultValue),
    enabled: false,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    let flatData = [];
    data?.pages.forEach((pageData) => {
      pageData.data.forEach((group) => {
        flatData.push({
          label: group?.businessGroupId?.groupName,
          value: group?.businessGroupId?._id,
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
        if (!can("business", "view")) {
          const userGroup = userDetails.businessGroupId[0];
          const defaultOption = {
            label: userGroup?.groupName,
            value: userGroup?._id,
          };
          setSelectedOption(defaultOption);
          onChange(defaultOption);
        }
        return;
      }

      if (defaultValue) {
        const existingOption = options.find(
          (opt) => opt.value === defaultValue
        );
        if (existingOption) {
          setSelectedOption(existingOption);
          onChange(existingOption);
          return;
        }
        try {
          const { data: groupData } = await refetch();
          if (groupData?.businessGroupId) {
            const newOption = {
              label: groupData.businessGroupId.groupName,
              value: groupData.businessGroupId._id,
            };
            setSelectedOption(newOption);
            onChange(newOption);
          }
        } catch (error) {
          console.error("Error fetching group details:", error);
        }
      } else {
        setSelectedOption(value);
      }
    };

    initializeValue();
  }, [defaultValue, options, pathname, userDetails]);

  const handleMenuScroll = async (event) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;
    if (bottom && !isFetching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={onChange}
      name={name}
      isDisabled={isDisabled || !can("business", "view")}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        ...customStyles,
      }}
      isLoading={isFetching}
      components={{
        LoadingIndicator: Spinner,
      }}
    />
  );
};

export default GroupDropdownList;
