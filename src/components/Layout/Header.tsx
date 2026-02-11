import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from '../../contexts/ThemeContext';

const NAV_ITEMS = ['Transactions'];

export default function Header() {
    const { mode, toggleColorMode } = useThemeContext();

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: 'background.paper',
                borderBottom: 1,
                borderColor: 'divider',
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar sx={{ gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #6C5CE7, #00CEFF)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: 14,
                            color: '#fff',
                        }}
                    >
                        F
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            background: 'linear-gradient(135deg, #6C5CE7, #00CEFF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1.15rem',
                            letterSpacing: -0.5,
                        }}
                    >
                        FinPay
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 2 }}>
                    {NAV_ITEMS.map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            clickable
                            variant={item === 'Transactions' ? 'filled' : 'outlined'}
                            color={item === 'Transactions' ? 'primary' : 'default'}
                            size="small"
                            sx={{ fontWeight: 600, fontSize: '0.8rem' }}
                        />
                    ))}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <IconButton onClick={toggleColorMode} color="inherit" size="small">
                    <Tooltip title={`Enable ${mode === 'dark' ? 'light' : 'dark'} mode`}>
                        {mode === 'dark' ? (
                            <LightModeIcon fontSize="small" />
                        ) : (
                            <DarkModeIcon fontSize="small" sx={{ color: '#FFD700' }} />
                        )}
                    </Tooltip>
                </IconButton>

                <Avatar
                    sx={{
                        width: 34,
                        height: 34,
                        background: 'linear-gradient(135deg, #6C5CE7, #00CEFF)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.08)' },
                    }}
                >
                    JS
                </Avatar>
            </Toolbar>
        </AppBar>
    );
}
