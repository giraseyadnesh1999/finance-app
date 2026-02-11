import { TableRow, TableCell, Chip } from '@mui/material';
import type { Transaction, TransactionStatus } from '../../types/transaction';
import RefundButton from './RefundButton';

interface TransactionRowProps {
    transaction: Transaction;
}

function formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function getStatusColor(status: TransactionStatus) {
    const map: Record<TransactionStatus, 'success' | 'warning' | 'error' | 'primary' | 'info'> = {
        Completed: 'success',
        Pending: 'warning',
        Failed: 'error',
        Refunding: 'primary',
        Refunded: 'info',
    };
    return map[status];
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
    const { id, date, amount, currency, type, status } = transaction;

    return (
        <TableRow
            hover
            sx={{ '&:last-child td': { borderBottom: 0 } }}
        >
            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'text.secondary' }}>
                {id}
            </TableCell>
            <TableCell>{formatDate(date)}</TableCell>
            <TableCell
                sx={{
                    fontWeight: 600,
                    color: type === 'Credit' ? 'success.main' : 'error.main',
                    fontVariantNumeric: 'tabular-nums',
                }}
            >
                {type === 'Debit' ? '−' : '+'}
                {formatCurrency(amount, currency)}
            </TableCell>
            <TableCell>
                <Chip
                    label={type}
                    size="small"
                    color={type === 'Credit' ? 'success' : 'error'}
                    variant="outlined"
                    sx={{ fontWeight: 600, fontSize: '0.72rem' }}
                />
            </TableCell>
            <TableCell>
                <Chip
                    label={status}
                    size="small"
                    color={getStatusColor(status)}
                    variant="filled"
                    sx={{
                        fontWeight: 600,
                        fontSize: '0.72rem',
                        ...(status === 'Refunding' && {
                            animation: 'pulse 1s ease-in-out infinite',
                            '@keyframes pulse': {
                                '0%,100%': { opacity: 1 },
                                '50%': { opacity: 0.5 },
                            },
                        }),
                    }}
                />
            </TableCell>
            <TableCell>
                {status === 'Completed' && <RefundButton transactionId={id} />}
            </TableCell>
        </TableRow>
    );
}
