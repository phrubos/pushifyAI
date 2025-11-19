"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Plus, Minus, Loader2 } from "lucide-react";
import {
  searchUsers,
  getUserById,
  adminAddCredits,
  adminRemoveCredits,
  getAdminTransactionHistory,
} from "@/app/actions/admin";
import { InferSelectModel } from "drizzle-orm";
import { transactions } from "@/lib/schema";

type Transaction = InferSelectModel<typeof transactions>;

interface UserResult {
  id: string;
  email: string;
  name: string;
  credits: number;
  createdAt: Date;
}

export function AdminCreditsClient() {
  const [searchEmail, setSearchEmail] = useState("");
  const [searchResults, setSearchResults] = useState<UserResult[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserResult | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Credit adjustment form
  const [creditAmount, setCreditAmount] = useState("");
  const [creditReason, setCreditReason] = useState("");

  const handleSearch = async () => {
    if (!searchEmail || searchEmail.length < 2) {
      toast.error("Please enter at least 2 characters");
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchUsers(searchEmail);
      setSearchResults(results);
      if (results.length === 0) {
        toast.info("No users found");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search users");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectUser = async (user: UserResult) => {
    setSelectedUser(user);
    setIsLoadingTransactions(true);
    try {
      const history = await getAdminTransactionHistory(user.id);
      setTransactionHistory(history);
    } catch (error) {
      console.error("Failed to load transactions:", error);
      toast.error("Failed to load transaction history");
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const handleAddCredits = async () => {
    if (!selectedUser) return;

    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }

    if (!creditReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await adminAddCredits(selectedUser.id, amount, creditReason);
      toast.success(`Added ${amount} credits successfully`);
      
      // Refresh user data
      const updatedUser = await getUserById(selectedUser.id);
      setSelectedUser(updatedUser);
      
      // Refresh transaction history
      const history = await getAdminTransactionHistory(selectedUser.id);
      setTransactionHistory(history);
      
      // Clear form
      setCreditAmount("");
      setCreditReason("");
    } catch (error) {
      console.error("Add credits error:", error);
      toast.error("Failed to add credits");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveCredits = async () => {
    if (!selectedUser) return;

    const amount = parseInt(creditAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid positive amount");
      return;
    }

    if (!creditReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await adminRemoveCredits(selectedUser.id, amount, creditReason);
      toast.success(`Removed ${amount} credits successfully`);
      
      // Refresh user data
      const updatedUser = await getUserById(selectedUser.id);
      setSelectedUser(updatedUser);
      
      // Refresh transaction history
      const history = await getAdminTransactionHistory(selectedUser.id);
      setTransactionHistory(history);
      
      // Clear form
      setCreditAmount("");
      setCreditReason("");
    } catch (error) {
      console.error("Remove credits error:", error);
      toast.error("Failed to remove credits");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Credit Management</h1>
        <p className="text-muted-foreground">
          Search for users and manage their credit balances
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
          <CardDescription>Find users by email address</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter email address..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                  onClick={() => handleSelectUser(user)}
                >
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                  </div>
                  <Badge variant="secondary">{user.credits} credits</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected User Section */}
      {selectedUser && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Current Credits</Label>
                  <p className="text-2xl font-bold">{selectedUser.credits}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Member Since</Label>
                  <p className="font-medium">{formatDate(selectedUser.createdAt)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Adjust Credits</CardTitle>
              <CardDescription>Add or remove credits from this user</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount..."
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for adjustment..."
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddCredits}
                  disabled={isProcessing}
                  className="flex-1"
                >
                  {isProcessing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Add Credits
                </Button>
                <Button
                  onClick={handleRemoveCredits}
                  disabled={isProcessing}
                  variant="destructive"
                  className="flex-1"
                >
                  {isProcessing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Minus className="mr-2 h-4 w-4" />
                  )}
                  Remove Credits
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Recent credit transactions for this user</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTransactions ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : transactionHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No transactions found
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Balance</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionHistory.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.createdAt)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{transaction.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              transaction.amount > 0
                                ? "text-green-600 font-medium"
                                : "text-red-600 font-medium"
                            }
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount}
                          </span>
                        </TableCell>
                        <TableCell>{transaction.credits}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : transaction.status === "failed"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
