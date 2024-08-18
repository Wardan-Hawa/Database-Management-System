const express = require('express');
const ResearchGroupController = require('../rsController');
const router = express.Router();
const { isAuth } = require("../../middlewares"); 
ResearchGroupService = require('../rsServices');
const { ResearchGroups} = require('../../models');


router.post('/create', isAuth,ResearchGroupController.create);
router.get('/user', isAuth, ResearchGroupController.getGroupsForCurrentUser);
router.delete('/leave/:groupId', isAuth, ResearchGroupController.leaveGroup);
router.put('/:groupId/favorite', async (req, res) => {
    const { groupId } = req.params;
    const { isFav } = req.body;
  
    try {
      const group = await ResearchGroups.findByPk(groupId);
      if (!group) {
        return res.status(404).json({ error: 'Group not found' });
      }
  
      group.isFav = isFav;
      await group.save();
  
      res.json(group);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;