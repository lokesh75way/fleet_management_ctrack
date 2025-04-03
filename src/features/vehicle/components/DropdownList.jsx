import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import usePagination from "@/hooks/usePagination";
import { getAllVehicles, getVehicleById } from "../api";
import usePermissions from "@/hooks/usePermissions";
import Spinner from "@/components/Loader/Spinner";

const VehicleDropdownList = ({
  branchIds,
  ref,
  onChange,
  value,
  defaultValue,
  customStyles,
  isDisabled,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can } = usePermissions();
  const userDetails = useSelector((state) => state.auth.user);
  const { pathname } = useLocation();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["vehicles", branchIds],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllVehicles(pageParam, branchIds);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("vehicle", "view"),
      staleTime: Infinity,
    });

  const getVehiclesById = async (ids) => {
    let result = [];
    for (let id of ids) {
      const data = await getVehicleById(id);
      result.push(data);
    }
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
    if (value && value.length > 0) {
      const selected = options.filter((option) =>
        value?.some((val) => val.value === option.value)
      );
      setSelectedOption(selected);
    } else {
      setSelectedOption(null);
    }

    return () => {};
  }, [JSON.stringify(value)]);

  useEffect(() => {
    const initializeValue = async () => {
      if (!value && !defaultValue) {
        return;
      }

      if (defaultValue) {
        const selected = options.filter((option) =>
          defaultValue.some((item) => item === option.value)
        );
        if (selected) {
          setSelectedOption(selected);
          onChange(selected);
          return;
        }
        try {
          const { data: vehicleData } = await refetch();
          if (vehicleData) {
            const newOption = {
              label: vehicleData.vehicleName,
              value: vehicleData._id,
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
  }, [
    JSON.stringify(defaultValue),
    options,
    pathname,
    userDetails,
    isFetching,
  ]);

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
      isMulti
    />
  );
};
export default VehicleDropdownList;
