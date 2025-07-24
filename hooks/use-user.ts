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
  error: string | null; // Added error state
}

export const useUser = (): UseUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

      if (!userId) {
        console.error('User ID not found in localStorage.');
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://glass-wallet.onrender.com/api/wallets/profile/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        if (error instanceof Error) {
          setError(error.message || 'Failed to fetch user profile');
        } else {
          setError('An unknown error occurred');
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return { user, loading, logout, error };
};
