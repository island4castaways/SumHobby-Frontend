import { React, useEffect, useState } from "react";
import { Button, Container, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { call } from "../service/ApiService";
import { useNavigate } from "react-router-dom";

function AdminClasses() {
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [original, setOriginal] = useState([]);
    const [admin, setAdmin] = useState({});

    useEffect(() => {
        if(admin.role !== "관리자") {
            navigate("/");
            return null;
        }
    }, [admin.role, navigate]);

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if(response) {
                setAdmin(response);
            } else {
                alert("관리자 정보를 확인하는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        call("/admin/classes", "GET", null).then((response) => {
            if(response.data) {
                setClasses(response.data);
                setOriginal(response.data);
                setSortKey("classLastDate");
                setSortMethod("asc");
            } else {
                alert("강의실 정보를 가져오는데 실패했습니다.");
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

    const handleSearchKeyChange = (event) => {
        setSearchKey(event.target.value);
    };
    
    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };
    
    const handleSearch = () => {
        const filteredClasses = original.filter((classroom) => {
            const value = classroom[searchKey] && classroom[searchKey].toString().toLowerCase();
            return value && value.includes(searchValue.toLowerCase());
        });
        setClasses(filteredClasses);
    };

    const adminLectures = (classDTO) => {
        navigate("/admin/lectures", {state: {classDTO: classDTO}});
    };

    const createClass = () => {
        navigate("/admin/createClass");
    }

    const modifyClass = (classDTO) => {
        navigate("/admin/createClass", {state: {classDTO: classDTO}});
    }

    const returnToList = () => {
        navigate("/admin/menu");
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
            <div>
                <TextField select value={searchKey} onChange={handleSearchKeyChange}>
                    <MenuItem value="classNum">Num</MenuItem>
                    <MenuItem value="className">Name</MenuItem>
                    <MenuItem value="userId">Teacher</MenuItem>
                    <MenuItem value="classCategory">Category</MenuItem>
                </TextField>
                <TextField label="Search" value={searchValue} onChange={handleSearchValueChange} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
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