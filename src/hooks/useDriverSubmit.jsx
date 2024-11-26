import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
const useDriverSubmit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  };
};

export default useDriverSubmit;
