import React, { useContext, useState } from 'react';
import { User, Bell, LayoutDashboard, ShoppingBag, LogOut, Home, Wrench, ChevronRight } from 'lucide-react';
import { SignInDialog } from '../auth/SignInDialog';
import UserContext from '../../context/auth/userContext';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@mantine/core';
import { Group, Text } from '@mantine/core';
import { Avatar } from '@mantine/core';

export function Navigation() {
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useContext(UserContext);

  return (
    <>
      <nav className="flex items-center gap-4">
        {localStorage.getItem('token') ? (
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Group>
                <Avatar src={user?.profilePicture} radius="xl" />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500}>
                    {user?.name}
                  </Text>
                </div>
                <ChevronRight size={14} />
              </Group>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => navigate('/')} leftSection={<Home size={14} />}>
                Home
              </Menu.Item>

              <Menu.Item onClick={() => navigate('/')} leftSection={<Wrench size={14} />}>
                Services
              </Menu.Item>

              {isAuthenticated && user.role == 'provider' && (
                <Menu.Item onClick={() => navigate('/dashboard')} leftSection={<LayoutDashboard size={14} />}>
                  Dashboard
                </Menu.Item>)
              }

              <Menu.Item leftSection={<Bell size={14} />}>
                Notification
              </Menu.Item>

              <Menu.Item onClick={() => navigate('/orders')} leftSection={<ShoppingBag size={14} />}>
                My Orders
              </Menu.Item>

              <Menu.Divider />
              <Menu.Item
                onClick={signOut}
                color="red"
                leftSection={<LogOut size={14} />}>
                Log Out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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