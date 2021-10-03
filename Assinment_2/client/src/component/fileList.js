import React from "react";

const FileList = ({ files, onFileSelect, selectedFileId }) => {
  return (
    <div className="d-flex flex-wrap mt-5">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {files.map((file) => (
          <div className="col">
            <div
              onClick={() => onFileSelect(file.id)}
              className={`card ${
                selectedFileId === file.id ? "bg-warning" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body">
                <h5 className="card-title">{file.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileList;
