"use client";

import { AppShell } from "@/components/Layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TransactionsPage() {
  return (
    <AppShell>
      <div className="p-4 m-20">
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>View and manage your transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the transactions page.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
