import {useEffect, useState, useContext} from 'react'
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

  const onSubmit = async(data) =>{
    try{
      console.log(data);
      
    }
    catch(err){
        console.log(err)
    }
  }
    
  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    getValues,
    formState: { errors },
    }
}

export default useAlertSubmit;