"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Activity, CreditCard, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Transactions", href: "/dashboard/transactions", icon: Activity },
  { name: "Wallet Management", href: "/wallet", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help & Support", href: "/dashboard/support", icon: HelpCircle },
];

interface MainSidebarNavigationProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function MainSidebarNavigation({ setIsSidebarOpen }: MainSidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 p-4 space-y-5 overflow-y-auto">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isActive 
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on navigation
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-blue-700" : "text-slate-400"}`} />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
