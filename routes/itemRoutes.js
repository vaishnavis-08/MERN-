const express = require('express');
const router = express.Router();
const { createItem, getAgentItems, getDistributedItemsByAgent } = require('../controllers/itemController');
const { protectAdmin, protectAgent } = require('../middleware/authMiddleware');

router.post('/', protectAdmin, createItem);
router.get('/my-items', protectAgent, getAgentItems);
router.get('/grouped', protectAdmin, getDistributedItemsByAgent);

module.exports = router;
