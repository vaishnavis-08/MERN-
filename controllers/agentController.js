const Agent = require('../models/Agent');
const generateToken = require('../utils/generateToken');

// @desc    Auth agent & get token
// @route   POST /api/agents/login
// @access  Public
const authAgent = async (req, res) => {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });

    if (agent && (await agent.matchPassword(password))) {
        res.json({
            _id: agent._id,
            name: agent.name,
            email: agent.email,
            token: generateToken(agent._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Register a new agent
// @route   POST /api/agents
// @access  Private/Admin
const registerAgent = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        console.log('Registering agent:', { name, email, mobile });

        const agentExists = await Agent.findOne({ email });

        if (agentExists) {
            console.log('Agent email already exists');
            return res.status(400).json({ message: 'Agent already exists' });
        }

        const agent = await Agent.create({
            name,
            email,
            mobile,
            password,
        });

        if (agent) {
            console.log('Agent created successfully:', agent._id);
            res.status(201).json({
                _id: agent._id,
                name: agent.name,
                email: agent.email,
                mobile: agent.mobile,
            });
        } else {
            console.log('Invalid agent data (no agent returned)');
            res.status(400).json({ message: 'Invalid agent data' });
        }
    } catch (error) {
        console.error('Error in registerAgent:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get all agents
// @route   GET /api/agents
// @access  Private/Admin
const getAgents = async (req, res) => {
    const agents = await Agent.find({});
    res.json(agents);
};

// @desc    Update agent
// @route   PUT /api/agents/:id
// @access  Private/Admin
const updateAgent = async (req, res) => {
    const agent = await Agent.findById(req.params.id);

    if (agent) {
        agent.name = req.body.name || agent.name;
        agent.email = req.body.email || agent.email;
        agent.mobile = req.body.mobile || agent.mobile;

        if (req.body.password) {
            agent.password = req.body.password;
        }

        const updatedAgent = await agent.save();

        res.json({
            _id: updatedAgent._id,
            name: updatedAgent.name,
            email: updatedAgent.email,
            mobile: updatedAgent.mobile,
        });
    } else {
        res.status(404).json({ message: 'Agent not found' });
    }
};

// @desc    Delete agent
// @route   DELETE /api/agents/:id
// @access  Private/Admin
const deleteAgent = async (req, res) => {
    const agent = await Agent.findById(req.params.id);

    if (agent) {
        await Agent.deleteOne({ _id: req.params.id });
        res.json({ message: 'Agent removed' });
    } else {
        res.status(404).json({ message: 'Agent not found' });
    }
};

module.exports = { authAgent, registerAgent, getAgents, updateAgent, deleteAgent };
