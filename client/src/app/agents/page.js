'use client';

import { useState, useEffect } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Plus } from 'lucide-react';
import AgentForm from '../../components/AgentForm';

export default function AgentsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentAgent, setCurrentAgent] = useState(null);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/login');
            } else {
                fetchAgents();
            }
        }
    }, [user, authLoading, router]);

    const fetchAgents = async () => {
        try {
            const { data } = await api.get('/agents');
            setAgents(data);
        } catch (error) {
            console.error('Error fetching agents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (currentAgent) {
                // Update
                const { _id } = currentAgent;
                const updateData = { ...formData };
                if (!updateData.password) delete updateData.password; // Don't send empty password
                await api.put(`/agents/${_id}`, updateData);
            } else {
                // Create
                await api.post('/agents/register', formData);
            }
            setIsModalOpen(false);
            fetchAgents();
        } catch (err) {
            alert(err.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this agent?')) {
            try {
                await api.delete(`/agents/${id}`);
                fetchAgents();
            } catch (err) {
                alert(err.response?.data?.message || 'Delete failed');
            }
        }
    };

    const openModal = (agent = null) => {
        setCurrentAgent(agent);
        setIsModalOpen(true);
    };

    if (authLoading || loading) return <div>Loading...</div>;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Agents</h1>
                    <p className="text-gray-500 mt-1">Add, edit, or remove agents from the system.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="btn-primary px-6 py-2.5 rounded-lg flex items-center space-x-2 font-medium"
                >
                    <Plus size={20} />
                    <span>Add New Agent</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {agents.map((agent) => (
                            <tr key={agent._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{agent.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{agent.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{agent.mobile}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                    <button onClick={() => openModal(agent)} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(agent._id)} className="text-red-400 hover:text-red-700 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {agents.length === 0 && <div className="p-12 text-center text-gray-500">No agents found. Click "Add New Agent" to get started.</div>}
            </div>

            {isModalOpen && (
                <AgentForm
                    initialData={currentAgent}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
