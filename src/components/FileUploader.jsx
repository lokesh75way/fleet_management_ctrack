import React from "react";
import { fileUpload } from "../services/api/BusinessGroup";
import { notifyError } from "../utils/toast";

const FileUploader = ({ register }) => {
  const fileChangeHandler = async (e) => {
    console.log(e.target.files[0]);
    try {
      const {url} = await fileUpload(e.target.files[0]);
      
    } catch (error) {
      console.log(error);
      notifyError(error)
    }
  };
  return (
    <input
      type="file"
      {...register("businessGroupLogo")}
      onChange={fileChangeHandler}
      label="Business Group Logo"
      name="businessGroupLogo"
      accept=".jpg, .jpeg, .png"
      className="form-control"
    />
  );
};

export default FileUploader;
