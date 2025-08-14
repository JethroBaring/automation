'use client'

import React, { useState } from 'react';
import { User, Mail, Lock, LogIn, AlertCircle, CheckCircle } from 'lucide-react';

// Static user list for authentication
const USERS = [
  { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' },
  { id: 2, email: 'john@example.com', password: 'john123', name: 'John Doe', role: 'user' },
  { id: 3, email: 'jane@example.com', password: 'jane123', name: 'Jane Smith', role: 'user' },
  { id: 4, email: 'test@example.com', password: 'test123', name: 'Test User', role: 'user' },
];

export default function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [currentUser, setCurrentUser] = useState<typeof USERS[0] | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { email, password } = formData;

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Check credentials against static user list
    const user = USERS.find(u => u.email === email && u.password === password);

    if (user) {
      setCurrentUser(user);
      setFormData({ email: '', password: '' });
    } else {
      setError('Invalid email or password');
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setFormData({ email: '', password: '' });
    setError('');
  };

  // If user is logged in, show dashboard
  if (currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800" data-testid="welcome-title">
              Welcome Back!
            </h1>
            <p className="text-gray-600 mt-2">Login successful</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6" data-testid="user-info">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800" data-testid="user-name">
                  {currentUser.name}
                </h3>
                <p className="text-sm text-gray-600" data-testid="user-email">
                  {currentUser.email}
                </p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  currentUser.role === 'admin' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`} data-testid="user-role">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            data-testid="logout-btn"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  // Login form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800" data-testid="login-title">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Please sign in to your account.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-center space-x-2" data-testid="error-message">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" data-testid="login-form">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter your email"
                data-testid="email-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter your password"
                data-testid="password-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            data-testid="login-btn"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center mb-4">Demo Credentials:</p>
          <div className="space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>admin@example.com</span>
              <span>admin123</span>
            </div>
            <div className="flex justify-between">
              <span>test@example.com</span>
              <span>test123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}