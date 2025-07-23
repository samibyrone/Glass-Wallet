"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AppShell } from "@/components/Layout/sidebar";
import { DashboardContent } from "@/components/Layout/DashboardContent";

export default function WalletPage() {
  return (
    <AppShell>
      <DashboardContent>
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>View your wallet details.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This is the wallet page.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardContent>
    </AppShell>
  );
}
