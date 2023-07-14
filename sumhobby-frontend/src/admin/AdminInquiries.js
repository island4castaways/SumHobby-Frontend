import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminInquiries() {
    const location = useLocation();
    const navigate = useNavigate();

    const admin = location.state.admin;
    if(admin.role !== "관리자") {
        window.location.href = "/";
    };

    const [inquiries, setInquiries] = useState([]);
    useEffect(() => {
        call("/admin/inquiries", "GET", null).then((response) => (
            setInquiries(response.data)
        ));
    }, []);

    const detail = (inquiry) => {
        navigate("/admin/inqAnswer", { state: { admin: admin, inquiry: inquiry } })
    }

    const returnToList = () => {
        navigate("/admin/menu", { state: { admin: admin } })
    }

    return (
        <Container>
            <h2>문의글 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Num</TableCell>
                        <TableCell>UserId</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Answer</TableCell>
                        <TableCell>Detail</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.inqNum}>
                            <TableCell>{inquiry.inqNum}</TableCell>
                            <TableCell>{inquiry.userId}</TableCell>
                            <TableCell>{inquiry.inqDate}</TableCell>
                            <TableCell>{inquiry.inqAnswer ? "답변 완료" : "미답변"}</TableCell>
                            <TableCell>
                                <Button onClick={() => {detail(inquiry)}}>Detail</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
};

export default AdminInquiries;