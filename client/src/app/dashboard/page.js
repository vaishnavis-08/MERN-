'use client';

import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import AgentDistributionTable from '../../components/AgentDistributionTable';

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/login');
            } else {
                fetchStats();
            }
        }
    }, [user, authLoading, router]);

    const fetchStats = async () => {
        try {
            // For now, we'll just fetch grouped items to show some data
            const { data } = await api.get('/items/grouped');
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) return <div>Loading...</div>;
    if (!user) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Agents</h3>
                    <div className="flex items-baseline mt-4">
                        <p className="text-4xl font-extrabold text-blue-600">{stats ? stats.length : 0}</p>
                        <span className="ml-2 text-sm text-gray-400">active</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Items</h3>
                    <div className="flex items-baseline mt-4">
                        <p className="text-4xl font-extrabold text-indigo-600">
                            {stats ? stats.reduce((acc, curr) => acc + curr.itemCount, 0) : 0}
                        </p>
                        <span className="ml-2 text-sm text-gray-400">distributed</span>
                    </div>
                </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <AgentDistributionTable agents={stats} />
            </div>
        </div>
    );
}
