import React, { createContext, useState } from "react";
import { userData } from "../../data"; // Импорт данных из data.js

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Проверяем данные из data.js
        const foundUser = userData.find(
            (u) => u.email === email && u.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("user", JSON.stringify(foundUser));
            return true; // Логин успешен
        }
        return false; // Логин неудачен
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
