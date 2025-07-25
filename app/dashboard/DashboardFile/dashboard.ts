import { DollarSign, Users, Activity, TrendingUp } from "lucide-react"

export const stats = [
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

export const recentTransactions = [
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

export const activeUsers = [
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
