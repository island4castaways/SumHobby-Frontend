import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useNavigate } from "react-router-dom";

function AdminInquiries() {
    const navigate = useNavigate();

    const [inquiries, setInquiries] = useState([]);
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if(response) {
                setAdmin(response);
                if(admin.role !== "관리자") {
                    navigate("/");
                }
            } else {
                alert("관리자 정보를 확인하는데 실패했습니다.");
            }
        });
    }, [admin, navigate]);

    useEffect(() => {
        call("/admin/inquiries", "GET", null).then((response) => {
            if(response.data) {
                setInquiries(response.data);
            } else {
                alert("문의글 정보를 가져오는데 실패했습니다.");
            }
        });
    }, []);

    const detail = (inquiry) => {
        navigate("/admin/inqAnswer", { state: { inquiry: inquiry } });
    }

    const returnToList = () => {
        navigate("/admin/menu");
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