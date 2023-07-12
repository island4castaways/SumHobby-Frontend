import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function CreateLecture() {
    const location = useLocation();
    const admin = location.state.admin;
    const classDTO = location.state.classDTO;
    const mode = location.state.lectureDTO ? "modify": "create";
    const lectureDTO = location.state.lectureDTO ? location.state.lectureDTO : null;

    const handleSubmit = (event) => {
        event.preventDefault();
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
    };

    const navigate = useNavigate();
    const createLecture = (lectureDTO) => {
        return call("/admin/createLecture", "POST", lectureDTO).then((response) => {
            if(response.data) {
                alert("강의 추가가 완료되었습니다.");
                navigate("/admin/lectures", {
                    state: {
                        admin: admin,
                        classDTO: classDTO
                    }
                });
            } else {
                alert("강의 추가를 실패했습니다.");
            }
        });
    };

    const modifyLecture = (lectureDTO) => {
        return call("/admin/modifyLecture", "PUT", lectureDTO).then((response) => {
            if(response.data) {
                alert("강의 수정이 완료되었습니다.");
                navigate("/admin/lectures", {
                    state: {
                        admin: admin,
                        classDTO: classDTO
                    }
                });
            } else {
                alert("강의 수정을 실패했습니다.");
            }
        });
    };

    const deleteLecture = (lectureDTO) => {
        return call("/admin/deleteLecture", "DELETE", lectureDTO).then((response) => {
            if(response.data) {
                alert("강의 삭제가 완료되었습니다.");
                navigate("/admin/lectures", {
                    state: {
                        admin: admin,
                        classDTO: classDTO
                    }
                });
            }
        });
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
            <form onSubmit={handleSubmit}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>
                                {lectureDTO ? (<h2>
                                    {classDTO.classNum}, {classDTO.className} 강의실 {lectureDTO.lecNum}, {lectureDTO.lecTitle} 수정 중
                                </h2>) : (<h2>
                                    {classDTO.classNum}, {classDTO.className} 강의 추가
                                </h2>)}
                                <h4>{admin.userName} 로그인</h4>
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
                                <Button type="submit" onClick={() => window.confirm("강의를 저장하겠습니까?")}>저장</Button>
                            </TableCell>
                            {lectureDTO ? (
                                <TableCell>
                                    <Button onClick={() => {
                                        window.confirm("강의를 삭제하겠습니까?")
                                        deleteLecture(lectureDTO)
                                        }}>
                                        삭제
                                    </Button>
                                </TableCell>
                            ) : (<></>)}
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </Container>
    );
}

export default CreateLecture;