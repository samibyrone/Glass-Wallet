import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface UseUserResult {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

export const useUser = (): UseUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    const fetchUser = async () => {
      setLoading(true);
      try {
        // In a real application, you would fetch user data from an API
        // For now, we'll use a mock user
        const mockUser: User = {
          id: '123',
          name: 'Test User',
          email: 'test@example.com',
          isAdmin: true, // Set to true for testing admin features
        };
        setUser(mockUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    // Simulate logout
    setUser(null);
    console.log('User logged out');
    // In a real application, you would clear authentication tokens/cookies
    // and redirect to login page
  };

  return { user, loading, logout };
};
