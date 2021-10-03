import React, { useEffect, useState } from "react";
import axios from "axios";

function PostPostedSide({ selectedFileId }) {
  const [authToken, setAuthToken] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!window.location.href.includes("onedrive")) {
      return;
    }

    // get access token from the url
    const query = new URLSearchParams(window.location.href.split("#")[1]);
    const token = query.get("access_token");

    if (token) {
      // we have the access token
      localStorage.setItem("@oneDriveAuth", token);
      // setAuthToken(token);
      window.location.href = "http://localhost:3000";
    }
  }, []);

  useEffect(() => {
    // check if already stored token is there
    const savedToken = localStorage.getItem("@oneDriveAuth");
    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, []);

  /**
   * navigate to onedrive auth
   */
  const authOnedrive = async () => {
    const url = `https://login.live.com/oauth20_authorize.srf?client_id=44748ad2-c42b-4ce9-9f76-71d652d81e5c&scope=files.readwrite
    &response_type=token&redirect_uri=${encodeURIComponent(
      "http://localhost:3000/onedrive"
    )}`;
    window.location.href = url;
  };

  /**
   * Invoke backend API to upload the image
   */
  const uploadFile = async () => {
    setIsUploading(true);

    try {
      const googleAccessToken = localStorage.getItem("@googleAuth");

      const response = await axios.post(
        "http://localhost:8000/onedrive/upload",
        {
          fileId: selectedFileId,
          googleAccessToken,
          onedriveAccessToken: authToken,
        }
      );

      // set success msg
      setMsg(
        response.status === 200
          ? "Successfully uploaded file"
          : "Failed to upload file"
      );
    } catch (e) {
      console.error(e);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="facebook-card-wrapper">
      <h4 className="mb-4">Upload file to Onedrive</h4>
      <div className=""></div>
      <div className="d-flex flex-column">
        {!authToken && (
          <button className="btn btn-primary" onClick={authOnedrive}>
            Login with onedrive
          </button>
        )}

        {authToken && (
          <button
            className="btn btn-success"
            disabled={!selectedFileId}
            onClick={uploadFile}
          >
            {isUploading ? "Uploading..." : "Upload file"}
          </button>
        )}

        <br />
        {msg && <span>{msg}</span>}
      </div>
    </div>
  );
}

export default PostPostedSide;
