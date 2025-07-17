"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Wallet,
  Plus,
  Send,
  Download,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const walletData = {
    user: {
      name: "John Doe",
      email: "john.doe@enum.com",
      uniqueId: "ENUM_001_GLASS_ABC123",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    balances: {
      fiat: {
        amount: 2450.0,
        currency: "USD",
        symbol: "$",
      },
      crypto: {
        amount: 5.2,
        currency: "SUI",
        symbol: "SUI",
        usdValue: 1040.0,
      },
    },
    totalValue: 3490.0,
  }

  const recentTransactions = [
    {
      id: "TXN001",
      type: "deposit",
      method: "card",
      amount: 500.0,
      currency: "USD",
      status: "completed",
      timestamp: "2024-01-17T10:30:00Z",
      description: "Card deposit",
    },
    {
      id: "TXN002",
      type: "transfer",
      method: "p2p",
      amount: 0.5,
      currency: "SUI",
      status: "completed",
      timestamp: "2024-01-17T09:15:00Z",
      description: "Transfer to Jane Smith",
      recipient: "jane.smith@enum.com",
    },
    {
      id: "TXN003",
      type: "withdrawal",
      method: "bank",
      amount: 200.0,
      currency: "USD",
      status: "pending",
      timestamp: "2024-01-17T08:45:00Z",
      description: "Bank withdrawal",
    },
    {
      id: "TXN004",
      type: "deposit",
      method: "external",
      amount: 1.2,
      currency: "SUI",
      status: "completed",
      timestamp: "2024-01-16T16:20:00Z",
      description: "External wallet deposit",
    },
  ]

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTransactionIcon = (type: string, status: string) => {
    if (status === "pending") return <Clock className="h-4 w-4 text-yellow-600" />
    if (status === "failed") return <XCircle className="h-4 w-4 text-red-600" />

    switch (type) {
      case "deposit":
        return <ArrowDownRight className="h-4 w-4 text-green-600" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case "transfer":
        return <Send className="h-4 w-4 text-blue-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xl font-bold text-slate-900">Glass Wallet</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={walletData.user.avatar || "/placeholder.svg"} alt={walletData.user.name} />
                <AvatarFallback>
                  {walletData.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">{walletData.user.name}</p>
                <p className="text-xs text-slate-500">{walletData.user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Wallet Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Total Balance */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Wallet className="h-5 w-5" />
                      <span>Total Balance</span>
                    </CardTitle>
                    <CardDescription>Your combined wallet value</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-slate-900">
                      {showBalance ? `$${walletData.totalValue.toLocaleString()}` : "••••••"}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Total USD Value</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-slate-600">Fiat Balance</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {showBalance ? `$${walletData.balances.fiat.amount.toLocaleString()}` : "••••••"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Crypto Balance</p>
                      <p className="text-xl font-semibold text-slate-900">
                        {showBalance ? `${walletData.balances.crypto.amount} SUI` : "••••••"}
                      </p>
                      <p className="text-sm text-slate-500">
                        {showBalance ? `≈ $${walletData.balances.crypto.usdValue.toLocaleString()}` : "••••••"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common wallet operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/wallet/fund">
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Fund Wallet
                  </Button>
                </Link>
                <Link href="/wallet/send">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Send className="h-4 w-4 mr-2" />
                    Send Money
                  </Button>
                </Link>
                <Link href="/wallet/withdraw">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Withdraw
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Balance
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Detailed View */}
          <Card>
            <CardHeader>
              <CardTitle>Wallet Details</CardTitle>
              <CardDescription>Detailed view of your wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Account Information</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-slate-600">Full Name</p>
                          <p className="font-medium text-slate-900">{walletData.user.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Email Address</p>
                          <p className="font-medium text-slate-900">{walletData.user.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Unique Wallet ID</p>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded font-mono">
                            {walletData.user.uniqueId}
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900">Wallet Status</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">KYC Status</span>
                          <Badge className="bg-green-100 text-green-800">Verified</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Wallet Status</span>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">2FA Enabled</span>
                          <Badge className="bg-green-100 text-green-800">Yes</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="transactions" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
                      <Link href="/wallet/transactions">
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-3">
                      {recentTransactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-2 rounded-full bg-slate-100">
                              {getTransactionIcon(transaction.type, transaction.status)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 capitalize">{transaction.description}</p>
                              <p className="text-sm text-slate-500">{formatDate(transaction.timestamp)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-slate-900">
                              {transaction.type === "withdrawal" ? "-" : "+"}
                              {transaction.currency === "USD" ? "$" : ""}
                              {transaction.amount.toLocaleString()}
                              {transaction.currency !== "USD" ? ` ${transaction.currency}` : ""}
                            </p>
                            <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">Two-Factor Authentication</p>
                            <p className="text-sm text-slate-500">Add an extra layer of security</p>
                          </div>
                          <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">Transaction Notifications</p>
                            <p className="text-sm text-slate-500">Get notified of all transactions</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">Default Currency</p>
                            <p className="text-sm text-slate-500">Your preferred display currency</p>
                          </div>
                          <Button variant="outline" size="sm">
                            USD
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">Transaction Limits</p>
                            <p className="text-sm text-slate-500">Daily and monthly limits</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
