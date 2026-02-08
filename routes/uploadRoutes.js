const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protectAdmin, upload.single('file'), uploadFile);

module.exports = router;
