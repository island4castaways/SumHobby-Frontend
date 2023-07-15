import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminUsers() {
    const location = useLocation();
    const navigate = useNavigate();

    const admin = location.state.admin;
    if(admin.role !== "관리자") {
        window.location.href = "/";
    };

    const [users, setUsers] = useState([]);
    const [sortKey, setSortKey] = useState("");

    useEffect(() => {
        call("/admin/users", "GET", null).then((response) => {
            if(response.data) {
                setUsers(response.data)
                setSortKey("role");
                onSort(sortKey);        
            } else {
                alert("사용자 데이터를 가져오는데 실패했습니다.");
            }
        });
    }, []);

    const teacherButton = (role) => {
        if(role === "일반" || role === "강사 신청") {
            return "승인"
        } else if(role === "강사") {
            return "승인 취소"
        }
    };

    const changeTeacher = (userDTO) => {
        call("/admin/users", "PUT", userDTO).then((response) => (
            setUsers(response.data)
        ));
    };

    const returnToList = () => {
        navigate("/admin/menu", { state: { admin: admin } })
    };

    const onSort = (sortKey) => {
        const tempUsers = [...users];
        setUsers(tempUsers.sort((a, b) => a[sortKey].localeCompare(b[sortKey])));
    };

    return (
        <Container>
            <h2>사용자 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            <Button onClick={() => {returnToList()}}>목록</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>UserId</TableCell>
                        <TableCell>UserName</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell onClick={() => onSort("role")}>Role</TableCell>
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
                            <TableCell data-title="role">{user.role}</TableCell>
                            <TableCell>
                                <Button onClick={() => changeTeacher(user)}>{teacherButton(user.role)}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminUsers;