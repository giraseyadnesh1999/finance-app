import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Box, Typography } from '@mui/material';
import { useRefund } from '../../hooks/useRefund';
import type { RootState } from '../../store';
import type { Transaction } from '../../types/transaction';
import Modal from '../Modal/Modal';

interface RefundButtonProps {
    transactionId: string;
}

function formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

export default function RefundButton({ transactionId }: RefundButtonProps) {
    const { refund, isRefunding } = useRefund(transactionId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const transaction = useSelector((state: RootState) =>
        state.transactions.items.find((t) => t.id === transactionId),
    ) as Transaction;

    const handleOpen = () => {
        if (!isRefunding) setIsModalOpen(true);
    };

    const handleClose = () => {
        if (!isRefunding) setIsModalOpen(false);
    };

    const handleConfirm = async () => {
        setIsModalOpen(false);
        refund();
    };

    return (
        <>
            <Button
                variant="contained"
                size="small"
                onClick={handleOpen}
                disabled={isRefunding}
                startIcon={isRefunding ? <CircularProgress size={14} color="inherit" /> : undefined}
                sx={{ fontSize: '0.78rem', px: 2 }}
            >
                {isRefunding ? 'Processing…' : 'Refund'}
            </Button>

            <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                title="Confirm Refund"
                footer={
                    <>
                        <Button variant="outlined" color="inherit" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleConfirm}
                            disabled={isRefunding}
                        >
                            Confirm Refund
                        </Button>
                    </>
                }
            >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    You are about to refund the following transaction:
                </Typography>

                {[
                    { label: 'Transaction ID', value: transaction.id },
                    { label: 'Amount', value: formatCurrency(transaction.amount, transaction.currency) },
                    { label: 'Date', value: transaction.date },
                    { label: 'Type', value: transaction.type },
                ].map((row) => (
                    <Box
                        key={row.label}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            py: 1,
                            borderBottom: 1,
                            borderColor: 'divider',
                            '&:last-child': { borderBottom: 'none' },
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            {row.label}
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {row.value}
                        </Typography>
                    </Box>
                ))}
            </Modal>
        </>
    );
}
