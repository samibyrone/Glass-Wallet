"use client";

import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/Layout/sidebar";
import { transactions } from "./TransactionFile/TransactionFile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: 'Income',
      data: [1200, 1900, 3000, 5000],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    },
    {
      label: 'Expenses',
      data: [800, 1200, 2000, 3000],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    },
  ],
};

export default function TransactionsPage() {
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const statusMatch = filter === "All" || transaction.status === filter;
    const searchMatch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <AppShell>
      <div className="p-4 sm:p-6 md:p-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>View and manage your transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <div className="relative w-full sm:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-8" 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <FileDown className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
            <Tabs defaultValue="All" onValueChange={setFilter}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Completed">Completed</TabsTrigger>
                <TabsTrigger value="Pending">Pending</TabsTrigger>
                <TabsTrigger value="Failed">Failed</TabsTrigger>
              </TabsList>
              <TabsContent value={filter}>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{transaction.description}</TableCell>
                          <TableCell className={transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                            {transaction.amount}
                          </TableCell>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                transaction.status === "Completed" ? "default"
                                : transaction.status === "Pending" ? "secondary"
                                : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">View</Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Transaction Details</DialogTitle>
                                </DialogHeader>
                                <div>
                                  <p><strong>ID:</strong> {transaction.id}</p>
                                  <p><strong>Date:</strong> {transaction.date}</p>
                                  <p><strong>Description:</strong> {transaction.description}</p>
                                  <p><strong>Amount:</strong> {transaction.amount}</p>
                                  <p><strong>Type:</strong> {transaction.type}</p>
                                  <p><strong>Method:</strong> {transaction.method}</p>
                                  <p><strong>Status:</strong> {transaction.status}</p>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
