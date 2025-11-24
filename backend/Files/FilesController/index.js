const fileService = require('../FilesServieces'); // Update path as needed
const multer = require('multer');
const fs = require('fs');
const { Files, Tags } = require('../../models'); 
const { sequelize } = require('../../db'); 


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


const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, mimetype, path } = req.file;
        const userId = req.user?.id;
        const tagsList = req.body.tags;

        const newFile = await fileService.createFileWithTags({
            fileName: req.body.fileName,
            fileType: mimetype,
            filePath: path,
            userId: userId,
            TagsList: tagsList
        });

        return res.status(201).json({ message: 'File uploaded successfully', file: newFile });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
const getAllFiles = async (req, res) => {
    try {
        const files = await fileService.getAllFiles(); 
        return res.status(200).json(files);
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};
const deleteFile = async (fileId) => {
    const transaction = await sequelize.transaction();
    try {
        // Find the file
        const file = await Files.findByPk(fileId);
        if (!file) {
            throw new Error('File not found');
        }

        fs.unlinkSync(file.filePath);

        await file.destroy({ transaction });

        await transaction.commit();
        return { message: 'File deleted successfully' };
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};

const getFileTags = async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await Files.findByPk(fileId, {
            include: [{
                model: Tags,
                through: { attributes: [] }, 
                as: 'Tags'
            }]
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json(file.Tags);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = { uploadFile,
    upload,
    deleteFile,
    getFileTags,
    getAllFiles };
