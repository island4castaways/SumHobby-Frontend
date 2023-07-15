import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { getPurchases } from '../service/ApiService';

const PurchaseList = () => {
    const [purchases, setPurchases] = useState([]);

    // useEffect(() => {
    //     // 구매 목록을 불러와서 purchases 상태에 저장
    //     getPurchases()
    //         .then((data) => {
    //             setPurchases(data);
    //         })
    //         .catch((error) => {
    //             console.error('Failed to get purchases:', error);
    //         });
    // }, []);

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
                                <TableCell>{purchase.id}</TableCell>
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
