import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function PhotosSelectionSide() {

    const responseSuccessGoogle = (res) => {
        console.log("Success");
        console.log(res);
        axios({
            method: "GET",
            url: "http://localhost:5000/google/get-auth-url",
        }).then(res => {
            console.log("Response: ");
            console.log(res.data);
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
                    clientId="959000517651-tpaevdgmts4gtftppmj118ci0musjg44.apps.googleusercontent.com"
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