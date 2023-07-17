import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function CreateLecture() {
    const location = useLocation();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({});

    const classDTO = location.state.classDTO;
    const mode = location.state.lectureDTO ? "modify" : "create";
    const lectureDTO = location.state.lectureDTO ? location.state.lectureDTO : null;

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

    const handleSubmit = (event) => {
        event.preventDefault();
        const confirm = window.confirm("강의를 저장하겠습니까?");
        if(confirm) {
            const data = new FormData(event.target);
            const lecTitle = data.get("lecTitle");
            const lecDetail = data.get("lecDetail");
            const lecUrl = data.get("lecUrl");
            if(mode === "create") {
                createLecture({
                    lecTitle: lecTitle,
                    lecDetail: lecDetail,
                    lecUrl: lecUrl,
                    classNum: classDTO.classNum
                });    
            } else if(mode === "modify") {
                modifyLecture({
                    lecNum: lectureDTO.lecNum,
                    lecTitle: lecTitle,
                    classNum: classDTO.classNum,
                    lecDetail: lecDetail,
                    lecUrl: lecUrl
                });
            }
        }
    };

    const createLecture = (lectureDTO) => {
        return call("/admin/createLecture", "POST", lectureDTO).then((response) => {
            if(response.data) {
                alert("강의 추가가 완료되었습니다.");
                navigate("/admin/lectures", {state: {classDTO: classDTO}});
            } else {
                alert("강의 추가를 실패했습니다.");
            }
        });
    };

    const modifyLecture = (lectureDTO) => {
        return call("/admin/modifyLecture", "PUT", lectureDTO).then((response) => {
            if(response.data) {
                alert("강의 수정이 완료되었습니다.");
                navigate("/admin/lectures", {state: {classDTO: classDTO}});
            } else {
                alert("강의 수정을 실패했습니다.");
            }
        });
    };

    const deleteLecture = (lectureDTO) => {
        return call("/admin/deleteLecture", "DELETE", lectureDTO).then((response) => {
            if(response.data) {
                alert("강의 삭제가 완료되었습니다.");
                navigate("/admin/lectures", {state: {classDTO: classDTO}});
            }
        });
    };

    const returnToList = () => {
        navigate("/admin/lectures", {state: {classDTO: classDTO}});
    };

    const textField = (mode, id) => {
        if(mode === "create") {
            return (
                <TextField
                    id={id}
                    label={id}
                    name={id} />
            );
        } else if(mode === "modify") {
            return (
                <TextField
                    id={id}
                    label={id}
                    name={id}
                    defaultValue={lectureDTO[id]} />
            );
        }
    };

    return (
        <Container>
            {lectureDTO ? (<h2>
                {classDTO.classNum}, {classDTO.className} 강의실 {lectureDTO.lecNum}, {lectureDTO.lecTitle} 수정 중
            </h2>) : (<h2>
                {classDTO.classNum}, {classDTO.className} 강의 추가
            </h2>)}
            <h4>{admin.userName} 로그인</h4>
            <form onSubmit={handleSubmit}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Button onClick={() => {returnToList()}}>이전 목록</Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        <TableRow>
                            <TableCell>lecTitle</TableCell>
                            <TableCell>
                                {textField(mode, "lecTitle")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>lecDetail</TableCell>
                            <TableCell>
                                {textField(mode, "lecDetail")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>lecUrl</TableCell>
                            <TableCell>
                                {textField(mode, "lecUrl")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button type="submit">저장</Button>
                            </TableCell>
                            {lectureDTO ? (
                                <TableCell>
                                    <Button onClick={() => {
                                        if(window.confirm("강의를 삭제하겠습니까?")) {
                                            deleteLecture(lectureDTO);
                                        }}}>
                                        삭제
                                    </Button>
                                </TableCell>
                            ) : null}
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </Container>
    );
}

export default CreateLecture;