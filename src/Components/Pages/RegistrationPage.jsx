import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Blocks/AuthContext";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    Container,
    Paper,
    MenuItem,
} from "@mui/material";

const RegistrationPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // Роль по умолчанию
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Получаем текущие данные пользователей из localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Проверяем, существует ли пользователь с таким email
        if (users.find((user) => user.email === email)) {
            setError("Пользователь с таким email уже существует.");
            return;
        }

        // Добавляем нового пользователя
        const newUser = { email, password, role };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setSuccess("Регистрация успешна. Теперь вы можете войти в систему.");
        setError("");

        // Автоматический вход
        const success = login(email, password);
        if (success) {
            navigate("/");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100dvh', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Регистрация
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ marginBottom: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ marginBottom: 2 }}>
                        {success}
                    </Alert>
                )}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Email"
                        type="email"
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
                    <TextField
                        label="Роль"
                        select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                    >
                        <MenuItem value="user">Пользователь</MenuItem>
                        <MenuItem value="admin">Администратор</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Зарегистрироваться
                    </Button>
                </Box>
                <Typography align="center" sx={{ marginTop: 2 }}>
                    Есть аккаунт?{" "}
                    <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
                        Авторизоваться
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default RegistrationPage;
