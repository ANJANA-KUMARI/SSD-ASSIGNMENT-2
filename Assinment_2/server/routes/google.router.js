const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { google } = require("googleapis");

const client = new OAuth2Client(
  "365796586806-r5db3q6njc93nkaktqi44cd7c3b1o98j.apps.googleusercontent.com"
);

router.post("/login", async (req, res) => {
  const { tokenId, accessToken } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "365796586806-r5db3q6njc93nkaktqi44cd7c3b1o98j.apps.googleusercontent.com",
    })
    .then((resp) => {
      const { email_verified, name, email, picture } = resp.payload;
      if (email_verified) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        };
        let files = [];
        axios
          .get(
            "https://www.googleapis.com/drive/v3/files?key=" +
              "AIzaSyCAAJh9y4Pkwh9liqWvJ6iUnTEwnDBVtPk&q=mimeType='image/jpeg'",
            { headers }
          )
          .then((result) => {
            files = result.data.files;
            // console.log(result.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            return res.json({
              user: { name, email, picture },
              files,
            });
          });
      }
      console.log(resp.payload);
    });
});

module.exports = router;
