import Cart from './Cart';
import React from 'react';
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import "./index.css";
import App from './App';
import Checkout from './pages/Checkout.tsx';
import { SuccessPage } from './pages/Success.tsx';
import { FailPage } from './pages/Fail.tsx';


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
            <Route path="/" element={<App />}/>
            <Route path="cart" element={<Cart/>}/>
            <Route path="checkout" element={<Checkout/>}/>
            <Route path="success" element={<SuccessPage/>}/>
            <Route path="fail" element={<FailPage/>}/>
            </Routes>
            </BrowserRouter>
            <Box mt = {5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;