import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminLectures() {
    const location = useLocation();
    const navigate = useNavigate();

    const [lectures, setLectures] = useState([]);
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
        call("/admin/lectures", "PATCH", classDTO).then((response) => {
            if(response.data) {
                setLectures(response.data);
            } else {
                alert("강의 정보를 가져오는데 실패했습니다.");
            }
        });
    }, [classDTO]);

    const createLecture = () => {
        navigate("/admin/createLecture", {state: {classDTO: classDTO}});
    };

    const modifyLecture = (lectureDTO) => {
        navigate("/admin/createLecture", {state: {classDTO: classDTO, lectureDTO: lectureDTO}});
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
            <Button onClick={() => {createLecture()}}>강의 추가</Button>
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Num</TableCell>
                        <TableCell>ClassNum</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Detail</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>수정</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lectures.map((lecture) => (
                        <TableRow key={lecture.lecNum}>
                            <TableCell>{lecture.lecNum}</TableCell>
                            <TableCell>{lecture.classNum}</TableCell>
                            <TableCell>{lecture.lecTitle}</TableCell>
                            <TableCell>{lecture.lecDetail}</TableCell>
                            <TableCell>{lecture.lecUrl}</TableCell>
                            <TableCell>
                                <Button onClick={() => {modifyLecture(lecture)}}>수정</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={() => {createLecture()}}>강의 추가</Button>
        </Container>
    );
};

export default AdminLectures;