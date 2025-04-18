import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import "react-country-state-city/dist/react-country-state-city.css";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import MainPagetitle from "@/components/MainPagetitle";
import UserForm from "../components/Form";
import { subUserAccountSchema, subUserEditAccountSchema } from "@/utils/yup";
import { notifyError, notifySuccess } from "@/utils/toast";
import { createUser, getUserById, updateUser } from "../api";
import { getApiErrorMessage } from "@/utils/helper";
import Loader from "@/components/Loader";

const CreateUser = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabHeading = [t("account")];
  const component = [UserForm];
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userDetails = useSelector((state) => state.auth.user);

  const {
    data: userData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
    staleTime: Infinity,
  });

  const parsedUserData = useMemo(() => {
    return {
      ...userData,
    };
  }, [userData]);

  useEffect(() => {
    if (isError && !!id) {
      notifyError("Not able to fetch user data");
      navigate("/not-found");
    }
  }, [isError && id]);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    control,
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(id ? subUserEditAccountSchema : subUserAccountSchema),
    values: parsedUserData,
  });

  const onError = (err) => notifyError(getApiErrorMessage(err));

  const { mutate: ediUserMutation, isPending: editPending } = useMutation({
    mutationFn: ({ data, id }) => updateUser(id, data),
    onSuccess: () => {
      notifySuccess("User Updated Successfully");
      queryClient.invalidateQueries(["users"]);
      navigate("/user");
    },
    onError,
  });

  const { mutate: createUserMutation, isPending: createPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      notifySuccess("New User Created");
      queryClient.invalidateQueries(["users"]);
      navigate("/user");
    },
    onError,
  });

  const onSubmit = (data) => {
    if (id) {
      ediUserMutation({ id, data });
    } else {
      data.role = "USER";
      data.parent = userDetails.userName;
      data.type = "STAFF";
      createUserMutation(data);
    }
  };

  return (
    <>
      <MainPagetitle
        mainTitle="User"
        pageTitle={id ? "Edit" : "Create"}
        parentTitle={"User"}
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
                            onSubmit={onSubmit}
                            handleSubmit={handleSubmit}
                            isFormSubmitting={createPending || editPending}
                            watch={watch}
                          />
                        </Tab.Pane>
                      );
                    })
                  )}
                </Tab.Content>
              </Tab.Container>
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
};
export default CreateUser;
