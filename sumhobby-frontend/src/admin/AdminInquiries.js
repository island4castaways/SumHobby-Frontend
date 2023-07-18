import { Button, Container, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useNavigate } from "react-router-dom";

function AdminInquiries() {
    const navigate = useNavigate();

    const [inquiries, setInquiries] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [original, setOriginal] = useState([]);
    const [admin, setAdmin] = useState({});

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
        call("/admin/inquiries", "GET", null).then((response) => {
            if(response.data) {
                setInquiries(response.data);
                setOriginal(response.data);
                setSortKey("inqAnswer");
                setSortMethod("desc");
            } else {
                alert("문의글 정보를 가져오는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        onSort(sortKey, sortMethod);
    }, [sortKey, sortMethod]);

    const onSort = (key, method) => {
        const tempInquiries = [...inquiries];
        const sortByAsc = (a, b) => (a[key] < b[key] ? -1 : 1);
        const sortByDesc = (a, b) => (a[key] > b[key] ? -1 : 1);
        const sortByAnswer = (a, b) => {
            if((a[key] && b[key]) || (!a[key] && !b[key])) {
                if(method === "asc") {
                    return sortByAsc;
                } else {
                    return sortByDesc;
                }
            } else {
                return a[key] ? 1 : -1;
            }
        }

        if(key === "inqAnswer") {
            setInquiries(tempInquiries.sort(sortByAnswer));
        } else {
            if(method === "asc") {
                setInquiries(tempInquiries.sort(sortByAsc));
            } else {
                setInquiries(tempInquiries.sort(sortByDesc));
            }    
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
        const filteredClasses = original.filter((inquiry) => {
            const value = inquiry[searchKey] && inquiry[searchKey].toString().toLowerCase();
            return value && value.includes(searchValue.toLowerCase());
        });
        setInquiries(filteredClasses);
    };

    const detail = (inquiry) => {
        navigate("/admin/inqAnswer", { state: { inquiry: inquiry } });
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
    };

    return (
        <Container>
            <h2>문의글 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <div>
                <TextField select value={searchKey} onChange={handleSearchKeyChange}>
                    <MenuItem value="inqNum">Num</MenuItem>
                    <MenuItem value="userId">UserId</MenuItem>
                    <MenuItem value="inqDate">Date</MenuItem>
                    <MenuItem value="inqAnswer">Answer</MenuItem>
                </TextField>
                <TextField label="Search" value={searchValue} onChange={handleSearchValueChange} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        {makeTHCell("Num", "inqNum")}
                        {makeTHCell("UserId", "userId")}
                        {makeTHCell("Date", "inqDate")}
                        {makeTHCell("Answer", "inqAnswer")}
                        <TableCell>Detail</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {inquiries.map((inquiry) => (
                        <TableRow key={inquiry.inqNum}>
                            <TableCell>{inquiry.inqNum}</TableCell>
                            <TableCell>{inquiry.userId}</TableCell>
                            <TableCell>{inquiry.inqDate}</TableCell>
                            <TableCell>{inquiry.inqAnswer ? "답변 완료" : "미답변"}</TableCell>
                            <TableCell>
                                <Button onClick={() => {detail(inquiry)}}>Detail</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    )
};

export default AdminInquiries;