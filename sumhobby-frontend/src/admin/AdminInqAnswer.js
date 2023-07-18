import { Button, Container, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminInqAnswer() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const [inquiry, setInquiry] = useState(location.state.inquiry);
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if(response) {
                if(response.role !== "관리자") {
                    navigate("/");
                } else {
                    setAdmin(response);
                }
            } else {
                alert("관리자 정보를 확인하는데 실패했습니다.");
            }
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const confirm = window.confirm("답변 내용을 저장하겠습니까?");
        if(confirm) {
            const data = new FormData(event.target);
            const inqAnswer = data.get("inqAnswer");
            saveInqAnswer({
                inqNum: inquiry.inqNum,
                inqAnswer: inqAnswer
            });
        }
    };

    const saveInqAnswer = (inquiryDTO) => {
        return call("/admin/inqAnswer", "POST", inquiryDTO).then((response) => {
            if(response) {
                alert("답변 저장이 완료되었습니다.");
                getInquiry(response);
            } else {
                alert("답변 저장을 실패했습니다.");
            }
        });
    };

    const deleteInqAnswer = (inquiryDTO) => {
        return call("/admin/deleteInqAnswer", "DELETE", inquiryDTO).then((response) => {
            if(response) {
                alert("답변 삭제가 완료되었습니다.");
                getInquiry(response);
            } else {
                alert("답변 삭제를 실패했습니다.");
            }
        });
    };

    const getInquiry = () => {
        return call("/admin/inquiry", "PATCH", inquiry).then((response) => {
            if(response) {
                setInquiry(response);
            } else {
                alert("문의글 정보를 가져오는데 실패했습니다.");
            }
        });
    };

    const returnToList = () => {
        navigate("/admin/inquiries");
    };

    const inqAnswer = () => {
        if(inquiry.inqAnswer) {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>답변 내용</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>AnswerDate</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{inquiry.inqAnsDate}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    id="inqAnswer"
                                    label="inqAnswer"
                                    name="inqAnswer"
                                    defaultValue={inquiry.inqAnswer} />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button type="submit">수정</Button>
                                <Button onClick={() => {
                                    if(window.confirm("답변을 삭제하겠습니까?")) {
                                        deleteInqAnswer(inquiry);
                                    }}}>
                                    삭제
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )
        } else {
            return (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>답변 작성</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    id="inqAnswer"
                                    label="inqAnswer"
                                    name="inqAnswer" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button type="submit">저장</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            )
        }
    }

    return (
        <Container>
            <h2>{inquiry.inqNum}, {inquiry.userId} 문의글 Detail</h2>
            <h4>{admin.userName} 로그인</h4>
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>문의 내용</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell>{inquiry.inqDate}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Paper>{inquiry.inqContent}</Paper>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <form onSubmit={handleSubmit}>
                {inqAnswer()}
            </form>
        </Container>
    )
};

export default AdminInqAnswer;