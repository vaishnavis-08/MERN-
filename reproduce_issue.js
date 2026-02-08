const axios = require('axios');

const API_URL = 'http://localhost:5003/api';

async function reproduce() {
    try {
        // 1. Login as Admin
        console.log('Logging in as admin...');
        const loginRes = await axios.post(`${API_URL}/admin/login`, {
            email: 'admin@example.com',
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('Got token:', token);

        // 2. Register Agent
        console.log('Attempting to register agent...');
        const agentData = {
            name: 'vaishnavi',
            email: 'shettyvaishnavi697@gmail.com',
            mobile: '9632399239',
            password: 'password123'
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const res = await axios.post(`${API_URL}/agents/register`, agentData, config);
        console.log('Success!', res.data);

    } catch (error) {
        console.error('FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error.message);
        }
    }
}

reproduce();
