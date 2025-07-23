"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, TrendingUp, Activity, Plus, ArrowUpRight, ArrowDownRight, Eye, Settings, Bell } from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Volume",
      value: "$1,234,567",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Active Wallets",
      value: "1,923",
      change: "+15.3%",
      trend: "up",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "99.8%",
      change: "+0.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const recentTransactions = [
    {
      id: "TXN001",
      user: "john.daniel@enum.com",
      type: "Deposit",
      amount: "$500.00",
      currency: "USD",
      status: "completed",
      timestamp: "2 minutes ago",
    },
    {
      id: "TXN002",
      user: "samson.ibironke@enum.com",
      type: "Transfer",
      amount: "0.05 SUI",
      currency: "SUI",
      status: "completed",
      timestamp: "5 minutes ago",
    },
    {
      id: "TXN003",
      user: "chidinma.nwangwu@enum.com",
      type: "Withdrawal",
      amount: "$1,200.00",
      currency: "USD",
      status: "pending",
      timestamp: "8 minutes ago",
    },
    {
      id: "TXN004",
      user: "innah.emmanuel@enum.com",
      type: "Deposit",
      amount: "1.2 SUI",
      currency: "SUI",
      status: "completed",
      timestamp: "12 minutes ago",
    },
    {
      id: "TXN005",
      user: "idowu.timothy@enum.com",
      type: "Deposit",
      amount: "3.2 SUI",
      currency: "SUI",
      status: "completed",
      timestamp: "25 minutes ago",
    },
  ]

  const activeUsers = [
    {
      name: "John Daniel",
      email: "john.daniel@enum.com",
      balance: "$2,450.00",
      cryptoBalance: "5.2 SUI",
      status: "active",
      lastActivity: "2 minutes ago",
    },
    {
      name: "Samson Ibironke",
      email: "samson.ibironke@enum.com",
      balance: "$1,890.50",
      cryptoBalance: "3.8 SUI",
      status: "active",
      lastActivity: "5 minutes ago",
    },
    {
      name: "Nwangwu Chidinma",
      email: "nwangwu.chidinma@enum.com",
      balance: "$3,200.00",
      cryptoBalance: "8.1 SUI",
      status: "active",
      lastActivity: "8 minutes ago",
    },
  ]

  return (
    <div className="space-y-8 ml-20 mr-20 mt-10 mb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back to Glass Wallet</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" className="hover:bg-blue-400">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="hover:bg-blue-400">
            <Settings className="h-4 w-4" />
          </Button>
          <Link href="/dashboard/users/new">
            <Button className="hover:bg-green-400">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-slate-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-slate-500 ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest wallet activity from your users</CardDescription>
                </div>
                <Link href="/dashboard/transactions" className="hover:bg-green-300">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "Deposit"
                            ? "bg-green-100 text-green-600"
                            : transaction.type === "Withdrawal"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {transaction.type === "Deposit" ? (
                          <ArrowDownRight className="h-4 w-4" />
                        ) : transaction.type === "Withdrawal" ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <Activity className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{transaction.type}</p>
                        <p className="text-sm text-slate-500">{transaction.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-900">{transaction.amount}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant={transaction.status === "completed" ? "default" : "secondary"}>
                          {transaction.status}
                        </Badge>
                        <span className="text-xs text-slate-500">{transaction.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Users</CardTitle>
                  <CardDescription>Users with recent activity</CardDescription>
                </div>
                <Link href="/dashboard/users" className="hover:bg-green-300">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.lastActivity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900">{user.balance}</p>
                      <p className="text-xs text-slate-500">{user.cryptoBalance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/users/new" className="hover:bg-green-200">
              <Button variant="outline" className="h-20 flex-col space-y-2 w-full bg-transparent">
                <Users className="h-6 w-6" />
                <span>Add User</span>
              </Button>
            </Link>
            <Link href="/dashboard/transactions" className="hover:bg-amber-200">
              <Button variant="outline" className="h-20 flex-col space-y-2 w-full bg-transparent">
                <Activity className="h-6 w-6" />
                <span>View Transactions</span>
              </Button>
            </Link>
            <Link href="/dashboard/settings" className="hover:bg-neutral-400">
              <Button variant="outline" className="h-20 flex-col space-y-2 w-full bg-transparent">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </Link>
            <Link href="/dashboard/reports" className="hover:bg-amber-400">
              <Button variant="outline" className="h-20 flex-col space-y-2 w-full bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span>Reports</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
