import {useEffect, useState, useContext} from 'react'
import { useForm } from "react-hook-form";
import { ThemeContext } from '../context/ThemeContext';
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
  const {setAddVehicle} = useContext(ThemeContext)

  const onSubmit = async(data) =>{
    try{
      console.log(data)
      console.log("Entering")
      setAddVehicle(data)
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
    control,
    getValues,
    formState: { errors },
    }
}

export default useVehicleSubmit