import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { call } from '../service/ApiService';

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([]);
    const [userDTO, setUserDTO] = useState({});

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if (response) {
                if (response) {
                    setUserDTO(response);
                } else {
                    alert("사용자 정보를 확인하는데 실패했습니다.");
                }
            }
        });
    }, []);

    useEffect(() => {
        call("/auth/pay", "PATCH", userDTO).then((response) => {
            if (response.data) {
                setPurchases(response.data);
            } else {
                alert("구매 리스트를 가져오는데 실패했습니다.");
            }
        });
    }, [userDTO]);
    return (
        <div>
            <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;강의 구매 목록</h1>
            <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '0 auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>상품명</TableCell>
                            <TableCell>가격</TableCell>
                            <TableCell>구매일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {purchases.map((purchase) => (
                            <TableRow key={purchase.orderNum}>
                                <TableCell>{purchase.orderid}</TableCell>
                                <TableCell>{purchase.userRef}</TableCell>
                                <TableCell>{purchase.orderPrice}</TableCell>
                                <TableCell>{purchase.orderDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PurchaseList;