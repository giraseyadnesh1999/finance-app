import type { Transaction } from '../types/transaction';

const DUMMY_TRANSACTIONS: Transaction[] = [
    { id: 'TXN-1001', date: '2026-02-11', amount: 2500.0, currency: 'USD', type: 'Credit', status: 'Completed' },
    { id: 'TXN-1002', date: '2026-02-10', amount: 89.99, currency: 'USD', type: 'Debit', status: 'Completed' },
    { id: 'TXN-1003', date: '2026-02-10', amount: 450.0, currency: 'USD', type: 'Credit', status: 'Pending' },
    { id: 'TXN-1004', date: '2026-02-09', amount: 1200.5, currency: 'USD', type: 'Debit', status: 'Failed' },
    { id: 'TXN-1005', date: '2026-02-09', amount: 320.0, currency: 'USD', type: 'Credit', status: 'Completed' },
    { id: 'TXN-1006', date: '2026-02-08', amount: 75.25, currency: 'USD', type: 'Debit', status: 'Completed' },
    { id: 'TXN-1007', date: '2026-02-08', amount: 5000.0, currency: 'USD', type: 'Credit', status: 'Pending' },
    { id: 'TXN-1008', date: '2026-02-07', amount: 199.99, currency: 'USD', type: 'Debit', status: 'Completed' },
    { id: 'TXN-1009', date: '2026-02-07', amount: 850.0, currency: 'USD', type: 'Credit', status: 'Completed' },
    { id: 'TXN-1010', date: '2026-02-06', amount: 42.0, currency: 'USD', type: 'Debit', status: 'Failed' },
    { id: 'TXN-1011', date: '2026-02-06', amount: 1750.0, currency: 'USD', type: 'Credit', status: 'Completed' },
    { id: 'TXN-1012', date: '2026-02-05', amount: 630.0, currency: 'USD', type: 'Debit', status: 'Completed' },
    { id: 'TXN-1013', date: '2026-02-05', amount: 99.0, currency: 'USD', type: 'Credit', status: 'Pending' },
    { id: 'TXN-1014', date: '2026-02-04', amount: 3200.0, currency: 'USD', type: 'Credit', status: 'Completed' },
    { id: 'TXN-1015', date: '2026-02-04', amount: 15.5, currency: 'USD', type: 'Debit', status: 'Completed' },
];

/**
 * Simulates a network fetch for transactions.
 * Returns after ~800ms delay.
 */
export async function fetchTransactions(): Promise<Transaction[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(structuredClone(DUMMY_TRANSACTIONS));
        }, 800);
    });
}

/**
 * Simulates a refund API call.
 * Resolves after ~1s with 80% success rate.
 */
export async function refundTransaction(
    id: string,
): Promise<{ success: boolean; id: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() < 0.8;
            if (success) {
                resolve({ success: true, id });
            } else {
                reject(new Error(`Refund for ${id} failed. Bank declined the request.`));
            }
        }, 1000);
    });
}
