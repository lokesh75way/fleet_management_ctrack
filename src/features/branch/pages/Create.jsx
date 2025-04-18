import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

import MainPagetitle from "@/components/MainPagetitle";
import { branchAccountSchema } from "@/utils/yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import { getApiErrorMessage } from "@/utils/helper";
import { createNewBranch, editBranch, getBranchById } from "../api";
import CreateForm from "../components/Form";
import { dateFormatOptions, timeFormatOptions } from "@/constants/options";
import Loader from "@/components/Loader";

const BranchForm = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { id } = useParams();
  const tabHeading = [id ? t("editBranch") : t("newBranch")];
  const component = [CreateForm];
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: branchData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["branch", id],
    queryFn: () => getBranchById(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError && !!id) {
      notifyError("Not able to fetch branch data");
      navigate("/not-found");
    }
  }, [isError && id]);

  const parsedBranchData = useMemo(() => {
    return {
      ...branchData,
      businessGroupId: branchData?.businessGroupId?._id,
      companyId: branchData?.companyId?._id,
    };
  }, [branchData]);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      companyId: "",
      businessGroupId: "",
      userInfo: [
        {
          name: "",
          designation: "",
          mobileNumber: null,
          email: "",
        },
      ],
      timeFormat: timeFormatOptions[1]?.value,
      dateFormat: dateFormatOptions[1]?.value,
    },
    resolver: yupResolver(branchAccountSchema),
    values: parsedBranchData,
  });

  const onError = (err) => notifyError(getApiErrorMessage(err));

  const { mutate: createBranchMutation, isPending: createPending } =
    useMutation({
      mutationFn: createNewBranch,
      onSuccess: () => {
        notifySuccess("Branch has been created");
        queryClient.invalidateQueries(["branches"]);
        navigate("/branch");
      },
      onError,
    });

  const { mutate: editBranchMutation, isPending: editPending } = useMutation({
    mutationFn: ({ data, id }) => editBranch(id, data),
    onSuccess: () => {
      notifySuccess("Branch has been updated!");
      queryClient.invalidateQueries(["branches"]);
      navigate("/branch");
    },
    onError: (error) => {
      notifyError(error.message);
    },
  });

  const onSubmit = async (data) => {
    if (activeIndex === 0) {
      if (data.logo == null || data.logo.length === 0) {
        delete data.logo;
      }
      if (data.file && data.file.length === 0) {
        delete data.file;
      }
      if (id) {
        editBranchMutation({ data, id });
      } else {
        createBranchMutation(data);
      }
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle="Branch"
        pageTitle={id ? "Edit" : "Create"}
        parentTitle={"Branch"}
      />
      <div className="m-2 p-2">
        <FormProvider>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="default-tab">
              <Tab.Container defaultActiveKey={tabHeading[0].toLowerCase()}>
                <Nav as="ul" className="nav-tabs">
                  {tabHeading.map((data, i) => (
                    <Nav.Item as="li" key={i}>
                      <Nav.Link
                        style={{ padding: ".5rem 2rem" }}
                        eventKey={data.toLowerCase()}
                        active={i === activeIndex}
                        onClick={() => setActiveIndex(i)}
                      >
                        {data}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
                <Tab.Content className="pt-4">
                  {isLoading ? (
                    <Loader height={500} />
                  ) : (
                    tabHeading.map((data, i) => {
                      const Component = component[i];
                      return (
                        <Tab.Pane
                          eventKey={data.toLowerCase()}
                          key={i}
                          active={i === activeIndex}
                        >
                          <Component
                            data={tabHeading}
                            control={control}
                            setValue={setValue}
                            register={register}
                            getValues={getValues}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            onSubmit={onSubmit}
                            watch={watch}
                            isFormSubmitting={createPending || editPending}
                          />
                        </Tab.Pane>
                      );
                    })
                  )}
                  {}
                </Tab.Content>
              </Tab.Container>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default BranchForm;
