import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Main_Page from "./Components/Pages/Main_Page";
import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";
import LoginPage from "./Components/Pages/LoginPage";
import { AuthContext } from "./Components/Blocks/AuthContext";

import RightsPage from "./Components/Pages/RightsPage";
import ObligationsPage from "./Components/Pages/ObligationsPage";
import FAQPage from "./Components/Pages/FAQPage";
import ContactsPage from "./Components/Pages/ContactsPage";
import RegistrationPage from "./Components/Pages/RegistrationPage";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Main_Page />} />
          <Route path="/rights" element={<RightsPage />} />
          <Route path="/obligations" element={<ObligationsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>

      {/* Кнопка установки */}
      <InstallButton />
    </>
  );
}

export default App;
