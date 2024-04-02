import React, { useCallback, useEffect, useState } from "react";
import { fileUpload } from "../services/api/BusinessGroup";
import { notifyError } from "../utils/toast";
import Dropzone, { useDropzone } from "react-dropzone";

const FileUploader = ({ register }) => {
  const [file, setFile] = useState();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxSize: 500000,
    onDrop:async (acceptedFiles) => {
      const url = await fileUpload(acceptedFiles[0])
      console.log(url)
    },
  });
  

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
