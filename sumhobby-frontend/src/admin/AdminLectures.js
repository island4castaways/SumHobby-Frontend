import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminLectures() {
    const location = useLocation();
    const admin = location.state.admin;
    if(admin.role !== "관리자") {
        window.location.href = "/";
    };
    const classDTO = location.state.classDTO;

    const [lectures, setLectures] = useState([]);
    useEffect(() => {
        call("/admin/lectures", "PATCH", classDTO).then((response) => {
            setLectures(response.data)
        });
    }, [classDTO]);

    const navigate = useNavigate();
    const createLecture = () => {
        return (
            navigate("/admin/createLecture", {
                state: {
                    admin: admin,
                    classDTO: classDTO
                }
            })
        );
    };

    const modifyLecture = (lectureDTO) => {
        return (
            navigate("/admin/createLecture", {
                state: {
                    admin: admin,
                    classDTO: classDTO,
                    lectureDTO: lectureDTO
                }
            })
        )
    }

    return (
        <Container>
            <h2>강의 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            {classDTO && (
                <h5>{classDTO.classNum}, {classDTO.className} 강의실</h5>
            )}
            <Button onClick={() => {createLecture()}}>강의 추가</Button>
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