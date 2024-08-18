const researchGroupFileService = require('../RGFilesServices'); // Update path as needed
const multer = require('multer');
const fs = require('fs');
const { ResearchGroupFiles, Files } = require('../../models');
const { sequelize } = require('../../db');

const getFileExtension = (mimeType) => {
    switch (mimeType) {
        case 'image/jpeg':
            return '.jpg';
        case 'image/png':
            return '.png';
        // Add other MIME types and their corresponding extensions here
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



const uploadGroupFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, mimetype, path } = req.file;
        const userId = req.user?.id; // Assuming you have user information in req.user
        const groupId = req.params.groupId;
        const tagsList = req.body.tags; // Assuming tags are sent as a comma-separated string

        const newFile = await researchGroupFileService.createGroupFileWithTags({
            fileName: req.body.fileName || originalname,
            fileType: mimetype,
            filePath: path,
            userId: userId,
            groupId: groupId,
            TagsList: tagsList
        });

        return res.status(201).json({ message: 'Group file uploaded successfully', file: newFile });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const getAllGroupFiles = async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const files = await researchGroupFileService.getAllGroupFiles(groupId); // Service function to get all files for a group
        return res.status(200).json(files);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const deleteGroupFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        const groupId = req.params.groupId;
        await researchGroupFileService.deleteGroupFile(groupId, fileId); // Service function to delete a file from a group
        res.status(200).json({ message: 'Group file deleted successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

const getGroupFileTags = async (req, res) => {
    try {
        const { fileId } = req.params;
        const groupId = req.params.groupId;
        const tags = await researchGroupFileService.getGroupFileTags(groupId, fileId); // Service function to get tags for a group file
        res.status(200).json(tags);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    uploadGroupFile,
    getAllGroupFiles,
    deleteGroupFile,
    getGroupFileTags,
    upload
};
