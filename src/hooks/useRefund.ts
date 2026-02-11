import { useCallback, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store';
import { refundTransactionThunk } from '../store/transactionSlice';
import { useToast } from '../components/Toast/Toast';

export function useRefund(transactionId: string) {
    const dispatch = useDispatch<AppDispatch>();
    const [isPending, startTransition] = useTransition();
    const { showToast } = useToast();

    const status = useSelector((state: RootState) =>
        state.transactions.items.find((t) => t.id === transactionId)?.status,
    );

    const isRefunding = status === 'Refunding' || isPending;

    const refund = useCallback(() => {
        if (isRefunding) return;

        startTransition(async () => {
            const result = await dispatch(refundTransactionThunk(transactionId));
            if (refundTransactionThunk.rejected.match(result)) {
                showToast({
                    message: `Refund failed: ${result.payload ?? 'Unknown error'}`,
                    severity: 'error',
                });
            } else {
                showToast({
                    message: `Transaction ${transactionId} refunded successfully!`,
                    severity: 'success',
                });
            }
        });
    }, [dispatch, transactionId, isRefunding, showToast]);

    return { refund, isRefunding };
}
