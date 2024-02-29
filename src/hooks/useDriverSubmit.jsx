import {useEffect, useState, useContext} from 'react'
import { useForm } from "react-hook-form";
const useDriverSubmit = () => {
const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    trigger,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) =>{
    try{

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
    formState: { errors },
    }
}

export default useDriverSubmit