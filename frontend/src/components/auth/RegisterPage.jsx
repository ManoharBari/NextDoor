import React, { useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, MapPin, CheckCircle, Upload, X, UserCog, Loader2 } from 'lucide-react';
import UserContext from '../../context/auth/userContext';
import { Link } from 'react-router-dom';
import { openDialog } from 'uploadcare-widget';

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: '',
    role: 'client',
    avatar: null
  });

  const [loading, setloading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { register } = useContext(UserContext);

  const handlePasswordChange = (password) => {
    // Simple password strength calculator
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
    setFormData({ ...formData, password });
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200';
    if (passwordStrength === 1) return 'bg-red-500';
    if (passwordStrength === 2) return 'bg-yellow-500';
    if (passwordStrength === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      await register(formData);
      setloading(false)
    } catch (error) {
      setloading(false)
    }
  };

  const handleAvatarUpload = () => {
    openDialog({}, {
      publicKey: 'ff51bb6991fd3e18caf0',
      imagesOnly: true
    }).done((file) => {
      file.promise().then((fileInfo) => {
        setFormData({ ...formData, avatar: fileInfo.cdnUrl });
        setAvatarPreview(fileInfo.cdnUrl);
      });
    });
  };

  const removeAvatar = () => {
    setFormData({ ...formData, avatar: null });
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Image */}
        <div className="md:w-1/2 relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-indigo-700/90" />
          <div className="absolute inset-0 flex flex-col justify-center items-center p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community</h2>
              <p className="text-blue-100 text-lg mb-8">
                Connect with trusted service providers and clients.
              </p>
              <div className="space-y-4">
                {[
                  'Access to verified professionals',
                  'Secure payment system',
                  'Real-time booking and scheduling',
                  'Verified reviews and ratings'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
                    <span className="text-white">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Create Your Account</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <>
              {/* Avatar Upload */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  {avatarPreview ? (
                    <div className="relative">
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                      />
                      <button
                        type="button"
                        onClick={removeAvatar}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={handleAvatarUpload}
                      className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center cursor-pointer border-4 border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      <Upload className="w-8 h-8 text-blue-500" />
                    </div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                    className="hidden"
                    name='avatar'
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAvatarUpload}
                  className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  {avatarPreview ? 'Change Photo' : 'Upload Profile Photo'}
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  Max size: 5MB (JPG, PNG, GIF)
                </p>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="name"
                    type="text"
                    required
                    name='name'
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div className="mt-2">
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength / 4) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {passwordStrength === 0 && "Enter a password"}
                    {passwordStrength === 1 && "Weak password"}
                    {passwordStrength === 2 && "Fair password"}
                    {passwordStrength === 3 && "Good password"}
                    {passwordStrength === 4 && "Strong password"}
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="location"
                    type="text"
                    required
                    name='location'
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="pl-10 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="123 Main St, City"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'client' })}
                    className={`py-3 px-4 rounded-lg border ${formData.role === 'client'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } transition-colors flex items-center justify-center gap-2`}
                  >
                    <User className="w-5 h-5" />
                    <span>Client</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'provider' })}
                    className={`py-3 px-4 rounded-lg border ${formData.role === 'provider'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } transition-colors flex items-center justify-center gap-2`}
                  >
                    <UserCog className="w-5 h-5" />
                    <span>Service Provider</span>
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"

                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {loading ? <span className='flex gap-2 items-center justify-center'>Please Wait <Loader2 className="animate-spin w-5 h-5 mr-2" /></span> : <span>Create Account</span>}

              </motion.button>
            </>


            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}