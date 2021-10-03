const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

router.post("/login", async (req, res) => {
  const { tokenId, accessToken } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      audience: GOOGLE_CLIENT_ID,
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
              GOOGLE_API_KEY +
              "&q=mimeType='image/jpeg'",
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
