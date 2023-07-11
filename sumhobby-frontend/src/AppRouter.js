import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import SignUp from "./SignUp";
import FindId from "./FindId";
import FindPw from "./FindPw";
import MyPage from "./MyPage";
import ChangePw from "./ChangePw"
import ChangeInfo from "./ChangeInfo"
import FAQ from "./FAQ";
import PurchaseList from "./PurchaseList"
import InquiryBoardList from "./inquiryBoardList"
import { Box, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright ©"}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function AppRouter () {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="findid" element={<FindId />} />
                    <Route path="findpw" element={<FindPw />} />
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="changepw" element={<ChangePw />} />
                    <Route path="changeinfo" element={<ChangeInfo />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="inquiryboard" element={<InquiryBoardList />} />
                    <Route path="purchase" element={<PurchaseList/>}/>
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;