import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import { getAllGroups, getGroupById } from "@/features/businessGroup/api";
import usePagination from "@/hooks/usePagination";
import { usePermissions } from "@/context/PermissionContext";

const GroupDropdownList = ({
  onChange,
  value,
  customStyles,
  isDisabled,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { page, setPage } = usePagination();
  const { userDetails, can } = usePermissions();
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
    queryKey: ["group", value],
    queryFn: () => getGroupById(value),
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
    const initializeValue = async () => {
      if (!value) {
          const userGroup = userDetails.user.businessGroupId[0];  
          const defaultOption = {
            label: userGroup?.groupName,
            value: userGroup?._id,
          };
          setSelectedOption(defaultOption);
          onChange(defaultOption);
        return;
      }
      
      if (value && typeof value === "object" && value.label && value.value) {
        setSelectedOption(value);
        return;
      }
      if (typeof value === "string" || value?._id) {
        const valueId = value?._id || value;
        const existingOption = options.find((opt) => opt.value === valueId);
        if (existingOption) {
          setSelectedOption(existingOption);
          return;
        }
        try {
          const { data: groupData } = await refetch();
          if (groupData?.businessGroupId) {
            const newOption = {
              label: groupData.businessGroupId?.groupName,
              value: groupData.businessGroupId?._id,
            };
            setSelectedOption(newOption);
            onChange(newOption);
          }
        } catch (error) {
          console.error("Error fetching group details:", error);
        }
      }
    };

    initializeValue();
  }, [value, options, pathname, userDetails, can]);

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
