import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { ThemeContext } from "../context/ThemeContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { vehicleSchema } from "../yup";

const useVehicleSubmit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    control,
    formState: { errors },
  } = useForm();
  const { setAddVehicle } = useContext(ThemeContext);

  const onSubmit = async (data) => {
    try {
      setAddVehicle(data);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  };
};

export default useVehicleSubmit;
