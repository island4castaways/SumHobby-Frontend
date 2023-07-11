import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React } from "react";
import { call } from "../service/ApiService";

function CreateClass() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const className = data.get("className");
        const userId = data.get("userId");
        const classDetail = data.get("classDetail");
        const classCategory = data.get("classCategory");
        const classPrice = data.get("classPrice");
        createClass({
            className: className, 
            userId: userId, 
            classDetail: classDetail, 
            classCategory: classCategory, 
            classPrice: classPrice
        });
    };

    const createClass = (classDTO) => {
        return call("/admin/createClass", "POST", classDTO).then((response) => {
            if(response.data) {
                alert("강의실 저장이 완료되었습니다.");
                window.location.href="/admin/classes";
            } else {
                alert("강의실 저장을 실패했습니다.");
            }
        });
    }

    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <h2>새 강의실</h2>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>className</TableCell>
                            <TableCell>
                                <TextField
                                    id="className"
                                    label="className"
                                    name="className" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>teacherId</TableCell>
                            <TableCell>
                                <TextField
                                    id="userId"
                                    label="userId"
                                    name="userId" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>classDetail</TableCell>
                            <TableCell>
                                <TextField
                                    id="classDetail"
                                    label="classDetail"
                                    name="classDetail" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>classCategory</TableCell>
                            <TableCell>
                                <TextField
                                    id="classCategory"
                                    label="classCategory"
                                    name="classCategory" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>classPrice</TableCell>
                            <TableCell>
                                <TextField
                                    id="classPrice"
                                    label="classPrice"
                                    name="classPrice" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Button type="submit" onClick={() => window.confirm("강의실을 저장하겠습니까?")}>저장</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        </Paper>
    );
};

export default CreateClass;