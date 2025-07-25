"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { AppShell } from "@/components/Layout/sidebar";

export default function WalletPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(
    () => {
      const fetchBalance = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            "https://glass-wallet.onrender.com/api/wallets/balances"
          );
          if (!response.ok) {
            throw new Error("Failed to fetch balance");
          }
          const data = await response.json();
          setBalance(data.balance);
          toast({
            title: "Balance Loaded",
            description: "Your wallet balance has been successfully loaded."
          });
        } catch (error) {
          console.error("Error fetching balance:", error);
          toast({
            title: "Error",
            description:
              "Failed to load wallet balance. Please try again later.",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      };

      fetchBalance();
    },
    [toast]
  );

  const handleFundWallet = () => {
    router.push("/wallet/fund");
  };

  const handleWithdraw = () => {
    router.push("/wallet/withdraw");
  };

  const handleWithdrawSui = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://glass-wallet.onrender.com/api/wallets/withdraw/sui",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            senderId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            companyId: "f0e1d2c3-b4a5-6789-0123-456789abcdef",
            amount: 100.5,
            reference: "SUI_WITHDRAWAL_REF_123"
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to withdraw SUI");
      }

      const data = await response.json();
      toast({
        title: "SUI Withdrawal Successful",
        description: `Successfully withdrew ${data.amount} SUI. Reference: ${data.reference}.`
      });
    } catch (error) {
      console.error("Error withdrawing SUI:", error);
      let errorMessage = "An error occurred during SUI withdrawal.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "SUI Withdrawal Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawFiat = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://glass-wallet.onrender.com/api/wallets/withdraw/fiat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            senderId: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            companyId: "f0e1d2c3-b4a5-6789-0123-456789abcdef",
            amount: 100.5,
            reference: "WITHDRAWAL_REF_123"
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to withdraw fiat");
      }

      const data = await response.json();
      toast({
        title: "Withdrawal Successful",
        description: `Successfully withdrew ${data.amount}. Reference: ${data.reference}.`
      });
    } catch (error) {
      console.error("Error withdrawing fiat:", error);
      let errorMessage = "An error occurred during withdrawal.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Withdrawal Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="container mx-auto p-4 m-20">
        <h1 className="text-3xl font-bold mb-20">Your Wallet</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-20">Current Balance</h2>
            {loading
              ? <p>Loading...</p>
              : <p className="text-2xl font-bold">
                  ${balance.toFixed(2)}
                </p>}
          </div>
          <Separator className="my-4" />
          <div className="flex space-x-4">
            <Button onClick={handleFundWallet} className="flex-1" variant="outline">
              Fund Wallet
            </Button>
            <Button onClick={handleWithdraw} variant="outline" className="flex-1">
              Withdraw
            </Button>
            <Button onClick={handleWithdrawFiat} className="flex-1" variant="outline">
              Withdraw Fiat
            </Button>
            <Button onClick={handleWithdrawSui} className="flex-1" variant="outline">
              Withdraw SUI
            </Button>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p>Transaction history will be displayed here.</p>
        </div>
      </div>
    </AppShell>
  );
}
