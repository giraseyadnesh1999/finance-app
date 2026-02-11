import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 3,
                py: 1.5,
                bgcolor: 'background.paper',
                borderTop: 1,
                borderColor: 'divider',
            }}
        >
            <Typography variant="caption" color="text.secondary">
                © 2026 FinPay Inc. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                {['Privacy', 'Terms', 'Support'].map((label) => (
                    <Link
                        key={label}
                        href="#"
                        underline="hover"
                        variant="caption"
                        color="text.secondary"
                        sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                        {label}
                    </Link>
                ))}
            </Box>
        </Box>
    );
}
