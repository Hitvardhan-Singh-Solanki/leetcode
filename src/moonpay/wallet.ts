/*
Implement a wallet system that allows the following operations:
createUser(userId)
getBalance(userId)
deposit(userId, amount)
withdraw(userId, amount)
transfer(fromUserId, toUserId, amount)
getTransactionHistory(userId)
*/

// debit -> out
// credit -> in
type TransactionType = 'debit' | 'credit';

type TransactionHistory = {
  from: string;
  to: string;
  amount: number;
  type: TransactionType;
  time: string;
};

type Wallet = {
  balance: number;
  transactions: TransactionHistory[];
};

interface IWalletService {
  createUser(userId: string): void;
  getBalance(userId: string): number;
  deposit(userId: string, amount: number): void;
  withdraw(userId: string, amount: number): void;
  transfer(from: string, to: string, amount: number): void;
  getTransactionHistory(userId: string): TransactionHistory[];
}

export class WalletService implements IWalletService {
  private wallets: Map<string, Wallet> = new Map();

  createUser(userId: string): void {
    if (this.wallets.has(userId)) return;
    this.wallets.set(userId, {
      balance: 0,
      transactions: [],
    });
  }

  getBalance(userId: string): number {
    if (!this.wallets.has(userId)) return 0;
    return this.wallets.get(userId)!.balance;
  }
  deposit(userId: string, amount: number): void {
    if (!this.wallets.get(userId) || amount <= 0) return;

    const wallet = this.wallets.get(userId)!;
    const newTrx: TransactionHistory = {
      from: userId,
      to: userId,
      type: 'credit',
      amount,
      time: this.getUTCTime(),
    };

    this.wallets.set(userId, {
      balance: wallet.balance + amount,
      transactions: [...wallet.transactions, newTrx],
    });
  }
  withdraw(userId: string, amount: number): void {
    if (!this.wallets.get(userId) || amount <= 0) return;

    const wallet = this.wallets.get(userId)!;

    if (wallet.balance - amount < 0) return;

    const newTrx: TransactionHistory = {
      from: userId,
      to: userId,
      amount,
      type: 'debit',
      time: this.getUTCTime(),
    };

    this.wallets.set(userId, {
      balance: wallet.balance - amount,
      transactions: [...wallet.transactions, newTrx],
    });
  }
  transfer(from: string, to: string, amount: number): void {
    if (!this.wallets.get(from) || !this.wallets.get(to) || amount <= 0) return;

    const walletFrom = this.wallets.get(from)!;
    const walletTo = this.wallets.get(to)!;

    if (walletFrom.balance - amount < 0) return;

    const newTrxDebit: TransactionHistory = {
      from,
      to,
      amount,
      type: 'debit',
      time: this.getUTCTime(),
    };

    const newTrxCredit: TransactionHistory = {
      from: to,
      to: from,
      amount,
      type: 'credit',
      time: this.getUTCTime(),
    };

    this.wallets.set(from, {
      balance: walletFrom.balance - amount,
      transactions: [...walletFrom.transactions, newTrxDebit],
    });

    this.wallets.set(to, {
      balance: walletTo.balance + amount,
      transactions: [...walletTo.transactions, newTrxCredit],
    });
  }
  getTransactionHistory(userId: string): TransactionHistory[] {
    if (!this.wallets.get(userId)) return [];

    return this.wallets.get(userId)!.transactions;
  }

  private getUTCTime(): string {
    return new Date().toISOString();
  }
}
