"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppShell } from "@/components/Layout/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Wallet,
  Bitcoin,
  Copy,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface BankDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  routingNumber: string;
}

interface FiatWithdrawalPayload {
  senderId: string | null;
  companyId: string;
  amount: number;
  bankDetails: BankDetails;
}

interface CryptoWithdrawalPayload {
  senderId: string | null;
  companyId: string;
  amount: number;
  recipientAddress: string;
}

export default function WithdrawWalletPage() {
  const [currencyType, setCurrencyType] = useState<"fiat" | "crypto">("fiat");
  const [fiatMethod, setFiatMethod] = useState<"transfer">("transfer");
  const [cryptoMethod, setCryptoMethod] = useState<"external">("external");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountName: "",
    accountNumber: "",
    bankName: "",
    routingNumber: ""
  });

  const [cryptoDetails, setCryptoDetails] = useState({
    walletAddress: "",
    network: "Sui Network"
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdraw = async () => {
    setLoading(true);
    const senderId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    const companyId = "your-company-uuid-here"; // Replace with actual company ID

    if (!senderId) {
      toast({
        title: "Error",
        description: "User ID not found. Please log in again.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    let endpoint = "";
    let payload: FiatWithdrawalPayload | CryptoWithdrawalPayload;

    if (currencyType === "fiat") {
      endpoint = "https://glass-wallet.onrender.com/api/wallets/withdraw/fiat";
      payload = {
        senderId,
        companyId,
        amount: parseFloat(amount),
        bankDetails
      };
    } else {
      endpoint = "https://glass-wallet.onrender.com/api/wallets/withdraw/sui";
      payload = {
        senderId,
        companyId,
        amount: parseFloat(amount),
        recipientAddress: cryptoDetails.walletAddress
      };
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Withdrawal Successful",
          description:
            data.message || "Your withdrawal has been initiated successfully!"
        });
        setStep(step + 1);
      } else {
        toast({
          title: "Withdrawal Failed",
          description:
            data.message || "Failed to process withdrawal. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast({
        title: "Error",
        description:
          "An unexpected error occurred during withdrawal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 2) {
      handleWithdraw();
    } else {
      setStep(step + 1);
    }
  };
  const prevStep = () => setStep(step - 1);

  return (
    <AppShell>
      <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        <header className='bg-white shadow-sm border-b'>
          <div className='container mx-auto px-6 py-4'>
            <div className='flex items-center space-x-4'>
              <Link
                href='/wallet'
                className='flex items-center text-slate-600 hover:text-slate-900 transition-colors'
              >
                <ArrowLeft className='h-4 w-4 mr-2' />
                Back to Wallet
              </Link>
              <Separator orientation='vertical' className='h-6' />
              <div className='flex items-center space-x-2'>
                <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>E</span>
                </div>
                <span className='text-xl font-bold text-slate-900'>
                  Glass Wallet
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className='container mx-auto px-6 py-8'>
          <div className='max-w-2xl mx-auto'>
            <div className='mb-8'>
              <div className='flex items-center justify-center space-x-4'>
                <div
                  className={`flex items-center space-x-2 ${
                    step >= 1 ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 1
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    1
                  </div>
                  <span className='text-sm font-medium'>Choose Method</span>
                </div>
                <div
                  className={`w-12 h-1 ${
                    step >= 2 ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`flex items-center space-x-2 ${
                    step >= 2 ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 2
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    2
                  </div>
                  <span className='text-sm font-medium'>Enter Details</span>
                </div>
                <div
                  className={`w-12 h-1 ${
                    step >= 3 ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`flex items-center space-x-2 ${
                    step >= 3 ? "text-blue-600" : "text-slate-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= 3
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    3
                  </div>
                  <span className='text-sm font-medium'>Confirm</span>
                </div>
              </div>
            </div>

            <Card className='shadow-xl border-0'>
              <CardHeader className='text-center'>
                <CardTitle className='text-2xl font-bold'>
                  Withdraw from Wallet
                </CardTitle>
                <CardDescription>
                  Move money from your Glass Wallet to an external account
                </CardDescription>
              </CardHeader>

              <CardContent className='space-y-6'>
                {step === 1 && (
                  <div className='space-y-6'>
                    <div className='space-y-4'>
                      <Label className='text-base font-semibold'>
                        Choose Currency Type
                      </Label>
                      <RadioGroup
                        value={currencyType}
                        onValueChange={(value: "fiat" | "crypto") =>
                          setCurrencyType(value)
                        }
                      >
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <RadioGroupItem
                              value='fiat'
                              id='fiat'
                              className='peer sr-only'
                            />
                            <Label
                              htmlFor='fiat'
                              className='flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-blue-200 hover:font-semibold peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer'
                            >
                              <Building2 className='mb-3 h-10 w-10 ' />
                              <span className='font-semibold text-xl'>
                                Fiat Currency
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                USD, EUR, NGN, GBP etc.
                              </span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value='crypto'
                              id='crypto'
                              className='peer sr-only'
                            />
                            <Label
                              htmlFor='crypto'
                              className='flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-blue-200 hover:font-semibold peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer'
                            >
                              <Bitcoin className='mb-3 h-10 w-10' />
                              <span className='font-semibold text-xl'>
                                Cryptocurrency
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                SUI, BTC, ETH
                              </span>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    {currencyType === "fiat" && (
                      <div className='space-y-4'>
                        <Label className='text-base font-semibold'>
                          Choose Withdrawal Method
                        </Label>
                        <RadioGroup
                          value={fiatMethod}
                          onValueChange={(value: "transfer") =>
                            setFiatMethod(value)
                          }
                        >
                          <div className='space-y-3'>
                            <div>
                              <RadioGroupItem
                                value='transfer'
                                id='transfer'
                                className='peer sr-only'
                              />
                              <Label
                                htmlFor='transfer'
                                className='flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-green-200 hover:font-semibold peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer'
                              >
                                <Building2 className='h-8 w-8 mb-5' />
                                <div>
                                  <span className='font-semibold ml-15'>
                                    Bank Transfer
                                  </span>
                                  <p className='text-sm text-muted-foreground'>
                                    Transfer to your bank account
                                  </p>
                                </div>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {currencyType === "crypto" && (
                      <div className='space-y-4'>
                        <Label className='text-base font-medium'>
                          Choose Withdrawal Method
                        </Label>
                        <RadioGroup
                          value={cryptoMethod}
                          onValueChange={(value: "external") =>
                            setCryptoMethod(value)
                          }
                        >
                          <div className='space-y-3'>
                            <div>
                              <RadioGroupItem
                                value='external'
                                id='external'
                                className='peer sr-only'
                              />
                              <Label
                                htmlFor='external'
                                className='flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer'
                              >
                                <Wallet className='h-6 w-6' />
                                <div>
                                  <span className='font-medium'>
                                    External Wallet
                                  </span>
                                  <p className='text-sm text-muted-foreground'>
                                    Transfer to another wallet
                                  </p>
                                </div>
                              </Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className='space-y-6'>
                    {currencyType === "fiat" && (
                      <div className='space-y-4'>
                        <div className='flex items-center space-x-2 mb-4'>
                          <Building2 className='h-5 w-5 text-blue-600' />
                          <h3 className='text-lg font-semibold'>
                            Bank Account Details
                          </h3>
                        </div>

                        <div className='space-y-4'>
                          <div>
                            <Label htmlFor='amount'>Amount (USD)</Label>
                            <Input
                              id='amount'
                              type='number'
                              placeholder='0.00'
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>

                          <div>
                            <Label htmlFor='accountName'>Account Name</Label>
                            <Input
                              id='accountName'
                              placeholder='John Doe'
                              value={bankDetails.accountName}
                              onChange={(e) =>
                                setBankDetails({
                                  ...bankDetails,
                                  accountName: e.target.value
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor='accountNumber'>
                              Account Number
                            </Label>
                            <Input
                              id='accountNumber'
                              placeholder='1234567890'
                              value={bankDetails.accountNumber}
                              onChange={(e) =>
                                setBankDetails({
                                  ...bankDetails,
                                  accountNumber: e.target.value
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor='bankName'>Bank Name</Label>
                            <Input
                              id='bankName'
                              placeholder='First National Bank'
                              value={bankDetails.bankName}
                              onChange={(e) =>
                                setBankDetails({
                                  ...bankDetails,
                                  bankName: e.target.value
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor='routingNumber'>
                              Routing Number
                            </Label>
                            <Input
                              id='routingNumber'
                              placeholder='021000021'
                              value={bankDetails.routingNumber}
                              onChange={(e) =>
                                setBankDetails({
                                  ...bankDetails,
                                  routingNumber: e.target.value
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {currencyType === "crypto" && (
                      <div className='space-y-4'>
                        <div className='flex items-center space-x-2 mb-4'>
                          <Wallet className='h-5 w-5 text-blue-600' />
                          <h3 className='text-lg font-semibold'>
                            External Wallet Details
                          </h3>
                        </div>

                        <div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
                          <div className='flex items-start space-x-2'>
                            <AlertCircle className='h-5 w-5 text-orange-600 mt-0.5' />
                            <div>
                              <p className='text-sm font-medium text-orange-900'>
                                Important
                              </p>
                              <p className='text-sm text-orange-700 mt-1'>
                                Ensure the address is correct. Sending to the
                                wrong address may result in permanent loss.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className='space-y-4'>
                          <div>
                            <Label htmlFor='walletAddress'>
                              Wallet Address
                            </Label>
                            <Input
                              id='walletAddress'
                              placeholder='0x...'
                              value={cryptoDetails.walletAddress}
                              onChange={(e) =>
                                setCryptoDetails({
                                  ...cryptoDetails,
                                  walletAddress: e.target.value
                                })
                              }
                            />
                          </div>

                          <div>
                            <Label htmlFor='network'>Network</Label>
                            <Input
                              id='network'
                              placeholder='Sui Network'
                              value={cryptoDetails.network}
                              disabled
                            />
                          </div>
                        </div>

                        <div className='space-y-2'>
                          <Label htmlFor='amountCrypto'>Amount (SUI)</Label>
                          <Input
                            id='amountCrypto'
                            type='number'
                            placeholder='0.00'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className='space-y-6'>
                    <div className='text-center'>
                      <CheckCircle className='h-16 w-16 text-green-600 mx-auto mb-4' />
                      <h3 className='text-xl font-semibold text-slate-900 mb-2'>
                        Withdrawal Request Submitted
                      </h3>
                      <p className='text-slate-600'>
                        Your withdrawal request has been processed. You will
                        receive a confirmation once the transaction is complete.
                      </p>
                    </div>

                    <div className='bg-slate-50 p-4 rounded-lg'>
                      <h4 className='font-medium text-slate-900 mb-3'>
                        Transaction Summary
                      </h4>
                      <div className='space-y-2 text-sm'>
                        <div className='flex justify-between'>
                          <span className='text-slate-600'>Currency Type:</span>
                          <span className='font-medium capitalize'>
                            {currencyType}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-slate-600'>Method:</span>
                          <span className='font-medium capitalize'>
                            {currencyType === "fiat"
                              ? fiatMethod
                              : cryptoMethod}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-slate-600'>Status:</span>
                          <Badge className='bg-yellow-100 text-yellow-800'>
                            Processing
                          </Badge>
                        </div>
                        {amount && (
                          <div className='flex justify-between'>
                            <span className='text-slate-600'>Amount:</span>
                            <span className='font-medium'>
                              {amount} {currencyType === "fiat" ? "USD" : "SUI"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className='flex justify-between pt-6'>
                  {step > 1 && step < 3 && (
                    <Button
                      variant='outline'
                      onClick={prevStep}
                      disabled={loading}
                    >
                      Previous
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      onClick={nextStep}
                      className={step === 1 ? "w-full" : "ml-auto"}
                      disabled={loading}
                    >
                      {step === 2 ? "Submit" : "Continue"}
                    </Button>
                  ) : (
                    <Link href='/wallet' className='w-full'>
                      <Button className='w-full'>Return to Wallet</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
