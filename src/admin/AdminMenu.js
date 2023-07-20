import { Button, Container, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { call } from "../service/ApiService";

function AdminMenu() {
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({});

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if(response) {
                if(response.role !== "관리자") {
                    navigate("/");
                } else {
                    setAdmin(response);
                }
            }
        }).catch((error) => {
            alert("관리자 정보를 확인하는데 실패했습니다.")
        });
    }, []);

    const adminLogout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/");
    };

    return (
        <div className="AdminMenu">
            <Container>
                <Grid>
                    <h2>관리자 메뉴</h2>
                    <h4>{admin.userName} 로그인</h4>
                </Grid>
                <Grid>
                    <Button onClick={() => navigate("/admin/users")}>
                        사용자 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={() => navigate("/admin/payments")}>
                        결제 내역 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={() => navigate("/admin/classes")}>
                        강의실 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={() => navigate("/admin/inquiries")}>
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