import { React, useEffect, useState } from "react";
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminClasses() {
    const location = useLocation();
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortMethod, setSortMethod] = useState("");

    const admin = location.state.admin;

    useEffect(() => {
        if(admin.role !== "관리자") {
            navigate("/");
            return null;
        }
    }, [admin.role, navigate]);

    useEffect(() => {
        call("/admin/classes", "GET", null).then((response) => {
            if(response.data) {
                setClasses(response.data);
                setSortKey("classLastDate");
                setSortMethod("asc");
            } else {
                alert("강의실 데이터를 가져오는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        onSort(sortKey, sortMethod);
    }, [sortKey, sortMethod]);

    const onSort = (key, method) => {
        const tempClasses = [...classes];
        const sortByAsc = (a, b) => (a[key] < b[key] ? -1 : 1);
        const sortByDesc = (a, b) => (a[key] > b[key] ? -1 : 1);
        if(method === "asc") {
            setClasses(tempClasses.sort(sortByAsc));
        } else {
            setClasses(tempClasses.sort(sortByDesc));
        }
    };

    const columnClicked = (key) => {
        if(sortKey === key) {
            if(sortMethod === "asc") {
                setSortMethod("desc");
            } else {
                setSortMethod("asc");
            }
        } else {
            setSortKey(key);
            setSortMethod("asc");
        }
    }

    const adminLectures = (classDTO) => {
        return (
            navigate("/admin/lectures", {
                state: {
                    admin: admin,
                    classDTO: classDTO
                }
            })
        )
    };

    const createClass = () => {
        return (
            navigate("/admin/createClass", { state: { admin: admin } })
        )
    }

    const modifyClass = (classDTO) => {
        return (
            navigate("/admin/createClass", {
                state: {
                    admin: admin,
                    classDTO: classDTO
                }
            })
        )
    }

    const returnToList = () => {
        navigate("/admin/menu", { state: { admin: admin } })
    }

    const makeTHCell = (name, key) => {
        if(key === sortKey) {
            if(sortMethod === "asc") {
                return <TableCell onClick={() => columnClicked(key)}>{name} ↑</TableCell>
            } else {
                return <TableCell onClick={() => columnClicked(key)}>{name} ↓</TableCell>
            }
        } else {
            return <TableCell onClick={() => columnClicked(key)}>{name}</TableCell>
        }
    }

    return (
        <Container>
            <h2>강의실 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            <Button onClick={() => {createClass()}}>새 강의실</Button>
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        {makeTHCell("Num", "classNum")}
                        {makeTHCell("Name", "className")}
                        {makeTHCell("Teacher", "userId")}
                        {makeTHCell("Category", "classCategory")}
                        {makeTHCell("Image", "classImg")}
                        {makeTHCell("Rate", "classRate")}
                        {makeTHCell("Price", "classPrice")}
                        {makeTHCell("FirstUploaded", "classSetDate")}
                        {makeTHCell("LastUpdated", "classLastDate")}
                        <TableCell>수정</TableCell>
                        <TableCell>강의 관리</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {classes.map((classroom) => (
                        <TableRow key={classroom.classNum}>
                            <TableCell>{classroom.classNum}</TableCell>
                            <TableCell>{classroom.className}</TableCell>
                            <TableCell>{classroom.userId}</TableCell>
                            <TableCell>{classroom.classCategory}</TableCell>
                            <TableCell>{classroom.classImg}</TableCell>
                            <TableCell>{classroom.classRate}</TableCell>
                            <TableCell>{classroom.classPrice}</TableCell>
                            <TableCell>{classroom.classSetDate}</TableCell>
                            <TableCell>{classroom.classLastDate}</TableCell>
                            <TableCell>
                                <Button onClick={() => {modifyClass(classroom)}}>수정</Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => {adminLectures(classroom)}}>관리</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminClasses;