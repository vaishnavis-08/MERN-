'use client';

import { useState } from 'react';
import api from '../services/api';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function UploadForm() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
        setResult(null);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setError('');
        setResult(null);

        try {
            const { data } = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(data);
            setFile(null);
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Upload failed';
            const details = err.response?.data?.errors;
            if (details && Array.isArray(details)) {
                setError(details.join('\n'));
            } else {
                setError(msg);
            }
        } finally {
            setUploading(false);
        }
    };

    return (

        <div className="max-w-2xl mx-auto glass-panel p-8 rounded-xl mt-10 animate-fade-in">
            <h1 className="text-3xl font-bold mb-8 flex items-center space-x-3 text-gray-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Upload className="text-blue-600 h-6 w-6" />
                </div>
                <span>Upload Records</span>
            </h1>

            <div className="mb-8 p-5 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl text-sm">
                <p className="font-bold mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Instructions
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-1 opacity-90">
                    <li>Supported formats: <strong>.csv, .xlsx, .xls</strong></li>
                    <li>Required columns: <strong>FirstName, Phone, Notes</strong></li>
                    <li>Records will be automatically distributed among agents.</li>
                </ul>
            </div>

            <form onSubmit={handleUpload} className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-300 group">
                    <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileChange}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="cursor-pointer block">
                        <div className="mb-4 p-4 bg-gray-50 rounded-full inline-block group-hover:bg-white shadow-sm transition-all">
                            <FileText className="h-10 w-10 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <span className="block text-lg font-medium text-gray-700 group-hover:text-gray-900">
                            {file ? file.name : 'Click to select a file'}
                        </span>
                        <p className="text-gray-400 text-sm mt-2">or drag and drop here</p>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={!file || uploading}
                    className={`w-full py-3.5 rounded-lg text-white font-semibold shadow-lg transition-all ${!file || uploading
                        ? 'bg-gray-300 cursor-not-allowed shadow-none'
                        : 'btn-primary'
                        }`}
                >
                    {uploading ? 'Uploading & Processing...' : 'Upload & Distribute'}
                </button>
            </form>

            {/* Success Message */}
            {result && (
                <div className="mt-8 p-5 bg-green-50 border border-green-200 rounded-xl animate-slide-up">
                    <div className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <h3 className="text-base font-bold text-green-800">Upload Successful!</h3>
                            <div className="mt-2 text-sm text-green-700">
                                <p>{result.message}</p>
                                <p className="mt-2 font-mono text-xs bg-white/50 p-2 rounded border border-green-100">{result.distribution}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-8 p-5 bg-red-50 border border-red-200 rounded-xl animate-slide-up">
                    <div className="flex items-start">
                        <AlertCircle className="h-6 w-6 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                            <h3 className="text-base font-bold text-red-800">Upload Failed</h3>
                            <pre className="mt-2 text-sm text-red-700 whitespace-pre-wrap font-sans bg-white/50 p-2 rounded border border-red-100">{error}</pre>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
