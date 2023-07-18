import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, TextField, Button } from '@mui/material';
import { call } from '../service/ApiService';
import { useLocation, useNavigate } from 'react-router-dom';

const PurchaseList = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [purchases, setPurchases] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [original, setOriginal] = useState([]);
    const [userDTO, setUserDTO] = useState(location.state.userDTO);

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if (response) {
                setUserDTO(response);
            } else {
                alert("사용자 정보를 확인하는데 실패했습니다.");
            }
        });
    }, []);

    useEffect(() => {
        call("/auth/payments", "PATCH", userDTO).then((response) => {
            if (response.data) {
                setPurchases(response.data);
                setOriginal(response.data);
                setSortKey("payDate");
                setSortMethod("desc");
            } else {
                alert("결제 내역을 가져오는데 실패했습니다.");
            }
        });
    }, [userDTO]);

    useEffect(() => {
        onSort(sortKey, sortMethod);
    }, [sortKey, sortMethod]);

    const onSort = (key, method) => {
        const tempPurchases = [...purchases];
        const sortByAsc = (a, b) => (a[key] < b[key] ? -1 : 1);
        const sortByDesc = (a, b) => (a[key] > b[key] ? -1 : 1);

        if(method === "asc") {
            setPurchases(tempPurchases.sort(sortByAsc));
        } else {
            setPurchases(tempPurchases.sort(sortByDesc));
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
        const filteredPurchases = original.filter((purchase) => {
            const value = purchase[searchKey] && purchase[searchKey].toString().toLowerCase();
            return value && value.includes(searchValue.toLowerCase());
        });
        setPurchases(filteredPurchases);
    };

    const returnToList = () => {
        navigate("/mypage");
    };

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
        <div>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;강의 구매 목록</h1>
            <Button onClick={() => {returnToList()}}>마이페이지로 돌아가기</Button>
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
            <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '0 auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {makeTHCell("결제 ID", "orderId")}
                            {makeTHCell("강의명", "className")}
                            {makeTHCell("결제 금액", "classPrice")}
                            {makeTHCell("결제일", "payDate")}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchases.map((purchase) => (
                            <TableRow key={purchase.paymentNum}>
                                <TableCell>{purchase.orderId}</TableCell>
                                <TableCell>{purchase.className}</TableCell>
                                <TableCell>{purchase.classPrice}</TableCell>
                                <TableCell>{purchase.payDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PurchaseList;