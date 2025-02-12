import React, { useContext, useState } from 'react';
import { User, Bell } from 'lucide-react';
import { SignInDialog } from '../auth/SignInDialog';
import UserContext from '../../context/auth/userContext';

export function Navigation() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  
  const { user, isAuthenticated, signOut } = useContext(UserContext);

  return (
    <>
      <nav className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-8 h-8 rounded-full"
            />
            <button
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSignInOpen(true)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
          >
            <User className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        )}
      </nav>

      <SignInDialog
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  );
}