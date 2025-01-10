import { TransactionForm } from './components/TransactionForm';
import { AddressInfo } from './components/AddressInfo';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Simulated Bitcoin Transactions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Transaction</h2>
          <TransactionForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Address Information</h2>
          <AddressInfo />
        </div>
      </div>
    </div>
  );
}

