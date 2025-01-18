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
import { contactsData as initialContactsData } from "../../data";
import { AuthContext } from "../Blocks/AuthContext";

const ContactsPage = () => {
    const [contacts, setContacts] = useState(initialContactsData);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({
        id: null,
        name: "",
        phone: "",
        email: "",
    });

    const { user } = useContext(AuthContext); // Получение текущего пользователя

    const handleOpenDialog = (contact) => {
        setCurrentContact(contact || { id: null, name: "", phone: "", email: "" });
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setCurrentContact({ id: null, name: "", phone: "", email: "" });
    };

    const handleSaveContact = () => {
        if (currentContact.id) {
            // Редактирование
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id === currentContact.id ? currentContact : contact
                )
            );
        } else {
            // Добавление
            setContacts((prevContacts) => [
                ...prevContacts,
                { ...currentContact, id: new Date().getTime() },
            ]);
        }
        handleCloseDialog();
    };

    const handleDeleteContact = (id) => {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
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
                Контакты
            </Typography>

            {/* Кнопка добавления доступна только администратору */}
            {user?.role === "admin" && (
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginBottom: 2 }}
                    onClick={() => handleOpenDialog()}
                >
                    Добавить контакт
                </Button>
            )}

            <Grid container spacing={3}>
                {contacts.map((contact) => (
                    <Grid item xs={12} sm={6} key={contact.id}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6">{contact.name}</Typography>
                            <Typography variant="body2">Телефон: {contact.phone}</Typography>
                            <Typography variant="body2">Email: {contact.email}</Typography>
                            {/* Кнопки редактирования и удаления доступны только администратору */}
                            {user?.role === "admin" && (
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenDialog(contact)}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeleteContact(contact.id)}
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
                        {currentContact.id ? "Редактировать контакт" : "Добавить контакт"}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Название"
                            fullWidth
                            margin="normal"
                            value={currentContact.name}
                            onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
                        />
                        <TextField
                            label="Телефон"
                            fullWidth
                            margin="normal"
                            value={currentContact.phone}
                            onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            value={currentContact.email}
                            onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Отмена</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveContact}>
                            Сохранить
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default ContactsPage;
