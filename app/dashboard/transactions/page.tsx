"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function TransactionsPage() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>View and manage your transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Add transaction content here */}
          <p>This is the transactions page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
