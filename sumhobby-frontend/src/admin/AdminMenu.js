import { Button, Container, Grid } from "@mui/material";
import { React } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminMenu() {
    const location = useLocation();
    const role = location.state.admin.role;
    if(role !== "관리자") {
        window.location.href = "/";
    };

    const navigate = useNavigate();

    const adminRedirect = (string) => {
        navigate("" + string, { state: { admin: location.state.admin } })
    }
    
    const adminLogout = () => {
        localStorage.setItem("ACCESS_TOKEN", null);
        window.location.href = "/";
    };

    return (
        <div className="AdminMenu">
            <Container>
                <Grid>
                    <h2>관리자 메뉴</h2>
                    <h4>{location.state.admin.userName} 로그인</h4>
                </Grid>
                <Grid>
                    <Button onClick={() => {adminRedirect("/admin/users")}}>
                        사용자 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={() => {adminRedirect("/admin/payments")}}>
                        결제 내역 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={() => {adminRedirect("/admin/classes")}}>
                        강의실 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={() => {adminRedirect("/admin/inquiries")}}>
                        문의글 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={() => {adminLogout()}}>
                        관리자 로그아웃
                    </Button>
                </Grid>
            </Container>
        </div>
    );
};

export default AdminMenu;