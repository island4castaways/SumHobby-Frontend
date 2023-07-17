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
import Login from "./user/Login";
import SignUp from "./user/SignUp";
import FindId from "./user/FindId";
import FindPw from "./user/FindPw";
import MyPage from "./user/MyPage";
import ChangePw from "./user/ChangePw";
import ChangeInfo from "./user/ChangeInfo";
import FAQ from "./user/FAQ";
import PurchaseList from "./user/PurchaseList";
import InquiryBoardList from "./user/inquiryBoardList";
import Class from "./class/Class";
import Home from "./Home";
import Nav from "./nav/Nav";
import ClassDetail from "./class/ClassDetail";
import AddReview from "./class/AddReview";
import ShowReview from "./class/ShowReview";
import LectureDetail from "./class/LectureDetail";
import AdminPayments from "./admin/AdminPayments";
import AdminReviews from "./admin/AdminReviews";
import StarRating from "./class/StarRating";
import Checkout from "./pages/Checkout.tsx";
import { SuccessPage } from "./pages/Success.tsx";
import { FailPage } from "./pages/Fail.tsx";
import MyClasses from "./user/MyClasses";


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
            <Box marginBottom={5}>
                <Nav />
            </Box>
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
                    <Route path="admin/payments" element={<AdminPayments />} />
                    <Route path="admin/reviews" element={<AdminReviews />} />
                    <Route path="cart" element={<Cart />} />
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
                    <Route path="myclasses" element={<MyClasses />} />
                    <Route path="home" element={<Home />} />
                    <Route path="class" element={<Class />} />
                    <Route path="classdetail" element={<ClassDetail />} />
                    <Route path="addreview" element={<AddReview />} />
                    <Route path="showreview" element={<ShowReview />} />
                    <Route path="lecture" element={<LectureDetail />} />
                    <Route path="star" element={<StarRating />} />
                    <Route path="checkout" element={<Checkout/>}/>
                    <Route path="success" element={<SuccessPage/>}/>
                    <Route path="fail" element={<FailPage/>}/>
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;
