import { Transaction, Address } from '@/types/bitcoin';

class SimulatedBlockchain {
  private transactions: Transaction[] = [];
  private addresses: Map<string, Address> = new Map();

  addTransaction(from: string, to: string, amount: number): Transaction {
    const transaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      from,
      to,
      amount,
      timestamp: Date.now(),
    };

    this.transactions.push(transaction);

    // Update balances
    this.updateBalance(from, -amount);
    this.updateBalance(to, amount);

    return transaction;
  }

  private updateBalance(address: string, amount: number) {
    const currentBalance = this.addresses.get(address)?.balance || 0;
    this.addresses.set(address, { address, balance: currentBalance + amount });
  }

  getBalance(address: string): number {
    return this.addresses.get(address)?.balance || 0;
  }

  getTransactions(address: string): Transaction[] {
    return this.transactions.filter(t => t.from === address || t.to === address);
  }
}

export const blockchain = new SimulatedBlockchain();

