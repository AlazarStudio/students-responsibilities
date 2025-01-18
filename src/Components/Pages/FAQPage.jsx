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
import { faqData as initialFaqData } from "../../data";
import { AuthContext } from "../Blocks/AuthContext";

const FAQPage = () => {
    const [faqs, setFaqs] = useState(initialFaqData);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [currentFaq, setCurrentFaq] = useState({ id: null, question: "", answer: "" });

    const { user } = useContext(AuthContext); // Получение текущего пользователя

    const handleOpenDialog = (faq) => {
        setCurrentFaq(faq || { id: null, question: "", answer: "" });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentFaq({ id: null, question: "", answer: "" });
    };

    const handleSaveFaq = () => {
        if (currentFaq.id) {
            // Редактирование
            setFaqs((prevFaqs) =>
                prevFaqs.map((faq) => (faq.id === currentFaq.id ? currentFaq : faq))
            );
        } else {
            // Добавление
            setFaqs((prevFaqs) => [
                ...prevFaqs,
                { ...currentFaq, id: new Date().getTime() },
            ]);
        }
        handleCloseDialog();
    };

    const handleDeleteFaq = (id) => {
        setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq.id !== id));
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
                Часто задаваемые вопросы
            </Typography>

            {/* Кнопка добавления доступна только администратору */}
            {user?.role === "admin" && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                    onClick={() => handleOpenDialog()}
                >
                    Добавить вопрос
                </Button>
            )}

            <Grid container spacing={3}>
                {faqs.map((faq) => (
                    <Grid item xs={12} sm={6} key={faq.id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">{faq.question}</Typography>
                            <Typography variant="body2" gutterBottom>
                                {faq.answer}
                            </Typography>
                            {/* Кнопки редактирования и удаления доступны только администратору */}
                            {user?.role === "admin" && (
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenDialog(faq)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteFaq(faq.id)}
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
                        {currentFaq.id ? "Редактировать вопрос" : "Добавить вопрос"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Вопрос"
                            fullWidth
                            margin="normal"
                            value={currentFaq.question}
                            onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                        />
                        <TextField
                            label="Ответ"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={currentFaq.answer}
                            onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Отмена</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveFaq}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default FAQPage;
