import React from "react";
import { AiOutlineZoomIn } from "react-icons/ai";
import "./Nav.css";
import { TextField } from "@mui/material";

const Nav = () => {
    const handleSearch = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const searchKey = data.get("searchKey");
        window.location.href = `${window.location.origin}/allclasses?search=${searchKey}`;
    };

    return (
        <div>
            <header>
                <nav className="Nav">
                    <span className="Nav_title">∑Hobby</span>
                    <div className="Navi">

                        <AiOutlineZoomIn /> &nbsp;
                        <div className="Search">
                            <form onSubmit={handleSearch}>
                                <TextField
                                    type="text"
                                    id="searchKey"
                                    name="searchKey"
                                    placeholder="검색어를 입력하세요"
                                />
                                <button type="submit">
                                </button>

                            </form>
                        </div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="Navs" href="/home">
                            홈
                        </a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a className="Navs" href="/class">
                            강의실
                        </a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a className="Navs" href="/mypage">
                            마이페이지
                        </a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a className="Navs" href="/cart">
                            장바구니
                        </a>
                        &nbsp;&nbsp;&nbsp;
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Nav;
