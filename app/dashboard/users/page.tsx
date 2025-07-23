"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, MoreHorizontal, Eye, Edit, Trash2, Download, UserCheck, UserX } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const users = [
  {
    id: "USR001",
    name: "John Daniel",
    email: "john.daniel@enum.com",
    uniqueId: "ENUM_001_GLASS_ABC123",
    status: "active",
    kycStatus: "verified",
    fiatBalance: "$2,450.00",
    cryptoBalance: "5.2 SUI",
    lastActivity: "2 minutes ago",
    joinedDate: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: "USR002",
    name: "Idowu Timothy",
    email: "idowu.timothy@enum.com",
    uniqueId: "ENUM_002_GLASS_DEF456",
    status: "active",
    kycStatus: "verified",
    fiatBalance: "$1,890.50",
    cryptoBalance: "3.8 SUI",
    lastActivity: "5 minutes ago",
    joinedDate: "2024-01-12",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: "USR003",
    name: "Innah Emmanuel",
    email: "innah.emmanuel@enum.com",
    uniqueId: "ENUM_003_GLASS_GHI789",
    status: "suspended",
    kycStatus: "pending",
    fiatBalance: "$3,200.00",
    cryptoBalance: "8.1 SUI",
    lastActivity: "2 hours ago",
    joinedDate: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: "USR004",
    name: "Chidinma Nwangwu",
    email: "chidinma.nwangwu@enum.com",
    uniqueId: "ENUM_004_GLASS_JKL012",
    status: "active",
    kycStatus: "verified",
    fiatBalance: "$890.25",
    cryptoBalance: "2.1 SUI",
    lastActivity: "1 hour ago",
    joinedDate: "2024-01-08",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    id: "USR005",
    name: "Samson Ibironke",
    email: "samson.ibironke@enum.com",
    uniqueId: "ENUM_005_GLASS_MNO345",
    status: "inactive",
    kycStatus: "rejected",
    fiatBalance: "$0.00",
    cryptoBalance: "0.0 SUI",
    lastActivity: "3 days ago",
    joinedDate: "2024-01-05",
    avatar: "/placeholder.svg?height=40&width=40"
  }
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.uniqueId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className='space-y-6 ml-20 mr-20 mt-10 mb-20'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900'>User Management</h1>
          <p className='text-slate-600 mt-1'>
            Manage your platform users and their wallets
          </p>
        </div>
        <div className='flex items-center space-x-4'>
          <Button variant='outline' className='hover:bg-blue-400'>
            <Download className='h-4 w-4 mr-2' />
            Export
          </Button>
          <Link href='/dashboard/users/new'>
            <Button className='hover:bg-green-400'>
              <Plus className='h-4 w-4 mr-2' />
              Add User
            </Button>
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>
                  Total Users
                </p>
                <p className='text-2xl font-bold text-slate-900'>2,847</p>
              </div>
              <div className='p-3 rounded-full bg-blue-50 text-blue-600'>
                <UserCheck className='h-6 w-6' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>
                  Active Users
                </p>
                <p className='text-2xl font-bold text-slate-900'>2,234</p>
              </div>
              <div className='p-3 rounded-full bg-green-50 text-green-600'>
                <UserCheck className='h-6 w-6' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>
                  KYC Verified
                </p>
                <p className='text-2xl font-bold text-slate-900'>1,923</p>
              </div>
              <div className='p-3 rounded-full bg-purple-50 text-purple-600'>
                <UserCheck className='h-6 w-6' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-slate-600'>Suspended</p>
                <p className='text-2xl font-bold text-slate-900'>89</p>
              </div>
              <div className='p-3 rounded-full bg-red-50 text-red-600'>
                <UserX className='h-6 w-6' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users in your system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
                <Input
                  placeholder='Search users...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10 w-80'
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className='hover:bg-blue-400'>
                  <Button variant='outline'>
                    <Filter className='h-4 w-4 mr-2' />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='bg-gradient-to-br from-blue-300 to-purple-300 font-semibold'>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("all")}
                    className='hover:text-white'
                  >
                    All Status
                  </DropdownMenuItem>
                  <div className='h-px bg-border my-1 bg-green-300' />
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("active")}
                    className='hover:text-white'
                  >
                    Active
                  </DropdownMenuItem>
                  <div className='h-px bg-border my-1 bg-green-300' />
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("inactive")}
                    className='hover:text-white'
                  >
                    Inactive
                  </DropdownMenuItem>
                  <div className='h-px bg-border my-1 bg-green-300' />
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("suspended")}
                    className='hover:text-white'
                  >
                    Suspended
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Unique ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>KYC Status</TableHead>
                  <TableHead>Fiat Balance</TableHead>
                  <TableHead>Crypto Balance</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className='flex items-center space-x-3 '>
                        <Avatar>
                          <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </div>
                        </Avatar>
                        <div>
                          <p className='font-medium text-slate-900'>
                            {user.name}
                          </p>
                          <p className='text-sm text-slate-500'>{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className='text-xs bg-slate-100 px-2 py-1 rounded'>
                        {user.uniqueId}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getKycStatusColor(user.kycStatus)}>
                        {user.kycStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className='font-medium'>
                      {user.fiatBalance}
                    </TableCell>
                    <TableCell className='font-medium'>
                      {user.cryptoBalance}
                    </TableCell>
                    <TableCell className='text-slate-500'>
                      {user.lastActivity}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end' className="bg-gradient-to-br from-blue-400 to-purple-400 font-semibold">
                          <DropdownMenuLabel className="hover:text-white">
                            Actions
                          </DropdownMenuLabel>
                           <div className='h-px bg-border my-1 bg-green-300'/>
                          <DropdownMenuItem className="hover:text-white">
                            <Eye className='mr-2 h-4 w-4'/>
                            View Details
                          </DropdownMenuItem>
                           <div className='h-px bg-border my-1 bg-green-300'/>
                          <DropdownMenuItem className="hover:text-white">
                            <Edit className='mr-2 h-4 w-4' />
                            Edit User
                          </DropdownMenuItem>
                           <div className='h-px bg-border my-1 bg-green-300'/>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='text-red-600 hover:text-white'>
                            <Trash2 className='mr-2 h-4 w-4' />
                            Suspend User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
