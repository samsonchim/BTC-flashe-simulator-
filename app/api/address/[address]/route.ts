import { NextResponse } from 'next/server';
import { blockchain } from '../../blockchain';

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const address = params.address;
  const balance = blockchain.getBalance(address);
  const transactions = blockchain.getTransactions(address);

  return NextResponse.json({ address, balance, transactions });
}

