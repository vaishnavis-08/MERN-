'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function AgentDistributionTable({ agents }) {
    const [expandedAgentId, setExpandedAgentId] = useState(null);

    const toggleExpand = (agentId) => {
        setExpandedAgentId(expandedAgentId === agentId ? null : agentId);
    };

    if (!agents) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium">Agent Distribution</h3>
            </div>
            <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agent Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Assigned</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {agents.map((agent) => (
                                <>
                                    <tr
                                        key={agent._id}
                                        className="hover:bg-gray-50 cursor-pointer"
                                        onClick={() => toggleExpand(agent._id)}
                                    >
                                        <td className="px-6 py-4 text-gray-500">
                                            {expandedAgentId === agent._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{agent.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{agent.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{agent.itemCount}</td>
                                    </tr>
                                    {expandedAgentId === agent._id && (
                                        <tr>
                                            <td colSpan="4" className="bg-gray-50 px-6 py-4">
                                                <div className="text-sm font-medium text-gray-700 mb-2">Assigned Records:</div>
                                                {agent.items && agent.items.length > 0 ? (
                                                    <table className="min-w-full divide-y divide-gray-200 bg-white rounded border">
                                                        <thead>
                                                            <tr className="bg-gray-100">
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Phone</th>
                                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Notes</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {agent.items.map((item) => (
                                                                <tr key={item._id}>
                                                                    <td className="px-4 py-2 text-sm">{item.firstName}</td>
                                                                    <td className="px-4 py-2 text-sm">{item.phone}</td>
                                                                    <td className="px-4 py-2 text-sm">{item.notes}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <div className="text-gray-500 text-sm italic">No records assigned.</div>
                                                )}
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
