import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Blocks/AuthContext"; // Исправлен путь
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Container,
    Paper,
} from "@mui/material";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            navigate("/"); // Перенаправление на главную страницу
        } else {
            setError("Неправильный email или пароль");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Вход в систему
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Войти
                    </Button>
                </Box>
                <Typography align="center" sx={{ marginTop: 2 }}>
                    Нет аккаунта?{" "}
                    <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
                        Зарегистрироваться
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default LoginPage;
