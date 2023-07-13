import { AiOutlineZoomIn } from "react-icons/ai";
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
                    <span className="Nav_title">∑Hobby</span>
                    <div className="Navi">

                    <AiOutlineZoomIn /> &nbsp;
                        <div className="Search">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                // value={searchText}
                                // onChange={(e) => setSearchText(e.target.value)}
                            />
                            <button onClick={handleSearch}>
                            </button>
                        </div>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a className="Navs" href="/">
                            홈
                        </a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a className="Navs" href="/">
                            강의실
                        </a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a className="Navs" href="/mypage">
                            마이페이지
                        </a>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <a className="Navs" href="/">
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
