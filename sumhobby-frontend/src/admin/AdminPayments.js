import { React, useEffect, useState } from "react";
import { Button, Container, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { call } from "../service/ApiService";
import { useNavigate } from "react-router-dom";

function AdminPayments() {
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
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
        call("/admin/payments", "GET", null).then((response) => {
            if(response.data) {
                setPayments(response.data);
                setOriginal(response.data);
                setSortKey("payDate");
                setSortMethod("desc");
            } else {
                alert("강의실 정보를 가져오는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        onSort(sortKey, sortMethod);
    }, [sortKey, sortMethod]);

    const onSort = (key, method) => {
        const tempClasses = [...payments];
        const sortByAsc = (a, b) => (a[key] < b[key] ? -1 : 1);
        const sortByDesc = (a, b) => (a[key] > b[key] ? -1 : 1);

        if(method === "asc") {
            setPayments(tempClasses.sort(sortByAsc));
        } else {
            setPayments(tempClasses.sort(sortByDesc));
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
        const filteredPayments = original.filter((payment) => {
            const value = payment[searchKey] && payment[searchKey].toString().toLowerCase();
            return value && value.includes(searchValue.toLowerCase());
        });
        setPayments(filteredPayments);
    };

    const paymentDetail = (paymentDTO) => {
        navigate("/admin/paymentDetail", {state: {paymentDTO: paymentDTO}});
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
            <h2>결제 내역 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <div>
                <TextField select value={searchKey} onChange={handleSearchKeyChange}>
                    <MenuItem value="paymentNum">Num</MenuItem>
                    <MenuItem value="userId">UserId</MenuItem>
                    <MenuItem value="classNum">ClassNum</MenuItem>
                    <MenuItem value="className">className</MenuItem>
                    <MenuItem value="orderId">OrderId</MenuItem>
                    <MenuItem value="payDate">Date</MenuItem>
                </TextField>
                <TextField label="Search" value={searchValue} onChange={handleSearchValueChange} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        {makeTHCell("Num", "paymentNum")}
                        {makeTHCell("UserId", "userId")}
                        {makeTHCell("ClassNum", "classNum")}
                        {makeTHCell("ClassName", "className")}
                        {makeTHCell("OrderId", "orderId")}
                        {makeTHCell("Date", "payDate")}
                        <TableCell>결제 관리</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.paymentNum}>
                            <TableCell>{payment.paymentNum}</TableCell>
                            <TableCell>{payment.userId}</TableCell>
                            <TableCell>{payment.classNum}</TableCell>
                            <TableCell>{payment.className}</TableCell>
                            <TableCell>{payment.orderId}</TableCell>
                            <TableCell>{payment.payDate}</TableCell>
                            <TableCell>
                                <Button onClick={() => {paymentDetail(payment)}}>관리</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminPayments;