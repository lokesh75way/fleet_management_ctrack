import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import { t } from "i18next";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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
  groupId,
  name,
  isMulti,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can } = usePermissions();
  const { pathname } = useLocation();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["branches", companyId, groupId],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllBranch(pageParam, 10, { companyId, groupId });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("branch", "view"),
      staleTime: Infinity,
    });

  const getBranchesById = async (ids) => {
    let branchIds = ids;
    const result = [];
    if (!Array.isArray(ids)) branchIds = [ids];
    for (const id of branchIds) {
      const data = await getBranchById(id);
      result.push(data);
    }
    return result;
  };

  const { refetch: branchFetch } = useQuery({
    queryKey: ["branch", defaultValue],
    queryFn: () => getBranchesById(defaultValue),
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
    if (value && value.length) setSelectedOption(value);
    else setSelectedOption(undefined);
  }, [JSON.stringify(value)]);

  useEffect(() => {
    const initializeValue = async () => {
      if (defaultValue && !value) {
        if (Array.isArray(defaultValue)) {
          if (!defaultValue.length) return;
          const selected = options.filter((option) =>
            defaultValue.some((val) => option.value === val)
          );
          if (selected.length === defaultValue.length) {
            setSelectedOption(selected);
            onChange(selected);
            return;
          }
          try {
            const { data: branchData } = await branchFetch();
            if (branchData) {
              const newOption = branchData?.map((el) => ({
                label: el.branchName,
                value: el._id,
              }));
              setSelectedOption(newOption);
              onChange(newOption);
            }
          } catch (error) {
            console.error("Error fetching branch details:", error);
          }
        } else {
          const selected = options.find(
            (option) => defaultValue === option.value
          );
          if (selected) {
            setSelectedOption(selected);
            onChange(selected);
            return;
          }
          try {
            const { data: branchData } = await branchFetch();
            if (branchData && branchData.length) {
              const newOption = {
                label: branchData?.[0].branchName,
                value: branchData?.[0]._id,
              };
              setSelectedOption(newOption);
              onChange(newOption);
            }
          } catch (error) {
            console.error("Error fetching branch details:", error);
          }
        }
      } else {
        setSelectedOption(value);
      }
    };
    initializeValue();
  }, [JSON.stringify(defaultValue), JSON.stringify(value), pathname]);

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
      isMulti={isMulti}
    />
  );
};

export default BranchDropdownList;
