"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Building2, Wallet, Bitcoin, Copy, CheckCircle, AlertCircle, Info } from "lucide-react"

export default function FundWalletPage() {
  const [currencyType, setCurrencyType] = useState<"fiat" | "crypto">("fiat")
  const [fiatMethod, setFiatMethod] = useState<"card" | "transfer">("card")
  const [cryptoMethod, setCryptoMethod] = useState<"onramp" | "external">("onramp")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState(1)
  const [copied, setCopied] = useState(false)

  const bankAccount = {
    accountName: "Glass Wallet Pool Account",
    accountNumber: "1234567890",
    bankName: "First National Bank",
    routingNumber: "021000021",
    reference: "ENUM_001_GLASS_ABC123",
  }

  const cryptoWallet = {
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    network: "Sui Network",
    memo: "ENUM_001_GLASS_ABC123",
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/wallet" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wallet
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-slate-900">Glass Wallet</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center space-x-2 ${step >= 1 ? "text-blue-600" : "text-slate-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  1
                </div>
                <span className="text-sm font-medium">Choose Method</span>
              </div>
              <div className={`w-12 h-1 ${step >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
              <div className={`flex items-center space-x-2 ${step >= 2 ? "text-blue-600" : "text-slate-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  2
                </div>
                <span className="text-sm font-medium">Enter Details</span>
              </div>
              <div className={`w-12 h-1 ${step >= 3 ? "bg-blue-600" : "bg-slate-200"}`} />
              <div className={`flex items-center space-x-2 ${step >= 3 ? "text-blue-600" : "text-slate-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= 3 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  3
                </div>
                <span className="text-sm font-medium">Confirm</span>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Fund Your Wallet</CardTitle>
              <CardDescription>Add money to your Glass Wallet to start transacting</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Currency Type Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Choose Currency Type</Label>
                    <RadioGroup
                      value={currencyType}
                      onValueChange={(value: "fiat" | "crypto") => setCurrencyType(value)}
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <RadioGroupItem value="fiat" id="fiat" className="peer sr-only" />
                          <Label
                            htmlFor="fiat"
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <Building2 className="mb-3 h-8 w-8" />
                            <span className="font-medium">Fiat Currency</span>
                            <span className="text-sm text-muted-foreground">USD, EUR, etc.</span>
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="crypto" id="crypto" className="peer sr-only" />
                          <Label
                            htmlFor="crypto"
                            className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                          >
                            <Bitcoin className="mb-3 h-8 w-8" />
                            <span className="font-medium">Cryptocurrency</span>
                            <span className="text-sm text-muted-foreground">SUI, BTC, ETH</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Method Selection */}
                  {currencyType === "fiat" && (
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Choose Funding Method</Label>
                      <RadioGroup
                        value={fiatMethod}
                        onValueChange={(value: "card" | "transfer") => setFiatMethod(value)}
                      >
                        <div className="space-y-3">
                          <div>
                            <RadioGroupItem value="card" id="card" className="peer sr-only" />
                            <Label
                              htmlFor="card"
                              className="flex items-center space-x-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <CreditCard className="h-6 w-6" />
                              <div>
                                <span className="font-medium">Credit/Debit Card</span>
                                <p className="text-sm text-muted-foreground">Instant funding with your card</p>
                              </div>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="transfer" id="transfer" className="peer sr-only" />
                            <Label
                              htmlFor="transfer"
                              className="flex items-center space-x-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Building2 className="h-6 w-6" />
                              <div>
                                <span className="font-medium">Bank Transfer</span>
                                <p className="text-sm text-muted-foreground">Transfer from your bank account</p>
                              </div>
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {currencyType === "crypto" && (
                    <div className="space-y-4">
                      <Label className="text-base font-medium">Choose Funding Method</Label>
                      <RadioGroup
                        value={cryptoMethod}
                        onValueChange={(value: "onramp" | "external") => setCryptoMethod(value)}
                      >
                        <div className="space-y-3">
                          <div>
                            <RadioGroupItem value="onramp" id="onramp" className="peer sr-only" />
                            <Label
                              htmlFor="onramp"
                              className="flex items-center space-x-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <CreditCard className="h-6 w-6" />
                              <div>
                                <span className="font-medium">Buy Crypto (On-ramp)</span>
                                <p className="text-sm text-muted-foreground">Purchase crypto with fiat currency</p>
                              </div>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem value="external" id="external" className="peer sr-only" />
                            <Label
                              htmlFor="external"
                              className="flex items-center space-x-4 rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                            >
                              <Wallet className="h-6 w-6" />
                              <div>
                                <span className="font-medium">External Wallet</span>
                                <p className="text-sm text-muted-foreground">Transfer from another wallet</p>
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
                <div className="space-y-6">
                  {/* Card Payment */}
                  {currencyType === "fiat" && fiatMethod === "card" && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Card Payment</h3>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="amount">Amount (USD)</Label>
                          <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                          <div>
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="12345" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bank Transfer */}
                  {currencyType === "fiat" && fiatMethod === "transfer" && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Building2 className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Bank Transfer Details</h3>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">Transfer Instructions</p>
                            <p className="text-sm text-blue-700 mt-1">
                              Use the account details below to transfer funds. Include your reference ID in the transfer
                              description.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-slate-600">Account Name</Label>
                            <div className="flex items-center justify-between mt-1">
                              <p className="font-medium">{bankAccount.accountName}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(bankAccount.accountName)}
                              >
                                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm text-slate-600">Account Number</Label>
                            <div className="flex items-center justify-between mt-1">
                              <p className="font-medium">{bankAccount.accountNumber}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(bankAccount.accountNumber)}
                              >
                                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm text-slate-600">Bank Name</Label>
                            <p className="font-medium mt-1">{bankAccount.bankName}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-slate-600">Routing Number</Label>
                            <div className="flex items-center justify-between mt-1">
                              <p className="font-medium">{bankAccount.routingNumber}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(bankAccount.routingNumber)}
                              >
                                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <Label className="text-sm text-slate-600">Reference ID (Required)</Label>
                          <div className="flex items-center justify-between mt-1">
                            <code className="text-sm bg-white px-2 py-1 rounded border font-mono">
                              {bankAccount.reference}
                            </code>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(bankAccount.reference)}>
                              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Crypto External Wallet */}
                  {currencyType === "crypto" && cryptoMethod === "external" && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Wallet className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">External Wallet Transfer</h3>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-orange-900">Important</p>
                            <p className="text-sm text-orange-700 mt-1">
                              Only send SUI tokens to this address. Sending other tokens may result in permanent loss.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
                        <div>
                          <Label className="text-sm text-slate-600">Wallet Address</Label>
                          <div className="flex items-center justify-between mt-1">
                            <code className="text-sm bg-white px-2 py-1 rounded border font-mono break-all">
                              {cryptoWallet.address}
                            </code>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(cryptoWallet.address)}>
                              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm text-slate-600">Network</Label>
                          <p className="font-medium mt-1">{cryptoWallet.network}</p>
                        </div>

                        <div>
                          <Label className="text-sm text-slate-600">Memo (Required)</Label>
                          <div className="flex items-center justify-between mt-1">
                            <code className="text-sm bg-white px-2 py-1 rounded border font-mono">
                              {cryptoWallet.memo}
                            </code>
                            <Button variant="ghost" size="sm" onClick={() => copyToClipboard(cryptoWallet.memo)}>
                              {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Funding Request Submitted</h3>
                    <p className="text-slate-600">
                      Your funding request has been processed. You will receive a confirmation once the transaction is
                      complete.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-3">Transaction Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Currency Type:</span>
                        <span className="font-medium capitalize">{currencyType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Method:</span>
                        <span className="font-medium capitalize">
                          {currencyType === "fiat" ? fiatMethod : cryptoMethod}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {step > 1 && step < 3 && (
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}

                {step < 3 ? (
                  <Button onClick={nextStep} className={step === 1 ? "w-full" : "ml-auto"}>
                    {step === 2 ? "Submit" : "Continue"}
                  </Button>
                ) : (
                  <Link href="/wallet" className="w-full">
                    <Button className="w-full">Return to Wallet</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
