const ResearchGroupService = require('../rsServices');

class ResearchGroupController {
    static async create(req, res) {
        try {
          const userId = req.user.id; 
          const newGroup = await ResearchGroupService.createResearchGroup(req.body, userId);
          res.status(201).json(newGroup);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }

  static async getGroupsForCurrentUser(req, res) {
    try {
        const userId = req.user.id; 
        const groups = await ResearchGroupService.getGroupsForUser(userId);
        res.json(groups);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }
  static async leaveGroup(req, res) {
    try {
      const userId = req.user.id; 
      const { groupId } = req.params;

      await ResearchGroupService.leaveGroup(userId, groupId);

      res.status(200).json({ message: 'Successfully left the group.' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ResearchGroupController;
