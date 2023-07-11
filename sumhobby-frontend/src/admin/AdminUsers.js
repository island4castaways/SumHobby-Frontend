import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation } from "react-router-dom";

function AdminUsers() {
    const location = useLocation();
    const admin = location.state.admin;
    if(admin.role !== "관리자") {
        window.location.href = "/";
    };

    const [users, setUsers] = useState([]);
    useEffect(() => {
        call("/admin/users", "GET", null).then((response) => (
            setUsers(response.data)
        ));
    }, []);

    const teacherButton = (role) => {
        if(role === "일반" || role === "강사 신청") {
            return "승인"
        } else if(role === "강사") {
            return "승인 취소"
        }
    }

    function changeTeacher(userDTO) {
        call("/admin/users", "PUT", userDTO).then((response) => (
            setUsers(response.data)
        ));
    }

    return (
        <Paper>
            <h2>사용자 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>UserId</TableCell>
                        <TableCell>UserName</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>강사 여부</TableCell>
                        <TableCell>강사 승인</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.userTk}>
                            <TableCell>{user.userId}</TableCell>
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Button onClick={() => changeTeacher(user)}>{teacherButton(user.role)}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default AdminUsers;