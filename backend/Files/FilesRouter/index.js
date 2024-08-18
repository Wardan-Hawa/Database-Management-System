const express = require("express");
const router = express.Router();
const fileController = require("../FilesController");
const multer = require('multer');
const { isAuth } = require("../../middlewares"); 
const { upload } = require("../FilesController");


router.post("/upload", isAuth, upload.single('file'), fileController.uploadFile);
router.get('/all', isAuth, fileController.getAllFiles);

router.delete('/delete/:fileId', isAuth, async (req, res) => {
    try {
        const { fileId } = req.params;
        const result = await fileController.deleteFile(fileId);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:fileId/tags', fileController.getFileTags);
module.exports = router;
