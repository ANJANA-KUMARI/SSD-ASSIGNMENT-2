import React, { useEffect, useState } from "react";
import axios from "axios";

function PostPostedSide() {
  const [authToken, setAuthToken] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!window.location.href.includes("onedrive")) {
      return;
    }

    const query = new URLSearchParams(window.location.href.split("#")[1]);
    const token = query.get("access_token");

    if (token) {
      // we have the access token
      localStorage.setItem("@oneDriveAuth", token);
      setAuthToken(token);
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("@oneDriveAuth");
    if (savedToken) {
      setAuthToken(savedToken);
    }
  }, []);

  const authOnedrive = async () => {
    const url = `https://login.live.com/oauth20_authorize.srf?client_id=44748ad2-c42b-4ce9-9f76-71d652d81e5c&scope=files.readwrite
    &response_type=token&redirect_uri=${encodeURIComponent(
      "http://localhost:3000"
    )}`;
    window.location.href = url;
  };

  const uploadFile = async () => {
    setIsUploading(true);
    const url = `https://graph.microsoft.com/v1.0/me/drive/root:/fileB.txt:/content`;
    const headers = {
      headers: {
        Authorization: `bearer ${authToken}`,
        "Content-Type": "text/plain",
      },
    };

    try {
      const response = await axios.put(url, "hello", headers);
      setMsg(
        response.status === 201 || response.status === 200
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
      <h4>Upload file to Onedrive</h4>
      <div className=""></div>
      <div className="center">
        {!authToken && (
          <button className="one-drive-button" onClick={authOnedrive}>
            Login with onedrive
          </button>
        )}

        {authToken && (
          <button onClick={uploadFile}>
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
