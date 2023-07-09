import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";

function AdminClasses() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        call("/admin/classes", "GET", null).then((response) => (
            setClasses(response.data)
        ));
    }, []);

    return (
        <Paper>
            <h2>사용자 관리</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Button onClick={() => {}}>새 강의실</Button>
                        </TableCell>
                    </TableRow>
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
                                <Button onClick={() => {}}>수정</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default AdminClasses;