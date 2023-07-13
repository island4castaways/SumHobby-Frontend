import { CenterFocusStrong } from '@mui/icons-material';
import React from 'react';
import "./FAQ.css";


const Header = () => {
    return (
        <header >
            <a href="/mypage">마이페이지</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="/inquiryboard">FAQ</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="/faq">Q&A</a>
            <hr />
        </header>

    );
};

export default Header;