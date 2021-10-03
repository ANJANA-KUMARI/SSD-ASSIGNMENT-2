const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * Route handler for login and retrieving google drive images
 */
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
        // retrieving image file from google drive
        let files = [];
        // invoke google drive API to get all images file info
        axios
          .get(
            "https://www.googleapis.com/drive/v3/files?key=" +
              GOOGLE_API_KEY +
              "&q=mimeType='image/jpeg'",
            { headers }
          )
          .then((result) => {
            // success
            files = result.data.files;
          })
          .catch((err) => {
            // error
            console.log(err);
          })
          .finally(() => {
            // return success to response
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
