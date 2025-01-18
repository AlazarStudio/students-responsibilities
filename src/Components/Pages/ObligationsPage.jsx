import React, { useState, useContext } from "react";
import {
    Box,
    Typography,
    Button,
    Grid,
    Paper,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { obligationsData as initialObligationsData } from "../../data";
import { AuthContext } from "../Blocks/AuthContext";

const ObligationsPage = () => {
    const [obligations, setObligations] = useState(initialObligationsData);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [currentObligation, setCurrentObligation] = useState({ id: null, title: "", description: "" });

    const { user } = useContext(AuthContext); // Получение текущего пользователя

    const handleOpenDialog = (obligation) => {
        setCurrentObligation(obligation || { id: null, title: "", description: "" });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentObligation({ id: null, title: "", description: "" });
    };

    const handleSaveObligation = () => {
        if (currentObligation.id) {
            // Редактирование
            setObligations((prevObligations) =>
                prevObligations.map((obligation) =>
                    obligation.id === currentObligation.id ? currentObligation : obligation
                )
            );
        } else {
            // Добавление
            setObligations((prevObligations) => [
                ...prevObligations,
                { ...currentObligation, id: new Date().getTime() },
            ]);
        }
        handleCloseDialog();
    };

    const handleDeleteObligation = (id) => {
        setObligations((prevObligations) =>
            prevObligations.filter((obligation) => obligation.id !== id)
        );
    };

    return (
        <Box
            sx={{
                padding: 2,
                minHeight: "calc(100dvh - 64px - 56px)",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Обязанности студентов
            </Typography>

            {/* Кнопка добавления доступна только администратору */}
            {user?.role === "admin" && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                    onClick={() => handleOpenDialog()}
                >
                    Добавить обязанность
                </Button>
            )}

            <Grid container spacing={3}>
                {obligations.map((obligation) => (
                    <Grid item xs={12} sm={6} key={obligation.id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">{obligation.title}</Typography>
                            <Typography variant="body2" gutterBottom>
                                {obligation.description}
                            </Typography>
                            {/* Кнопки редактирования и удаления доступны только администратору */}
                            {user?.role === "admin" && (
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenDialog(obligation)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteObligation(obligation.id)}
                                    >
                                        Удалить
                                    </Button>
                                </Box>
                            )}
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Диалоговое окно для добавления/редактирования */}
            {user?.role === "admin" && (
                <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>
                        {currentObligation.id ? "Редактировать обязанность" : "Добавить обязанность"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Название"
                            fullWidth
                            margin="normal"
                            value={currentObligation.title}
                            onChange={(e) => setCurrentObligation({ ...currentObligation, title: e.target.value })}
                        />
                        <TextField
                            label="Описание"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={currentObligation.description}
                            onChange={(e) =>
                                setCurrentObligation({ ...currentObligation, description: e.target.value })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Отмена</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveObligation}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ObligationsPage;
