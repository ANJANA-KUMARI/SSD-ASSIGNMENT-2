import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

export default function PhotosSelectionSide() {

    const [photoUrl, setPhotoUrl] = useState("");

    const responseSuccessGoogle = (res) => {
        console.log("Success");
        console.log(res.profileObj.imageUrl);
        setPhotoUrl(res.profileObj.imageUrl);
    }

    const responseFailureGoogle = (res) => {
        console.log("Fail");
        console.log(res);
    }

    const handleOnRemove = () => {
        setPhotoUrl("");
    }

    console.log(photoUrl.length);
 
    return (
        <div className="google-card-wrapper">
            <h4>Google Profile to FaceBook</h4>
            <div style={{display: photoUrl.length === 0 ? "block" : "none"}}>
                <div className="center google-btn">
                    <GoogleLogin
                        clientId="365796586806-h6fjc668m83ovro4tn2evcs2k8qmh48v.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseFailureGoogle}
                        cookiePolicy={'single_host_origin'}
                        theme="dark"
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

    const handleOnSubmit = () => {
        
    }

    const handleOnRemove = () => {
        onRemove();
    }

    return (
        <div>
            <div className="center">
                <div>
                    <img className="img" alt="My Profile" src={`${url}`} />
                </div>
            </div>
            <div className="center" style={{justifyContent: 'space-between'}}>
                <button className="remove-btn" onClick={handleOnRemove}> Remove </button>
                <button className="facebook-btn" onClick={handleOnSubmit}> Upload Profile </button>
            </div>
        </div>
    );
}