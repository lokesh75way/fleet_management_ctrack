import React from 'react'
import {useTranslation} from 'react-i18next'
import Error from './Error/Error';


const RadioButtonCustomComponent = ({selectedOption,handleChange,getValues,errors,Title,options,required,name}) => {

const { t } = useTranslation();
  return (
    <div className="col-xl-6 mb-3">

                      <label className="form-label">
                        {t(Title)}
                        {required && <span className="text-danger">*</span>}
                      </label>

                      <div
                        className="basic-form"
                        style={{ marginTop: ".5rem" }}
                      >
                    {options.map((option)=>{ 
                        
                        return <div className="form-check custom-checkbox form-check-inline">
                        <input
                        type="radio"
                        className="form-check-input"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={handleChange}
                        />
                        <label
                        className="form-check-label"
                        style={{ marginBottom: "0" }}
                        >
                        {t(option.name)}
                        </label>
                        </div> 
                            }) 
                    }

                      </div>
                      {!getValues(name) && (
                        <Error errorName={errors[name]} />
                      )}
                    </div>
  )
}

export default RadioButtonCustomComponent