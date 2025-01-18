import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login"); // Перенаправление на страницу входа
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography sx={{ flexGrow: 1, textAlign: 'left', fontSize: '16px' }}>
                    Консультации по правам и обязанностям
                </Typography>
                <IconButton color="inherit" onClick={handleLogout}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
