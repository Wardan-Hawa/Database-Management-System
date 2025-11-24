const { ResearchGroups, User, ResearchGroupMembers } = require('../../models');
const { sequelize } = require('../../db'); 

class ResearchGroupService {
    static async createResearchGroup(groupData, founderId) {
      const transaction = await sequelize.transaction();
  
      try {
        const { groupName, groupDescription, members } = groupData;
        
        // Create the research group
        const newGroup = await ResearchGroups.create({
          groupName: groupName,
          groupDescription: groupDescription
        }, { transaction });
  
        await ResearchGroupMembers.create({
          userId: founderId,
          groupId: newGroup.id,
          memberRole: 'Founder'
        }, { transaction });
  
        const memberUsers = await User.findAll({
          where: {
            email: members
          }
        });
  
        await Promise.all(memberUsers.map(user => {
          if (user.id !== founderId) {
            return ResearchGroupMembers.create({
              userId: user.id,
              groupId: newGroup.id,
              memberRole: 'Member'
            }, { transaction });
          }
        }));
  
        await transaction.commit();
        return newGroup;
      } catch (error) {
        await transaction.rollback();
        console.error('Error in transaction:', error);
        throw error;
      }
    }
    static async getGroupsForUser(userId) {
        try {
          const groups = await ResearchGroups.findAll({
            include: [{
              model: User,
              where: { id: userId },
              attributes: ['id', 'username', 'email'] 
            }]
          });
          return groups;
        } catch (error) {
          throw error; 
        }
      }
      static async leaveGroup(userId, groupId) {
        try {
            const result = await ResearchGroupMembers.destroy({
                where: {
                    userId: userId,
                    groupId: groupId
                }
            });

            if (result === 0) {
                throw new Error('No membership record found or user already not in the group.');
            }

            return { message: 'Successfully left the group.' };
        } catch (error) {
            throw error; 
        }
    }
    static async markAsFavorite(groupId) {
        try {
          const group = await ResearchGroups.findByPk(groupId);
          if (!group) {
            throw new Error('Research group not found');
          }
    
          group.isFav = true;
          await group.save();
    
          return group;
        } catch (error) {
          throw error;
        }
      }
  }
  
  
  module.exports = ResearchGroupService;



