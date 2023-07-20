import { TextField } from "@mui/material";
import "./Nav.css";

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
                    <span className="Nav_title"><h1><a className="Navs" href="/home">∑Hobby</a></h1></span>
                    <div className="Search">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                id="searchKey"
                                name="searchKey"
                                placeholder="검색어를 입력하세요"
                            />
                            <button type="submit">검색</button>
                        </form>
                    </div>
                    <div className="Navi">
                        <a className="Navs" href="/home">
                            홈
                        </a>
                        <a className="Navs" href="/class">
                            내 강의실
                        </a>
                        <a className="Navs" href="/mypage">
                            마이페이지
                        </a>
                        <a className="Navs" href="/cart">
                            장바구니
                        </a>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Nav;