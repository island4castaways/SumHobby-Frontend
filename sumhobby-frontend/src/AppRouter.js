import React from "react";
import "./index.css";
import { Box, Typography } from "@mui/material";
import AdminLogin from "./admin/AdminLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminMenu from "./admin/AdminMenu";
import Cart from './Cart';
import App from './App';
import AdminUsers from "./admin/AdminUsers";
import AdminClasses from "./admin/AdminClasses";
import CreateClass from "./admin/CreateClass";
import AdminLectures from "./admin/AdminLectures";
import CreateLecture from "./admin/CreateLecture";
import AdminInquiries from "./admin/AdminInquiries";
import AdminInqAnswer from "./admin/AdminInqAnswer";
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
            {"Copyright © "}
            IslandDevelopers, {new Date().getFullYear()}
        </Typography>
    );
};

function AppRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}/>
                    <Route path="admin" element={<AdminLogin />} />
                    <Route path="admin/menu" element={<AdminMenu />} />
                    <Route path="admin/users" element={<AdminUsers />} />
                    <Route path="admin/classes" element={<AdminClasses />} />
                    <Route path="admin/createClass" element={<CreateClass />} />
                    <Route path="admin/lectures" element={<AdminLectures />} />
                    <Route path="admin/createLecture" element={<CreateLecture />} />
                    <Route path="admin/inquiries" element={<AdminInquiries />} />
                    <Route path="admin/inqAnswer" element={<AdminInqAnswer />} />
                    <Route path="cart" element={<Cart/>}/>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="findid" element={<FindId />} />
                    <Route path="findpw" element={<FindPw />} />
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="changepw" element={<ChangePw />} />
                    <Route path="changeinfo" element={<ChangeInfo />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="inquiryboard" element={<InquiryBoardList />} />
                    <Route path="purchase" element={<PurchaseList />} />
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;