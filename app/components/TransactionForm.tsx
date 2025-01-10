'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export function TransactionForm() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to, amount: parseFloat(amount) }),
      });

      if (!response.ok) throw new Error('Transaction failed');

      const data = await response.json();
      toast({
        title: 'Transaction Successful',
        description: `Sent ${amount} BTC from ${from} to ${to}`,
      });

      // Reset form
      setFrom('');
      setTo('');
      setAmount('');
    } catch (error) {
      toast({
        title: 'Transaction Failed',
        description: 'An error occurred while processing the transaction.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="from">From Address</Label>
        <Input
          id="from"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="Enter sender's address"
          required
        />
      </div>
      <div>
        <Label htmlFor="to">To Address</Label>
        <Input
          id="to"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Enter recipient's address"
          required
        />
      </div>
      <div>
        <Label htmlFor="amount">Amount (BTC)</Label>
        <Input
          id="amount"
          type="number"
          step="0.00000001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to send"
          required
        />
      </div>
      <Button type="submit">Send Transaction</Button>
    </form>
  );
}

