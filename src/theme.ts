import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => {
    const isDark = mode === 'dark';

    const themeOptions: ThemeOptions = {
        palette: {
            mode,
            primary: {
                main: '#6C5CE7',
                light: '#a78bfa',
                dark: '#5b4bd5',
            },
            secondary: {
                main: '#00CEFF',
            },
            success: {
                main: '#00E676',
            },
            error: {
                main: '#FF5252',
            },
            warning: {
                main: '#FFC107',
            },
            info: {
                main: '#60A5FA',
            },
            background: {
                default: isDark ? '#0b0d14' : '#f8f9fc',
                paper: isDark ? '#12151e' : '#ffffff',
            },
            text: {
                primary: isDark ? '#e8eaed' : '#1a1d23',
                secondary: isDark ? '#7a7f8e' : '#64748b',
            },
            divider: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
        },
        typography: {
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            h5: { fontWeight: 700 },
            h6: { fontWeight: 700 },
            button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                        padding: '8px 20px',
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        boxShadow: isDark ? 'none' : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
                    },
                },
            },
        },
    };

    return createTheme(themeOptions);
};

const defaultTheme = getTheme('dark');
export default defaultTheme;
