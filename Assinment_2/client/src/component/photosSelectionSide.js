import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function PhotosSelectionSide() {

    const [responsedUrl, setResponsedUrl] = useState("");
    

    const responseSuccessGoogle = (res) => {
        console.log("Success");
        console.log(res);
        axios({
            method: "POST",
            url: "http://localhost:5000/google/login",
            data: { tokenId: res.tokenId }
        }).then(res => {
            console.log("Response: ");
            console.log(res.data);
            setResponsedUrl(res.data);
        })
    }
    
    const responseFailureGoogle = (res) => {
        console.log("Fail");
        console.log(res);
    }


    return (
        <div className="main-wrapper">
            <h4>Select photos from Google</h4>
            <div className="">

            </div>
            <div className="btn-center">
                <GoogleLogin
                    clientId="128644511689-1sdmau2gitdj3mbtms7g0s67lh6g75h6.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    );
}

export default PhotosSelectionSide;