'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center space-x-6">
                <h1 className="text-xl font-bold text-gray-800">CSTech Admin</h1>
                <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                <Link href="/agents" className="text-gray-600 hover:text-blue-600">Agents</Link>
                <Link href="/upload" className="text-gray-600 hover:text-blue-600">Upload</Link>
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Welcome, {user.email}</span>
                <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    );
}
