'use client';

import * as React from 'react';
import { useUser } from '../../hooks/use-user';
import { MainSidebarNavigation } from './MainSidebarNavigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LogOut, UserCircle, ChevronDown, Loader2, Menu, X } from 'lucide-react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { user, loading, logout } = useUser();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); 

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-xl font-bold text-slate-900">Glass Wallet</span>
        </div>
        <button type="button" onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-accent" aria-label="Open sidebar">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      <aside 
        className={`bg-gradient-to-br from-purple-400 to-blue-900 fixed left-0 top-0 z-50 h-full w-64 border-r bg-card transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out
        md:translate-x-0 md:flex md:flex-col`}
      >
        <div className="flex-shrink-0">
          <div className="flex items-center gap-2 px-6 py-4 border-b">
           <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Glass Wallet</span>
            <button type="button" onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto p-2 rounded-md hover:bg-accent" aria-label="Close sidebar">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <MainSidebarNavigation setIsSidebarOpen={setIsSidebarOpen} />

        <div className="flex-shrink-0 p-4 border-t bg-card">
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  <UserCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-1" align="end">
              <button 
                type="button"
                onClick={() => { logout(); setIsSidebarOpen(false); }} 
                className="bg-black text-white font-semibold w-full flex items-center px-3 py-2 text-bg rounded-md text-destructive hover:bg-accent transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-500 mr-2" />
                Logout
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </aside>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      <main className="md:pl-64">
        {children}
      </main>
    </div>
  );
}