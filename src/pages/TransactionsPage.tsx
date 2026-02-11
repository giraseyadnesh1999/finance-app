import { Box, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useTransactions } from '../hooks/useTransactions';
import TransactionList from '../components/TransactionList/TransactionList';
import { useThemeContext } from '../contexts/ThemeContext';

export default function TransactionsPage() {
    const { transactions, loading, error } = useTransactions();
    const { mode } = useThemeContext();
    const isDark = mode === 'dark';
    const stats = [
        { label: 'Total', value: transactions.length },
        { label: 'Completed', value: transactions.filter((t) => t.status === 'Completed').length },
        { label: 'Pending', value: transactions.filter((t) => t.status === 'Pending').length },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    mb: 3,
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            background: isDark
                                ? 'linear-gradient(135deg, #a78bfa, #00CEFF)'
                                : 'linear-gradient(135deg, #6C5CE7, #00CEFF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Transactions
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Review and manage your recent financial activity
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    {stats.map((s) => (
                        <Paper
                            key={s.label}
                            variant="outlined"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                px: 3,
                                py: 1.5,
                                borderRadius: 3,
                                minWidth: 80,
                            }}
                        >
                            <Typography variant="h6">{s.value}</Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ textTransform: 'uppercase', letterSpacing: 0.4, mt: 0.25 }}
                            >
                                {s.label}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10, gap: 2 }}>
                    <CircularProgress size={36} />
                    <Typography color="text.secondary">Loading transactions…</Typography>
                </Box>
            )}
            {error && (
                <Alert severity="error" variant="outlined" sx={{ mb: 2, borderRadius: 2 }}>
                    {error}
                </Alert>
            )}
            {!loading && !error && <TransactionList transactions={transactions} />}
        </Box>
    );
}
