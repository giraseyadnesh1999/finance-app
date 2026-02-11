import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
} from '@mui/material'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const SIDEBAR_WIDTH = 220;

const NAV_ITEMS = [
    { icon: <ReceiptLongIcon fontSize="small" />, label: 'Transactions', active: true },

];

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: SIDEBAR_WIDTH,
                flexShrink: 0,
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                    width: SIDEBAR_WIDTH,
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper',
                    borderRight: 1,
                    borderColor: 'divider',
                },
            }}
        >
            <Box sx={{ height: 64 }} />
            <List disablePadding sx={{ pt: 2, px: 1 }}>
                {NAV_ITEMS.map((item) => (
                    <ListItemButton
                        key={item.label}
                        selected={item.active}
                        sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            '&.Mui-selected': {
                                bgcolor: (theme) =>
                                    theme.palette.mode === 'dark'
                                        ? 'rgba(108,92,231,0.12)'
                                        : 'rgba(108,92,231,0.08)',
                                color: 'primary.main',
                                '& .MuiListItemIcon-root': { color: 'primary.main' },
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{ fontSize: '0.88rem', fontWeight: item.active ? 600 : 400 }}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
}
