import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminUsers() {
    const location = useLocation();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortMethod, setSortMethod] = useState("");

    const admin = location.state.admin;

    useEffect(() => {
        if(admin.role !== "관리자") {
            navigate("/");
            return null;
        }
    }, [admin.role, navigate]);

    useEffect(() => {
        call("/admin/users", "GET", null).then((response) => {
            if(response.data) {
                setUsers(response.data);
                setSortKey("role");
                setSortMethod("asc")
            } else {
                alert("사용자 데이터를 가져오는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        onSort(sortKey, sortMethod);
    }, [sortKey, sortMethod]);

    const onSort = (key, method) => {
        const tempUsers = [...users];
        const sortByAsc = (a, b) => (a[key] < b[key] ? -1 : 1);
        const sortByDesc = (a, b) => (a[key] > b[key] ? -1 : 1);
        const sortByRole = (a, b) => {
            if((a[key] === "강사 신청" && b[key] === "강사 신청")
                || (a[key] !== "강사 신청" && b[key] !== "강사 신청")) {
                if(method === "asc") {
                    return sortByAsc;
                } else {
                    return sortByDesc;
                }
            } else {
                return (a[key] === "강사 신청") ? -1 : 1;
            }
        }

        if(key === "role") {
            setUsers(tempUsers.sort(sortByRole));
        } else {
            if(method === "asc") {
                setUsers(tempUsers.sort(sortByAsc));
            } else {
                setUsers(tempUsers.sort(sortByDesc));
            }
        }
    };

    const columnClicked = (key) => {
        if(sortKey === key) {
            if(sortMethod === "asc") {
                setSortMethod("desc");
            } else {
                setSortMethod("asc");
            }
        } else {
            setSortKey(key);
            setSortMethod("asc");
        }
    }

    const changeTeacher = (userDTO) => {
        setSortKey("");
        call("/admin/users", "PUT", userDTO).then((response) => {
            setUsers(response.data);
            setSortKey("role");
            setSortMethod("asc")
        });
    };

    const returnToList = () => {
        navigate("/admin/menu", { state: { admin: admin } })
    };

    const teacherButton = (role) => {
        if(role === "일반" || role === "강사 신청") {
            return "승인"
        } else if(role === "강사") {
            return "승인 취소"
        }
    };

    const makeTHCell = (name, key) => {
        if(key === sortKey) {
            if(sortMethod === "asc") {
                return <TableCell onClick={() => columnClicked(key)}>{name} ↑</TableCell>
            } else {
                return <TableCell onClick={() => columnClicked(key)}>{name} ↓</TableCell>
            }
        } else {
            return <TableCell onClick={() => columnClicked(key)}>{name}</TableCell>
        }
    }

    return (
        <Container>
            <h2>사용자 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            <Button onClick={() => {returnToList()}}>목록</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        {makeTHCell("UserId", "userId")}
                        {makeTHCell("UserName", "userName")}
                        {makeTHCell("Phone", "phone")}
                        {makeTHCell("Email", "email")}
                        {makeTHCell("Role", "role")}
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
        </Container>
    );
};

export default AdminUsers;