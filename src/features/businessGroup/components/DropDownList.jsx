import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getAllGroups } from "@/features/businessGroup/api";
import usePagination from "@/hooks/usePagination";
import { usePermissions } from "@/context/PermissionContext";

const GroupDropdownList = ({
  onChange,
  value,
  customStyles,
  isDisabled,
  name,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { userDetails } = usePermissions();

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
      enabled: userDetails.user.role === "SUPER_ADMIN",
      staleTime: Infinity,
    });

  const { refetch } = useQuery({
    queryKey: ["group", value],
    queryFn: () => {
      // TODO: get group by id: value
      return { data: {} };
    },
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
          // TODO:
          refetch().then(({ data }) => {
            setSelectedOption({
              label: data.data?.name,
              value: data.data?.id,
            });
          });
        }
      }
    } else if (userDetails.user.role !== "SUPER_ADMIN") {
      const userGroup = userDetails.user.businessGroupId[0];
      setSelectedOption({
        label: userGroup.groupName,
        value: userGroup._id,
      });
    }
  }, [value, options, userDetails, isFetching]);

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
      isDisabled={isDisabled || userDetails.user.role !== "SUPER_ADMIN"}
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
