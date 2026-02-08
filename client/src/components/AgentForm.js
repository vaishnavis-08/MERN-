'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AgentForm({ initialData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '', password: '' });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                mobile: initialData.mobile,
                password: ''
            });
        } else {
            setFormData({ name: '', email: '', mobile: '', password: '' });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 animate-scale-in">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{initialData ? 'Edit Agent' : 'Add New Agent'}</h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white input-primary outline-none" required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white input-primary outline-none" required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                        <input
                            type="text"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white input-primary outline-none" required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password {initialData && '(Leave blank to keep current)'}</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white input-primary outline-none"
                            required={!initialData}
                        />
                    </div>
                    <div className="flex justify-end space-x-3 mt-8">
                        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2.5 btn-primary rounded-lg font-medium">
                            {initialData ? 'Update Agent' : 'Create Agent'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
