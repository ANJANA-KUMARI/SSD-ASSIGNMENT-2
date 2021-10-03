import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";

export default function GoogleSide({ setFilesList, onRemove }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    // get the access token and token id
    const token = localStorage.getItem("@googleAuth");
    const tokenId = localStorage.getItem("@googleAuthId");
    // check if already stored access token and token id are there
    if (token && tokenId) {
      fetchProfileAndFiles(tokenId, token);
    }
  }, []);

  /**
   *  Handle google success response 
   * */
  const responseSuccessGoogle = (res) => {
    console.log(res);
    localStorage.setItem("@googleAuth", res.accessToken);
    localStorage.setItem("@googleAuthId", res.tokenId);
    fetchProfileAndFiles(res.tokenId, res.accessToken);
  };

  /**
   * Invoke backend API to get the images
   */
  const fetchProfileAndFiles = (tokenId, accessToken) => {
    axios({
      method: "POST",
      url: "http://localhost:8000/google/login",
      data: { tokenId, accessToken },
    }).then((res) => {
      setPhotoUrl(res.data.user.picture);
      setFilesList(res.data.files);
    });
  };

  /**
   *  Handle google fail response 
   * */
  const responseFailureGoogle = (res) => {
    console.log("Fail");
    console.log(res);
  };

  // remove all retrieved images and redirect to the home page 
  const handleOnRemove = () => {
    setPhotoUrl("");
    onRemove();
  };

  return (
    <div className="google-card-wrapper">
      <h4>Google Photos to Onedrive</h4>
      <div style={{ display: photoUrl.length === 0 ? "block" : "none" }}>
        <div className="center google-btn">
          <GoogleLogin
            clientId="365796586806-r5db3q6njc93nkaktqi44cd7c3b1o98j.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={"single_host_origin"}
            theme="dark"
            scope="https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata "
          />
        </div>
      </div>

      <div style={{ display: photoUrl.length > 0 ? "block" : "none" }}>
        <Photo url={photoUrl} onRemove={handleOnRemove} />
      </div>
    </div>
  );
}

export function Photo({ url, onRemove }) {
  const handleOnSubmit = () => {};

  /* Parent Call the Child Function When Press the Remove Button */
  const handleOnRemove = () => {
    onRemove();
  };

  return (
    <div>
      <div className="center">
        <div>
          <img className="img" alt="My Profile" src={`${url}`} />
        </div>
      </div>
      <div className="center" style={{ justifyContent: "space-between" }}>
        <button className="remove-btn" onClick={handleOnRemove}>
          {" "}
          Remove{" "}
        </button>
        <button className="facebook-btn" onClick={handleOnSubmit}>
          {" "}
          Upload Profile{" "}
        </button>
      </div>
    </div>
  );
}
