import {useEffect, useState, useContext} from 'react'
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
    control,
    formState: { errors },
    }
}

export default useDriverSubmit