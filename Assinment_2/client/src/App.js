import { useState } from "react";
import "./App.css";
import GoogleSide from "./component/googleSide";
import PostPostedSide from "./component/postPostedSide";
import FileList from "./component/fileList";

function App() {
  const [files, setFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const handleRemove = () => {
    setFiles([]);
  }

  return (
    <div className="">
      <h1>Upload Google Profile on Facebook</h1>

      <div className="container">
        <div className="w-100 d-flex justify-content-between">
          <GoogleSide onRemove={handleRemove} setFilesList={(fileList) => setFiles(fileList)} />
          <PostPostedSide />
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

