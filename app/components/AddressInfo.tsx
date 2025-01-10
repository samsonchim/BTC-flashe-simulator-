'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transaction } from '@/types/bitcoin';

export function AddressInfo() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchAddressInfo = async () => {
    try {
      const response = await fetch(`/api/address/${address}`);
      if (!response.ok) throw new Error('Failed to fetch address info');
      const data = await response.json();
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching address info:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter BTC address"
        />
      </div>
      <Button onClick={fetchAddressInfo}>Fetch Address Info</Button>
      {balance !== null && (
        <div>
          <h3 className="text-lg font-semibold">Balance: {balance} BTC</h3>
        </div>
      )}
      {transactions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold">Transactions:</h3>
          <ul className="space-y-2">
            {transactions.map((tx) => (
              <li key={tx.id} className="border p-2 rounded">
                <p>From: {tx.from}</p>
                <p>To: {tx.to}</p>
                <p>Amount: {tx.amount} BTC</p>
                <p>Timestamp: {new Date(tx.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

