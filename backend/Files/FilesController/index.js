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


const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { originalname, mimetype, path } = req.file;
        const userId = req.user?.id; // Assuming you have user information in req.user
        const tagsList = req.body.tags; // Assuming tags are sent as a comma-separated string

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
        const files = await fileService.getAllFiles(); // Service function to get all files
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

        // Optional: Delete the physical file from storage
        fs.unlinkSync(file.filePath);

        // Delete the file record from the database
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
        // Extract the fileId from the request parameters
        const { fileId } = req.params;

        // Find the file and include the associated tags
        const file = await Files.findByPk(fileId, {
            include: [{
                model: Tags,
                through: { attributes: [] }, // Only include the Tags model and exclude the junction table attributes
                as: 'Tags'
            }]
        });

        // If the file does not exist, send a 404 response
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Respond with the tags
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
