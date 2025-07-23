"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings, HelpCircle, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DashboardContentProps {
  children: React.ReactNode
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <>
      {/* Top navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-30 mt-4">
        <div className="flex items-center justify-between h-16 px-6 ml-20 mr-20">
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
              <Input placeholder="Search users, transactions..." className="pl-10 w-80" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-green-600">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gradient-to-br from-blue-500 to-purple-500" align="end" forceMount>
                <DropdownMenuLabel className="font-semibold">
                  <div className="flex flex-col space-y-1 font-semibold hover:text-white">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">admin@enum.com</p>
                  </div>
                </DropdownMenuLabel>
                  <div className="h-px bg-border my-1 bg-green-300"/>
                <DropdownMenuSeparator />
                <DropdownMenuItem className=" font-semibold hover:text-white">
                  <Settings className="mr-2 h-4 w-4 font-semibold hover:text-white"/>
                  <span>Settings</span>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1 bg-green-300" />
                <DropdownMenuItem className="font-semibold hover:text-white">
                  <HelpCircle className="mr-2 h-4 w-4 font-semibold hover:text-white"/>
                  <span>Support</span>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1 bg-green-300"/>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="font-semibold hover:text-white">
                  <LogOut className="mr-2 h-4 w-4 font-semibold hover:text-white"/>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="p-2">{children}</main>
    </>
  )
}
