import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Transaction, TransactionStatus } from '../types/transaction';
import {
    fetchTransactions as apiFetchTransactions,
    refundTransaction as apiRefundTransaction,
} from '../api/transactionApi';

export const fetchTransactionsThunk = createAsyncThunk(
    'transactions/fetch',
    async () => {
        return await apiFetchTransactions();
    },
);

export const refundTransactionThunk = createAsyncThunk<
    { id: string },
    string,
    { state: { transactions: TransactionsState }; rejectValue: string }
>(
    'transactions/refund',
    async (id, { rejectWithValue }) => {
        try {
            await apiRefundTransaction(id);
            return { id };
        } catch (err) {
            return rejectWithValue(
                err instanceof Error ? err.message : 'Refund failed',
            );
        }
    },
);


interface TransactionsState {
    items: Transaction[];
    loading: boolean;
    error: string | null;
    previousStatuses: Record<string, TransactionStatus>;
}

const initialState: TransactionsState = {
    items: [],
    loading: false,
    error: null,
    previousStatuses: {},
};


const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchTransactionsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load transactions';
            })

            .addCase(refundTransactionThunk.pending, (state, action) => {
                const id = action.meta.arg;
                const txn = state.items.find((t) => t.id === id);
                if (txn) {
                    state.previousStatuses[id] = txn.status;
                    txn.status = 'Refunding';
                }
            })
            .addCase(refundTransactionThunk.fulfilled, (state, action) => {
                const txn = state.items.find((t) => t.id === action.payload.id);
                if (txn) {
                    txn.status = 'Refunded';
                }
                delete state.previousStatuses[action.payload.id];
            })
            .addCase(refundTransactionThunk.rejected, (state, action) => {
                const id = action.meta.arg;
                const txn = state.items.find((t) => t.id === id);
                if (txn && state.previousStatuses[id]) {
                    txn.status = state.previousStatuses[id];
                }
                delete state.previousStatuses[id];
            });
    },
});

export default transactionsSlice.reducer;
