const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

/**
 * Route handler for downloading and uploading images
 */
router.post("/upload", async (req, res) => {
  const { fileId, googleAccessToken, onedriveAccessToken } = req.body;

  // download file from google drive
  const headers = {
    Authorization: `Bearer ${googleAccessToken}`,
    Accept: "application/json",
  };

  try {
    // invoke google drive API to get file info
    const fileInfo = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${fileId}?key=${GOOGLE_API_KEY}`,
      { headers }
    );

    // open a stream to write the file to file system
    const dest = fs.createWriteStream(fileInfo.data.name);

    // invoke google drive API to download the file content
    axios
      .get(
        `https://www.googleapis.com/drive/v3/files/${fileId}?key=${GOOGLE_API_KEY}`,
        { headers, responseType: "stream" }
      )
      .then((fileResponse) => {
        // write file content to file system
        fileResponse.data.pipe(dest);

        // upload the file to onedrive
        dest.on("finish", () => {
          const oneDriveUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${encodeURIComponent(
            fileInfo.data.name
          )}:/content`;

          const onedriveHeaders = {
            headers: {
              Authorization: `Bearer ${onedriveAccessToken}`,
            },
          };

          // read file from the file system
          const file = fs.createReadStream(fileInfo.data.name);

          // invoke onedrive API to upload the file
          axios
            .put(oneDriveUrl, file, onedriveHeaders)
            .then((res) => {
              // success
              console.log(res);
            })
            .catch((e) => {
              // error
              console.error(e.message);
            })
            .finally(() => {
              // delete the saved file
              fs.unlinkSync(fileInfo.data.name);

              // return success the response
              return res.status(200).json({
                status: "success",
              });
            });
        });
      })
      .catch((e) => {
        console.log(e);

        // return the error response
        return res.status(500).json({
          status: "failed",
        });
      });
  } catch (e) {
    console.error(e);

    // return the error response
    return res.status(500).json({
      status: "failed",
    });
  }
});

module.exports = router;
