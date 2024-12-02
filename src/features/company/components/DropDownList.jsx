import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

import usePagination from "@/hooks/usePagination";
import { usePermissions } from "@/context/PermissionContext";
import { getAllCompanies, getCompanyById } from "../api";

const CompanyDropdownList = ({
  onChange,
  value,
  customStyles,
  isDisabled,
  groupId,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { userDetails, can } = usePermissions();
  const { pathname } = useLocation();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["companies", groupId],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllCompanies(pageParam, groupId);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("company", "view"),
      staleTime: Infinity,
    });

  const { refetch } = useQuery({
    queryKey: ["company", value],
    queryFn: () => getCompanyById(value),
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
    if (value) {
      if (typeof value != "string") {
        setSelectedOption(value);
      } else {
        let selected;
        if (options.length) {
          selected = options.find((option) => option.value === value);
        }
        if (selected) {
          setSelectedOption(selected);
        } else {
          refetch().then(({ data }) => {
            setSelectedOption({
              label: data?.companyId?.companyName,
              value: data?.companyId?._id,
            });
          });
        }
      }
    } else if (!can("company", "view")) {
      const userGroup = userDetails.user.companyId[0];
      setSelectedOption({
        label: userGroup.companyName,
        value: userGroup._id,
      });
      onChange({
        label: userGroup.groupName,
        value: userGroup._id,
      });
    }
  }, [options, pathname, userDetails, isFetching]);

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
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      name={name}
      isDisabled={isDisabled}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
    />
  );
};

export default CompanyDropdownList;
