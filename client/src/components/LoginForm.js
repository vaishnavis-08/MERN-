'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (!res.success) {
            setError(res.message);
        }
    };

    return (
        <div className="glass-panel p-8 rounded-xl w-full max-w-md animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Admin Login</h2>
            <p className="text-center text-gray-500 mb-8">Welcome back! Please enter your details.</p>
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-100 mb-4 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white input-primary outline-none"
                        placeholder="admin@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white input-primary outline-none"
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg font-semibold btn-primary mt-2"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
