import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import usePagination from "@/hooks/usePagination";
import { getAllCompanies, getCompanyById } from "../api";
import usePermissions from "@/hooks/usePermissions";

const CompanyDropdownList = ({
  onChange,
  value,
  defaultValue,
  customStyles,
  isDisabled,
  groupId,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can } = usePermissions();
  const userDetails = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();

  console.log({ defaultValue });

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
    queryKey: ["company", defaultValue],
    queryFn: () => getCompanyById(defaultValue),
    enabled: false,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    let flatData = [];
    data?.pages.forEach((pageData) => {
      pageData.data.forEach((group) => {
        flatData.push({
          label: group?.companyId?.companyName,
          value: group?.companyId?._id,
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
      console.log("called here");

      if (!value && !defaultValue) {
        if (!can("company", "view") && userDetails?.companyId?.[0]) {
          const userGroup = userDetails.companyId[0];
          const defaultOption = {
            label: userGroup?.companyName,
            value: userGroup?._id,
          };
          setSelectedOption(defaultOption);
          onChange(defaultOption);
        }
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
          const { data: groupData } = await refetch();
          if (groupData?.companyId) {
            const newOption = {
              label: groupData.companyId.companyName,
              value: groupData.companyId._id,
            };
            setSelectedOption(newOption);
            onChange(newOption);
          }
        } catch (error) {
          console.error("Error fetching company details:", error);
        }
      } else {
        setSelectedOption(value);
      }
    };
    initializeValue();
  }, [defaultValue, options, pathname, userDetails, isFetching]);

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
      styles={customStyles}
      name={name}
      isDisabled={isDisabled || !can("company", "view")}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
    />
  );
};

export default CompanyDropdownList;
