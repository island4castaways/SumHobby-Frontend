import { Button, Container, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [original, setOriginal] = useState([]);
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        if(admin.role !== "관리자") {
            navigate("/");
            return null;
        }
    }, [admin.role, navigate]);

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if(response) {
                setAdmin(response);
            } else {
                alert("관리자 정보를 확인하는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        call("/admin/users", "GET", null).then((response) => {
            if(response.data) {
                setUsers(response.data);
                setOriginal(response.data);
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
        call("/admin/users", "PUT", userDTO).then((response) => {
            if(response.data) {
                setUsers(response.data);
                setOriginal(response.data);
                setSortKey("role");
                setSortMethod("asc")
            } else {
                alert("사용자 데이터를 가져오는데 실패했습니다.");
            }
        });
    };

    const handleSearchKeyChange = (event) => {
        setSearchKey(event.target.value);
    };
    
    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };
    
    const handleSearch = () => {
        const filteredUsers = original.filter((user) => {
            const value = user[searchKey] && user[searchKey].toString().toLowerCase();
            return value && value.includes(searchValue.toLowerCase());
        });
        setUsers(filteredUsers);
    };

    const returnToList = () => {
        navigate("/admin/menu");
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
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <div>
                <TextField select value={searchKey} onChange={handleSearchKeyChange}>
                    <MenuItem value="userId">UserId</MenuItem>
                    <MenuItem value="userName">UserName</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="role">Role</MenuItem>
                </TextField>
                <TextField label="Search" value={searchValue} onChange={handleSearchValueChange} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
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