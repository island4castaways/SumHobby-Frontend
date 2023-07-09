import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";

function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        call("/admin/users", "GET", null).then((response) => (
            setUsers(response.data)
        ));
    }, []);

    const isTeacher = (teacher) => {
        if(teacher === 0) {
            return "해당 없음"
        } else if(teacher === 1) {
            return "강사 신청 상태"
        } else if(teacher === 2) {
            return "강사 승인 완료"
        }
    }

    const teacherButton = (teacher) => {
        if(teacher === 0 || teacher === 1) {
            return "승인"
        } else if(teacher === 2) {
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
                            <TableCell>
                                {isTeacher(user.teacher)}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => changeTeacher(user)}>{teacherButton(user.teacher)}</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default AdminUsers;