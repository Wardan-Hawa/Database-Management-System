const { Files, Tags, FileTags } = require('../../models'); 
const { sequelize } = require('../../db'); 

const getFileTags = async (fileId) => {
    const fileTags = await FileTags.findAll({
        where: { FileID: fileId },
        include: [{
            model: Tags,
            required: true
        }]
    });

    const tags = fileTags.map(ft => ft.Tag.TagName);

    return tags;
};

const createFileWithTags = async ({ fileName, fileType, filePath, userId, TagsList }) => {
    try {
        const result = await sequelize.transaction(async (transaction) => {
            // Create a new file entry
            const file = await Files.create({
                fileName, 
                fileType,
                filePath,
                userId
            }, { transaction });
            console.log("Created file:", file.toJSON());
            if (TagsList) {
                const tagNames = TagsList.split(',').map(tag => tag.trim());
                for (const tagName of tagNames) {
                    // Find or create each tag
                    const [tag] = await Tags.findOrCreate({
                        where: { tagName },
                        defaults: { tagName },
                        transaction
                        
                    });
                    console.log("Created tag:", tag.toJSON());

                    await FileTags.create({
                        file_id: file.id, 
                        tag_id: tag.id
                    }, { transaction });
                }
            }

            return file;
        });

        return result;
    } catch (err) {
        console.error('Error in createFileWithTags:', err);
        throw err;
    }
};
const getAllFiles = async () => {
    return await Files.findAll();
};


module.exports = {
    createFileWithTags,
    getAllFiles,
    getFileTags
};
