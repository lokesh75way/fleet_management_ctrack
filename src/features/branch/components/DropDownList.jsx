import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import { t } from "i18next";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import usePagination from "@/hooks/usePagination";
import { getAllBranch, getBranchById } from "../api";
import usePermissions from "@/hooks/usePermissions";
import Spinner from "@/components/Loader/Spinner";

const BranchDropdownList = ({
  onChange,
  value,
  defaultValue,
  customStyles,
  isDisabled,
  companyId,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can } = usePermissions();
  const userDetails = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["branches", companyId],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllBranch(pageParam, companyId);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("branch", "view"),
      staleTime: Infinity,
    });

  const { refetch } = useQuery({
    queryKey: ["branch", defaultValue],
    queryFn: () => getBranchById(defaultValue),
    enabled: false,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    let flatData = [];
    data?.pages.forEach((pageData) => {
      pageData.data.forEach((item) => {
        flatData.push({
          label: item?.branchName,
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
        if (!can("branch", "view") && userDetails?.companyId?.[0]) {
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
          const { data: branchData } = await refetch();
          if (branchData) {
            const newOption = {
              label: branchData.branchName,
              value: branchData._id,
            };
            setSelectedOption(newOption);
            onChange(newOption);
          }
        } catch (error) {
          console.error("Error fetching branch details:", error);
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
      placeholder={t("selectParentBranch")}
      isDisabled={isDisabled || !can("branch", "view")}
      isClearable
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
      isLoading={isFetching}
      components={{
        LoadingIndicator: Spinner,
      }}
    />
  );
};

export default BranchDropdownList;
