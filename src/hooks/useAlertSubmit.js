import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
const useAlertSubmit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  return {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  };
};

export default useAlertSubmit;
