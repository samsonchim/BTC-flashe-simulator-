export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
}

export interface Address {
  address: string;
  balance: number;
}

