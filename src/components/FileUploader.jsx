import React, { useEffect, useState } from "react";
import { fileUpload } from "../services/api/BusinessGroup";
import { notifyError, notifySuccess } from "../utils/toast";
import { FaTimes } from "react-icons/fa"; // Import the cross icon

const FileUploader = ({
  register,
  name,
  label,
  defaultValue,
  setValue,
  setLoading,
  loading,
  link = false
}) => {

  const upload_Preset = "our_cloudinary_upload_preset";
  const [fileLink, setFileLink] = useState(null);

  useEffect(() => {
    if (link) {
      setFileLink(link);
      setValue(name, link)
    }
  }, [link]);

  const fileUploader = async (e) => {
    try {
      setFileLink('')
      e.preventDefault();
      setLoading(true);
      const acceptedFiles = e.target.files;
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      formData.append("upload_preset", upload_Preset);
      if (e.target.files[0]) {
        const {
          message,
          data: { link },
        } = await fileUpload(formData);
        setValue(name, link);
        setFileLink(link);
        notifySuccess(message);
      }
    } catch (error) {
      notifyError("File is not uploaded");
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setFileLink(null);
    setValue(name, null);
  };

  return (
    <div className="file-uploader-container">
      <div className="file-upload-box">
        {fileLink ? (
         <div className="uploaded-image-container">
         <img src={fileLink} alt="Uploaded file" className="uploaded-image" />
         <button className="remove-button" onClick={removeFile}>
           <FaTimes />
         </button>
       </div>
        ) : (
          <label htmlFor={`file-input-${name}`} className="file-upload-label">
            <span>Upload Logo</span>
          </label>
        )}
        <input
          id={`file-input-${name}`}
          type="file"
          {...register(`${name}`)}
          name={name}
          label={label}
          className="file-input"
          onChange={fileUploader}
          defaultValue={defaultValue}
          disabled={loading}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default FileUploader;
