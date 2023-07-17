import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function CreateClass() {
    const location = useLocation();
    const navigate = useNavigate();

    const [admin, setAdmin] = useState({});

    const mode = location.state.classDTO ? "modify" : "create";
    const classDTO = location.state.classDTO ? location.state.classDTO : null;

    useEffect(() => {
        if(admin.role === "관리자") {
            navigate("/admin/menu");
            return null;
        }
    }, [admin.role, navigate]);

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            setAdmin(response);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const confirm = window.confirm("강의실을 저장하겠습니까?");
        if(confirm) {
            const data = new FormData(event.target);
            const className = data.get("className");
            const userId = data.get("userId");
            const classDetail = data.get("classDetail");
            const classImg = data.get("classImg");
            const classCategory = data.get("classCategory");
            const classPrice = data.get("classPrice");
            if(mode === "create") {
                createClass({
                    className: className,
                    userId: userId,
                    classDetail: classDetail,
                    classImg: classImg,
                    classCategory: classCategory,
                    classPrice: classPrice
                });    
            } else if(mode === "modify") {
                modifyClass({
                    classNum: classDTO.classNum,
                    className: className,
                    userId: userId,
                    classDetail: classDetail,
                    classImg: classImg,
                    classCategory: classCategory,
                    classPrice: classPrice
                });
            }    
        }
    };

    const createClass = (classDTO) => {
        return call("/admin/createClass", "POST", classDTO).then((response) => {
            if(response.data) {
                alert("강의실 저장이 완료되었습니다.");
                navigate("/admin/classes");
            } else {
                alert("강의실 저장을 실패했습니다.");
            }
        });
    };

    const modifyClass = (classDTO) => {
        return call("/admin/modifyClass", "PUT", classDTO).then((response) => {
            if(response.data) {
                alert("강의실 수정이 완료되었습니다.");
                navigate("/admin/classes");
            } else {
                alert("강의실 수정을 실패했습니다.");
            }
        });
    };

    const deleteClass = (classDTO) => {
        return call("/admin/deleteClass", "DELETE", classDTO).then((response) => {
            if(response.data) {
                alert("강의실 삭제가 완료되었습니다.");
                navigate("/admin/classes");                
            } else {
                alert("강의실 삭제를 실패했습니다.");
            }
        });
    };

    const returnToList = () => {
        navigate("/admin/classes");
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
                    defaultValue={classDTO[id]} />
            );
        }
    };

    return (
        <Container>
            {classDTO ? (<h2>{classDTO.classNum}, {classDTO.className} 수정 중</h2>) : (<h2>새 강의실</h2>)}
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
                            <TableCell>className</TableCell>
                            <TableCell>
                                {textField(mode, "className")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>teacherId</TableCell>
                            <TableCell>
                                {textField(mode, "userId")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>classDetail</TableCell>
                            <TableCell>
                                {textField(mode, "classDetail")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>classCategory</TableCell>
                            <TableCell>
                                {textField(mode, "classCategory")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>classImg</TableCell>
                            <TableCell>
                                {textField(mode, "classImg")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>classPrice</TableCell>
                            <TableCell>
                                {textField(mode, "classPrice")}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button type="submit">저장</Button>
                            </TableCell>
                            {classDTO ? (
                                <TableCell>
                                    <Button onClick={() => {
                                        if(window.confirm("강의실을 삭제하겠습니까?")) {
                                            deleteClass(classDTO);
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
};

export default CreateClass;