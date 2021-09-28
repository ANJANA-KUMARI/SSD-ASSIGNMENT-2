import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import image from '../assets/google.png';

const a = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

function PhotosSelectionSide() {

    const responseUrl = window.location.search.includes('code');

    const [selectedPhotos, setSelectedPhotos] = useState([]);
    
    /* Functions Section */
    const handleSelections = (id, url) => {
        if(selectedPhotos.find(i => i.photoId === id)) {
            setSelectedPhotos(selectedPhotos.filter(i => i.photoId !== id));
        } else {
            setSelectedPhotos([...selectedPhotos, {photoId: id, photoUrl: url}]);
        }
    }

    const handleOnSubmit = () => {
        setSelectedPhotos([]);
    }

    // console.log("**", responseUrl);

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
        })
    }
    
    const responseFailureGoogle = (res) => {
        console.log("Fail");
        console.log(res);
    }

    const handleGetUrl = () => {
        axios({
            method: "GET",
            url: "http://localhost:5000/google/get-auth-url"
        }).then(res => {
            console.log("Response: ");
            console.log(typeof res.data);
            if(res.data) {
                window.location.href = res.data;
            }
        });
    }

    /* useEffects' Section */
    useEffect(() => {
        if(responseUrl) {
            const CODE = window.location.search.split('=')[1].split('&')[0];
            console.log("Code: " + CODE);
            axios({
                method: "POST",
                url: "http://localhost:5000/google/get-token",
                data: { code: CODE }
            }).then(res => {
                console.log("Token ID: ");
                console.log(res.data);
                // const TOKEN = res.data;
                // if(TOKEN) {
                //     axios({
                //         method: "POST",
                //         url: "http://localhost:5000/google/read-drive",
                //         data: { token: TOKEN }
                //     }).then(res => {
                //         console.log("Get Drive Files: ");
                //         console.log(res.data);
                //     })
                // }
            })
        }
    }, [responseUrl]);

    useEffect(() => {
        console.log(selectedPhotos);
        
    }, [selectedPhotos]);
    
    // console.log("Get URL: " + window.location.href);

    /* Components Section */
    const photoCard = (id, url) => (
        <div>
            <div  className="img-card-wrapper" >
                <div key={id} className={ selectedPhotos.find(i => i.photoId === id) ?  "selected-img-card" : "img-card"} onClick={() => handleSelections(id, url)}>
                    {url}
                </div>
            </div> 
        </div>
    );

    const listCard = a.map((card, index) => 
        photoCard(index, card)
    )
    
    return (
        <div className="main-wrapper">
            <h4>Select photos from Google</h4>
            <div style={{display: "none"}}>
                <div className="btn-center" style={{display: "none"}}>
                    <GoogleLogin
                        clientId="128644511689-1sdmau2gitdj3mbtms7g0s67lh6g75h6.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseFailureGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>

                <div className="btn-center" style={{marginTop: '20px'}}>
                    <button className="google-sign-in-btn  google-btn" onClick={handleGetUrl}>
                        <img src={image} className="google-icon"/>
                        <p> Sign in with Google </p>
                    </button>
                </div>
            </div>

            <div className="photo-card-wrapper">
                { listCard }
            </div>

            <div className="btn-center">
                <button className="facebook-btn" onClick={handleOnSubmit}> Post on Facebook </button>
            </div>
               
        </div>
    );
}

export default PhotosSelectionSide;