import React, { useCallback, useEffect, useState } from "react";
import { fileUpload } from "../services/api/BusinessGroup";
import { notifyError, notifySuccess } from "../utils/toast";

const FileUploader = ({
  register,
  name,
  label,
  defaultValue,
  setValue,
  setLoading,
  loading,
}) => {
  const upload_Preset = "our_cloudinary_upload_preset";

  const fileUploader = async (e) => {
    try {
      setLoading(true);
      const acceptedFiles = e.target.files;
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("upload_preset", upload_Preset);
      if (e.target.files[0]) {
        const { message, data } = await fileUpload(formData);
        setValue(name, data.link);
        notifySuccess(message);
      }
    } catch (error) {
      console.log("[FILE_UPLOAD_ERROR]", error);
      notifyError("file is not uploaded");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        {...register(`${name}`)}
        name={name}
        label={label}
        style={{ height: "46px" }}
        className="form-control"
        onChange={fileUploader}
        defaultValue={defaultValue}
        disabled={loading}
        accept="image/*"
      />
    </div>
  );
};

export default FileUploader;
