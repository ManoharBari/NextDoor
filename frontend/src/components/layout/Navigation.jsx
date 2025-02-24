import React, { useContext, useState } from 'react';
import { User, Bell } from 'lucide-react';
import { SignInDialog } from '../auth/SignInDialog';
import UserContext from '../../context/auth/userContext';
import { useNavigate } from 'react-router-dom';
import { Menu, Button, Text } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';

export function Navigation() {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useContext(UserContext);

  return (
    <>
      <nav className="flex items-center gap-4">
        {isAuthenticated && user.role == 'provider' && (
          <button
            onClick={() => navigate('/dashboard')}
            className=" bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Dashboard
          </button>)
        }

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>Toggle menu</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item leftSection={<IconSettings size={14} />}>
              Settings
            </Menu.Item>
            <Menu.Item leftSection={<IconMessageCircle size={14} />}>
              Messages
            </Menu.Item>
            <Menu.Item leftSection={<IconPhoto size={14} />}>
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={<IconSearch size={14} />}
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={<IconArrowsLeftRight size={14} />}
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={14} />}
            >
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <button className="p-2 hover:bg-gray-100 rounded-full relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {localStorage.getItem('token') ? (
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