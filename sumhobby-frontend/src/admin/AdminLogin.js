import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { Button, Container, Table, TableCell, TableRow, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if(response) {
                if(response.role === "관리자") {
                    navigate("/admin/menu");
                }
            }
        }).catch((error) => {
            alert("사용자 정보를 확인하는데 실패했습니다.");
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const userId = data.get("adminId");
        const password = data.get("adminPw");
        //ApiService의 adminlogin 메서드 사용해서 login
        adminlogin({ userId: userId, password: password });
    };

    const adminlogin = (userDTO) => {
        return call("/admin/signin", "POST", userDTO).then((response) => {
            if(response.token) {
                localStorage.setItem("ACCESS_TOKEN", response.token);
                navigate("/admin/menu");
            }
        }).catch((error) => {
            alert("로그인을 실패했습니다.")
        });
    };

    return (
        <Container>
            <h2>관리자 로그인</h2>
            <form noValidate onSubmit={handleSubmit}>
                <Table>
                    <TableRow>
                        <TableCell>
                            <TextField
                                id="adminId"
                                label="adminID"
                                name="adminId"
                                autoComplete="adminId" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <TextField
                                id="adminPw"
                                label="adminPassword"
                                name="adminPw"
                                type="password"
                                autoComplete="adminPw" />
                            </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Button type="submit" color="primary">
                                로그인
                            </Button>
                        </TableCell>
                    </TableRow>
                </Table>
            </form>
        </Container>
    );
};

export default AdminLogin;