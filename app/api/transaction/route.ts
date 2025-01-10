import { NextResponse } from 'next/server';
import { blockchain } from '../blockchain';

export async function POST(request: Request) {
  const { from, to, amount } = await request.json();

  if (!from || !to || !amount) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const transaction = blockchain.addTransaction(from, to, parseFloat(amount));

  return NextResponse.json({ transaction });
}

