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
import { rightsData as initialRightsData } from "../../data";
import { AuthContext } from "../Blocks/AuthContext";

const RightsPage = () => {
    const [rights, setRights] = useState(initialRightsData);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [currentRight, setCurrentRight] = useState({ id: null, title: "", description: "" });

    const { user } = useContext(AuthContext); // Получение текущего пользователя

    const handleOpenDialog = (right) => {
        setCurrentRight(right || { id: null, title: "", description: "" });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentRight({ id: null, title: "", description: "" });
    };

    const handleSaveRight = () => {
        if (currentRight.id) {
            // Редактирование
            setRights((prevRights) =>
                prevRights.map((right) =>
                    right.id === currentRight.id ? currentRight : right
                )
            );
        } else {
            // Добавление
            setRights((prevRights) => [
                ...prevRights,
                { ...currentRight, id: new Date().getTime() },
            ]);
        }
        handleCloseDialog();
    };

    const handleDeleteRight = (id) => {
        setRights((prevRights) => prevRights.filter((right) => right.id !== id));
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
                Права студентов
            </Typography>

            {/* Кнопка добавления доступна только администратору */}
            {user?.role === "admin" && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                    onClick={() => handleOpenDialog()}
                >
                    Добавить право
                </Button>
            )}

            <Grid container spacing={3}>
                {rights.map((right) => (
                    <Grid item xs={12} sm={6} key={right.id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">{right.title}</Typography>
                            <Typography variant="body2" gutterBottom>
                                {right.description}
                            </Typography>
                            {/* Кнопки редактирования и удаления доступны только администратору */}
                            {user?.role === "admin" && (
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenDialog(right)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteRight(right.id)}
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
                        {currentRight.id ? "Редактировать право" : "Добавить право"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Название"
                            fullWidth
                            margin="normal"
                            value={currentRight.title}
                            onChange={(e) => setCurrentRight({ ...currentRight, title: e.target.value })}
                        />
                        <TextField
                            label="Описание"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={currentRight.description}
                            onChange={(e) =>
                                setCurrentRight({ ...currentRight, description: e.target.value })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Отмена</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveRight}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default RightsPage;
