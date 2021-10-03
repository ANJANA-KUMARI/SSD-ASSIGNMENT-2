import { useState } from "react";
import "./App.css";
import GoogleSide from "./component/googleSide";
import PostPostedSide from "./component/postPostedSide";
import FileList from "./component/fileList";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);

  // clear files and logout user
  const handleRemove = () => {
    setFiles([]);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="">
      <h1>Upload Google Photos on Onedrive</h1>

      <div className="container">
        <div className="w-100 d-flex justify-content-between">
          <GoogleSide
            onRemove={handleRemove}
            setFilesList={(fileList) => setFiles(fileList)}
          />
          <PostPostedSide selectedFileId={selectedFileId} />
        </div>
        <FileList
          files={files}
          onFileSelect={(id) => setSelectedFileId(id)}
          selectedFileId={selectedFileId}
        />
      </div>
    </div>
  );
}

export default App;
