import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Main_Page = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                padding: 2,
                minHeight: "calc(100dvh - 64px)",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Typography variant="h4" gutterBottom align="center">
                Добро пожаловать!
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Это приложение для консультирования прав и обязанностей обучающихся.
            </Typography>

            <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                        <Typography variant="h6">Ваши права</Typography>
                        <Typography variant="body2" gutterBottom>
                            Узнайте о своих правах как обучающегося.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/rights")}
                        >
                            Перейти
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                        <Typography variant="h6">Ваши обязанности</Typography>
                        <Typography variant="body2" gutterBottom>
                            Ознакомьтесь с вашими обязанностями.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/obligations")}
                        >
                            Перейти
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                        <Typography variant="h6">Часто задаваемые вопросы</Typography>
                        <Typography variant="body2" gutterBottom>
                            Найдите ответы на часто задаваемые вопросы.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/faq")}
                        >
                            Перейти
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                        <Typography variant="h6">Контакты</Typography>
                        <Typography variant="body2" gutterBottom>
                            Свяжитесь с консультантом или поддержкой.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/contacts")}
                        >
                            Перейти
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Main_Page;
