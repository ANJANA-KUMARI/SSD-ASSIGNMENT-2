const express = require('express');
const router = express.Router();

const { googleLogin, getGoogleAuthUrl, getGoogleToken, readGoogleDrive, downloadGooglePhotos } = require('../controller/google-photos-select');

router.post('/login', googleLogin);
router.get('/get-auth-url', getGoogleAuthUrl);
router.post('/get-token', getGoogleToken);
router.post('/read-drive', readGoogleDrive);
router.get('/download-photo/:id', downloadGooglePhotos);

module.exports = router;
