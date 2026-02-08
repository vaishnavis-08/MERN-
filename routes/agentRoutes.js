const express = require('express');
const router = express.Router();
const { authAgent, registerAgent, getAgents, updateAgent, deleteAgent } = require('../controllers/agentController');
const { protectAdmin } = require('../middleware/authMiddleware');

console.log('Agent routes loaded');
router.use((req, res, next) => {
    console.log('Agent route hit:', req.method, req.url);
    next();
});

router.post('/login', authAgent);
router.post('/register', protectAdmin, registerAgent);
router.route('/').post(protectAdmin, registerAgent).get(protectAdmin, getAgents);
router
    .route('/:id')
    .put(protectAdmin, updateAgent)
    .delete(protectAdmin, deleteAgent);

module.exports = router;
