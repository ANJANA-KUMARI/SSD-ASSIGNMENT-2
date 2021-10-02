import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

export default function GoogleSide() {
  const [photoUrl, setPhotoUrl] = useState('')

  /* Google Success Response */
  const responseSuccessGoogle = (res) => {
    console.log(res);
    axios({
      method: "POST",
      url: 'http://localhost:5000/google/login',
      data: { tokenId: res.tokenId, accessToken: res.accessToken }
    }).then(res => {
      setPhotoUrl(res.data.user.picture);
    }) 
  }

  /* Google Fail Response */
  const responseFailureGoogle = (res) => {
    console.log('Fail')
    console.log(res)
  }

  /* When the Remove Button Pressed - From Child to Parent */
  const handleOnRemove = () => {
    setPhotoUrl('')
  }

  return (
    <div className="google-card-wrapper">
      <h4>Google Profile to FaceBook</h4>
      <div style={{ display: photoUrl.length === 0 ? 'block' : 'none' }}>
        <div className="center google-btn">
          <GoogleLogin
            clientId="365796586806-r5db3q6njc93nkaktqi44cd7c3b1o98j.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseFailureGoogle}
            cookiePolicy={'single_host_origin'}
            theme="dark"
            scope= "https://www.googleapis.com/auth/drive.file"
          />
        </div>
      </div>

      <div style={{ display: photoUrl.length > 0 ? 'block' : 'none' }}>
        <Photo url={photoUrl} onRemove={handleOnRemove} />
      </div>
    </div>
  )
}

export function Photo({ url, onRemove }) {
  const handleOnSubmit = () => {}

  /* Parent Call the Child Function When Press the Remove Button */
  const handleOnRemove = () => {
    onRemove()
  }

  return (
    <div>
      <div className="center">
        <div>
          <img className="img" alt="My Profile" src={`${url}`} />
        </div>
      </div>
      <div className="center" style={{ justifyContent: 'space-between' }}>
        <button className="remove-btn" onClick={handleOnRemove}>
          {' '}
          Remove{' '}
        </button>
        <button className="facebook-btn" onClick={handleOnSubmit}>
          {' '}
          Upload Profile{' '}
        </button>
      </div>
    </div>
  )
}
