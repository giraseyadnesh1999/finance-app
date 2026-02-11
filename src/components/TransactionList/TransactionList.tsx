import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    TablePagination,
} from '@mui/material';
import type { Transaction } from '../../types/transaction';
import TransactionRow from './TransactionRow';

interface TransactionListProps {
    transactions: Transaction[];
}

const COLUMNS = ['Transaction ID', 'Date', 'Amount', 'Type', 'Status', 'Action'];

export default function TransactionList({ transactions }: TransactionListProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (transactions.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <Typography color="text.secondary">No transactions found.</Typography>
            </Box>
        );
    }

    const paginatedTransactions = transactions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper
            variant="outlined"
            sx={{ borderRadius: 3, overflow: 'hidden' }}
        >
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {COLUMNS.map((col) => (
                                <TableCell
                                    key={col}
                                    sx={{
                                        fontWeight: 700,
                                        fontSize: '0.75rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: 0.5,
                                        color: 'text.secondary',
                                    }}
                                >
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTransactions.map((txn) => (
                            <TransactionRow key={txn.id} transaction={txn} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ borderTop: 1, borderColor: 'divider' }}
            />
        </Paper>
    );
}
