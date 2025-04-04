import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import usePagination from "@/hooks/usePagination";
import { getAllTemplates, getTemplateById } from "../api";
import usePermissions from "@/hooks/usePermissions";
import Spinner from "@/components/Loader/Spinner";

const TemplateDropdownList = ({
  onChange,
  value,
  customStyles,
  isDisabled,
  name,
  placeholder,
  defaultValue,
}) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const { page, setPage } = usePagination();
  const { can } = usePermissions();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["templates"],
      queryFn: ({ pageParam }) => {
        setPage(pageParam);
        return getAllTemplates(pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.data?.length ? page + 1 : null,
      enabled: can("groups", "view"),
      staleTime: Infinity,
    });

  const { refetch } = useQuery({
    queryKey: ["template", defaultValue],
    queryFn: () => getTemplateById(defaultValue),
    enabled: false,
    staleTime: Infinity,
  });

  const options = useMemo(() => {
    let flatData = [];
    data?.pages.forEach((pageData) => {
      pageData.data.forEach((template) => {
        flatData.push({
          value: template._id,
          label: template.name,
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
  }, [value, options]);

  useEffect(() => {
    const initializeValue = async () => {
      if (defaultValue && !value) {
        const selected = options.find(
          (option) => option.value === defaultValue
        );
        if (selected) {
          setSelectedOption(selected);
          onChange(selected);
          return;
        }
        try {
          const { data: template } = await refetch();
          console.log({ template });

          if (template) {
            const newOption = {
              label: template.name,
              value: template._id,
            };
            setSelectedOption(newOption);
            onChange(newOption);
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    initializeValue();
    return () => {};
  }, [defaultValue, value]);

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
      placeholder={placeholder}
      isDisabled={isDisabled || !can("groups", "view")}
      onMenuScrollToBottom={handleMenuScroll}
      menuShouldScrollIntoView={false}
      isLoading={isFetching}
      components={{
        LoadingIndicator: Spinner,
      }}
    />
  );
};

export default TemplateDropdownList;
