import { useState, useEffect } from 'react';

interface Balance {
  asset: string;
  amount: number;
}

interface UseWalletBalancesResult {
  balances: Balance[] | null;
  loading: boolean;
  error: string | null;
}

export const useWalletBalances = (): UseWalletBalancesResult => {
  const [balances, setBalances] = useState<Balance[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://glass-wallet.onrender.com/api/wallets/balances');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBalances(data);
      } catch (err) {
        console.error('Failed to fetch wallet balances:', err);
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch balances');
        } else {
          setError('An unknown error occurred');
        }
        setBalances(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  return { balances, loading, error };
};
