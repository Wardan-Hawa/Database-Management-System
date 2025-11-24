const express = require('express');
const router = express.Router();
const multer = require('multer');
const { isAuth } = require('../../middlewares');
const researchGroupFileService = require('../RGFilesServices');

const getFileExtension = (mimeType) => {
    switch (mimeType) {
        case 'image/jpeg':
            return '.jpg';
        case 'image/png':
            return '.png';
        default:
            return '';}
            
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'); // Destination folder
        },
        filename: function (req, file, cb) {
            const fileExt = getFileExtension(file.mimetype);
            cb(null, file.fieldname + '-' + Date.now() + fileExt); // Append file extension
        }
    });
    
    const upload = multer({ storage: storage });

router.post('/:groupId/upload', isAuth, upload.single('file'), async (req, res) => {
    try {
        const { groupId } = req.params;
        console.log('Group ID:', groupId); // Log the groupId to check if it's correct

        if (!groupId) {
            return res.status(400).json({ error: 'Group ID is required' });
        }
        const { tags } = req.body; 

        const fileData = {
            fileName: req.body.fileName,
            fileType: req.file.mimetype,
            filePath: req.file.path,
            userId: req.user.id, 
            groupId: groupId,
            TagsList: tags
        };

        const file = await researchGroupFileService.createGroupFileWithTags(fileData);
        res.status(201).json({ message: 'File uploaded successfully', file: file });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:groupId', isAuth, async (req, res) => {
    try {
        const { groupId } = req.params;
        const files = await researchGroupFileService.getAllGroupFiles(groupId);
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:groupId/:fileId', isAuth, async (req, res) => {
    try {
        const { groupId, fileId } = req.params;
        await researchGroupFileService.deleteGroupFile(groupId, fileId);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:groupId/:fileId/tags', isAuth, async (req, res) => {
    try {
        const { groupId, fileId } = req.params;
        const tags = await researchGroupFileService.getGroupFileTags(groupId, fileId);
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
