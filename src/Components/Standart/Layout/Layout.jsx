import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Blocks/Header/Header";
import BottomNav from "../../Blocks/BottomNavigation";

const Layout = () => {
    return (
        <>
            <Header />
            <main style={{ paddingTop: "64px" }}>
                {/* Контент страницы */}
                <Outlet />
            </main>
            <BottomNav />
        </>
    );
};

export default Layout;
