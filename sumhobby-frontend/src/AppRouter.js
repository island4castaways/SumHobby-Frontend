import Cart from './Cart';
import React from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import "./index.css";

function Copyright(){
    return(
        <Typography variant = "body2" color="textSecondary" align="center">
            {"Copyright © "}
            fsoftwareengineer, {new Date().getFullYear() }
            {"."}
        </Typography>
    );
}

function AppRouter(){

    return(
        <div>
            <BrowserRouter>
            <Routes>
            <Route path="cart" element={<Cart/>}/>
            </Routes>
            </BrowserRouter>
            <Box mt = {5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;