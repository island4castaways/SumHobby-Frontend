import "./Nav.css";

const Nav = () => {
    // const [searchText, setSearchText] = useState(""); // 검색어 상태 추가

    const handleSearch = () => {
        // 검색 기능 구현
        // 검색어 사용 예시: searchText
        // console.log("검색어:", searchText);
        // 검색 결과를 처리하는 로직을 추가하세요.
    };

    return (
        <div>
            <header>
                <nav className="Nav">
                    <span className="Nav_title"><h1><a className="Navs" href="/home">∑Hobby</a></h1></span>


                    <div className="Search">
                        <input
                            type="text"
                            placeholder="검색어를 입력하세요"
                        // value={searchText}
                        // onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button
                            fullWidth
                            onClick={handleSearch}> 검색
                        </button>

                    </div>
                    <div className="Navi">
                            <a className="Navs" href="/home">
                                홈
                            </a>
                        <a className="Navs" href="/class">
                            강의실
                        </a>
                        <a className="Navs" href="/mypage">
                            마이페이지
                        </a>
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