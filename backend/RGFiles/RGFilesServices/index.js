const { ResearchGroupFiles, Files, Tags, FileTags, ResearchGroups } = require('../../models');
const { sequelize } = require('../../db');
const fs = require('fs');

const createGroupFileWithTags = async ({ fileName, fileType, filePath, userId, groupId, TagsList }) => {
    console.log('Received groupId in service:', groupId);

    const transaction = await sequelize.transaction();
    try {
        // First, validate the group exists and the user belongs to it
        const group = await ResearchGroups.findByPk(groupId);
        if (!group) {
            throw new Error('Group not found');
        }
        
        // Create a new file entry in Files table
        const file = await Files.create({
            fileName,
            fileType,
            filePath,
            userId
        }, { transaction });

        // Create a new association entry in ResearchGroupFiles table
        await ResearchGroupFiles.create({
            groupId: groupId,
            fileId: file.id
        }, { transaction });

        // Handle tags if provided
        if (TagsList && TagsList.length > 0) {
            const tagNames = TagsList.split(',').map(tag => tag.trim());
            for (const tagName of tagNames) {
                // Find or create each tag
                const [tag] = await Tags.findOrCreate({
                    where: { tagName },
                    defaults: { tagName },
                    transaction
                });
                
                // Associate the tag with the file
                await FileTags.create({
                    file_id: file.id,
                    tag_id: tag.id
                }, { transaction });
            }
        }

        await transaction.commit();
        return file;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getAllGroupFiles = async (groupId) => {
    try {
        const groupFiles = await ResearchGroupFiles.findAll({
            where: { group_id: groupId },
            include: [{
                model: Files,
                include: [Tags]
            }]
        });

        return groupFiles;
    } catch (error) {
        console.error('Error fetching group files:', error);
        throw error;
    }
};

const deleteGroupFile = async (groupId, fileId) => {
    const transaction = await sequelize.transaction();
    try {
        const groupFile = await ResearchGroupFiles.findOne({
            where: { groupId, fileId }
        });
        if (!groupFile) {
            throw new Error('File not found in group');
        }

        const file = await Files.findByPk(fileId);
        if (!file) {
            throw new Error('File not found');
        }

        // Optional: Delete the physical file from storage
        fs.unlinkSync(file.filePath);

        // Delete the file association with the group
        await groupFile.destroy({ transaction });

        // Delete the file record from the database
        await file.destroy({ transaction });

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const getGroupFileTags = async (groupId, fileId) => {
    // Check if the file is part of the group
    const groupFile = await ResearchGroupFiles.findOne({
        where: { groupId, fileId }
    });
    if (!groupFile) {
        throw new Error('File not found in group');
    }

    return await FileTags.findAll({
        where: { fileId },
        include: [{
            model: Tags,
            required: true
        }]
    });
};

module.exports = {
    createGroupFileWithTags,
    getAllGroupFiles,
    deleteGroupFile,
    getGroupFileTags
};
