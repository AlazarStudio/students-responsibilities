import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Сопоставление маршрутов с индексами
    const navItems = [
        { label: "Главная", icon: <HomeIcon />, path: "/" },
        { label: "Права", icon: <InfoIcon />, path: "/rights" },
        { label: "Обязанности", icon: <AssignmentIcon />, path: "/obligations" },
        { label: "FAQ", icon: <QuestionAnswerIcon />, path: "/faq" },
        { label: "Контакты", icon: <ContactSupportIcon />, path: "/contacts" },
    ];

    // Определяем активный элемент на основе текущего пути
    const currentIndex = navItems.findIndex((item) => item.path === location.pathname);

    return (
        <Paper
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
            }}
            elevation={3}
        >
            <BottomNavigation
                value={currentIndex}
                onChange={(event, newValue) => {
                    navigate(navItems[newValue].path); // Переключение маршрута
                }}
                showLabels
            >
                {navItems.map((item, index) => (
                    <BottomNavigationAction
                        key={index}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
