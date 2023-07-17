import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminReviews() {
    const location = useLocation();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [admin, setAdmin] = useState({});

    const classDTO = location.state.classDTO;

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

    useEffect(() => {
        call("/admin/reviews", "PATCH", classDTO).then((response) => {
            if(response.data) {
                setReviews(response.data);
            } else {
                alert("리뷰를 가져오는데 실패했습니다.");
            }
        });
    }, [classDTO]);

    const deleteReview = (reviewDTO) => {
        call("/admin/deleteReview", "DELETE", reviewDTO).then((response) => {
            if(response.data) {
                setReviews(response.data);
            } else {
                alert("리뷰를 삭제하는데 실패했습니다.");
            }
        });
    };

    const returnToList = () => {
        navigate("/admin/classes");
    };

    return (
        <Container>
            <h2>강의 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            {classDTO && (
                <h5>{classDTO.classNum}, {classDTO.className} 강의실</h5>
            )}
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Num</TableCell>
                        <TableCell>UserId</TableCell>
                        <TableCell>Content</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>삭제</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review.revNum}>
                            <TableCell>{review.revNum}</TableCell>
                            <TableCell>{review.userId}</TableCell>
                            <TableCell>{review.revContent}</TableCell>
                            <TableCell>{review.revRate}</TableCell>
                            <TableCell>{review.revDate}</TableCell>
                            <TableCell>
                                <Button onClick={() =>{
                                    if(window.confirm("리뷰를 삭제하겠습니까?")) {
                                        deleteReview(review);
                                    }
                                }}>
                                    삭제
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminReviews;