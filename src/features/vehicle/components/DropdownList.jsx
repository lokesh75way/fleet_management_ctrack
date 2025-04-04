import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { t } from "i18next";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import usePagination from "@/hooks/usePagination";
import { getAllVehicles, getVehicleById } from "../api";
import usePermissions from "@/hooks/usePermissions";
import Spinner from "@/components/Loader/Spinner";

const VehicleDropdownList = ({
  branchIds,
  companyId,
  groupId,
  ref,
  onChange,
  value,
  defaultValue,
  customStyles,
  isDisabled,
  isMulti,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can } = usePermissions();
  const { pathname } = useLocation();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["vehicles", branchIds, companyId, groupId],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllVehicles(pageParam, 10, {
          branchIds: Array.isArray(branchIds) ? branchIds.join(",") : branchIds,
          companyId,
          groupId,
        });
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("vehicle", "view"),
      staleTime: Infinity,
    });

  const getVehiclesById = async (ids) => {
    let vehicleIds = ids;
    const result = [];
    if (!Array.isArray(ids)) vehicleIds = [ids];
    for (let id of vehicleIds) {
      const data = await getVehicleById(id);
      result.push(data);
    }
    console.log({ result });

    return result;
  };

  const { refetch } = useQuery({
    queryKey: ["vehicle", defaultValue],
    queryFn: () => getVehiclesById(defaultValue),
    enabled: false,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    let flatData = [];
    data?.pages.forEach((pageData) => {
      pageData.data.forEach((item) => {
        flatData.push({
          label: item?.vehicleName,
          value: item?._id,
        });
      });
    });
    return flatData;
  }, [data]);

  useEffect(() => {
    console.log({ value });

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
            const { data: vehicleData } = await refetch();
            if (vehicleData) {
              const newOption = vehicleData?.map((el) => ({
                label: el.vehicleName,
                value: el._id,
              }));
              setSelectedOption(newOption);
              onChange(newOption);
            }
          } catch (error) {
            console.error("Error fetching vehicle details:", error);
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
            const { data: vehicleData } = await refetch();
            if (vehicleData && vehicleData.length) {
              const newOption = {
                label: vehicleData?.[0].vehicleName,
                value: vehicleData?.[0]._id,
              };
              setSelectedOption(newOption);
              onChange(newOption);
            }
          } catch (error) {
            console.error("Error fetching vehicle details:", error);
          }
        }
      } else {
        setSelectedOption(value);
      }
    };
    initializeValue();
  }, [JSON.stringify(defaultValue), pathname, JSON.stringify(value)]);

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
      ref={ref}
      name={name}
      placeholder={t("selectVehicles")}
      isDisabled={isDisabled || !can("vehicle", "view")}
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
export default VehicleDropdownList;
