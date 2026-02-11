import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { fetchTransactionsThunk } from '../store/transactionSlice';

export function useTransactions() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: transactions, loading, error } = useSelector(
        (state: RootState) => state.transactions,
    );

    useEffect(() => {
        dispatch(fetchTransactionsThunk());
    }, [dispatch]);

    return { transactions, loading, error };
}
