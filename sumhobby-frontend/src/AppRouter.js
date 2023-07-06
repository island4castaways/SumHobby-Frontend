import React from "react";
import "./index.css";
import { Box, Typography } from "@mui/material";
import AdminLogin from "./admin/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMenu from "./admin/AdminMenu";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            CastawaysEngineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/menu" element={<AdminMenu />} />
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;