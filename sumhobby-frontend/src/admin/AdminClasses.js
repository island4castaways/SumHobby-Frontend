import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminClasses() {
    const location = useLocation();
    const admin = location.state.admin;
    if(admin.role !== "관리자") {
        window.location.href = "/";
    };

    const [classes, setClasses] = useState([]);
    useEffect(() => {
        call("/admin/classes", "GET", null).then((response) => (
            setClasses(response.data)
        ));
    }, []);

    const navigate = useNavigate();
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

    return (
        <Container>
            <h2>강의실 관리</h2>
            <Button onClick={() => {createClass()}}>새 강의실</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Num</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Teacher</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Uploaded</TableCell>
                        <TableCell>LastUpdated</TableCell>
                        <TableCell>수정</TableCell>
                        <TableCell>Lecture</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classes.map((classroom) => (
                        <TableRow key={classroom.classNum}>
                            <TableCell>{classroom.classNum}</TableCell>
                            <TableCell>{classroom.className}</TableCell>
                            <TableCell>{classroom.userId}</TableCell>
                            <TableCell>{classroom.classCategory}</TableCell>
                            <TableCell>{classroom.classRate}</TableCell>
                            <TableCell>{classroom.classPrice}</TableCell>
                            <TableCell>{classroom.classSetDate}</TableCell>
                            <TableCell>{classroom.classLastDate}</TableCell>
                            <TableCell>
                                <Button onClick={() => {modifyClass(classroom)}}>수정</Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => {adminLectures(classroom)}}>Lecture</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminClasses;