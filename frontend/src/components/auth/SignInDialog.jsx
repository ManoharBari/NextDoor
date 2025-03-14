import React, { useContext, useState } from 'react';
import { Lock, Mail, X } from 'lucide-react';
import UserContext from '../../context/auth/userContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export function SignInDialog({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false)
  const { signIn } = useContext(UserContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      await signIn(email, password);
      setEmail('');
      setPassword('');
      onClose();
    } catch (error) {
      toast.error('Sign in failed');
      setloading(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                required
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                required
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : 'Login'}
          </button>
          <span className="block text-center text-sm text-gray-600 mt-2">Don't have an account?
            <Link className='font-semibold text-blue-700 hover:underline' onClick={onClose} to='/register'> Register here</Link></span>
        </form>
      </div>
    </div >
  );
}
