// InquiryBoard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getInquiries } from '../service/ApiService';

const InquiryBoard = () => {
  const [inquiries, setInquiries] = useState([]);

  // useEffect(() => {
  //   // Inquiry 목록을 불러와서 inquiries 상태에 저장
  //   getInquiries()
  //     .then((data) => {
  //       setInquiries(data);
  //     })
  //     .catch((error) => {
  //       console.error('Failed to get inquiries:', error);
  //     });
  // }, []);

  return (
    <div style={{ position: 'relative' }}>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;문의함</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell sx={{ minWidth: 200 }}>제목</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>작성자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.inqNum}>
                <TableCell>{inquiry.inqNum}</TableCell>
                <TableCell>
                  <Link to={`/inquiry/${inquiry.inqNum}`}>{inquiry.inqContent}</Link>
                </TableCell>
                <TableCell>{inquiry.inqDate}</TableCell>
                <TableCell>{inquiry.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        color="primary"
        aria-label="add"
        style={{ position: 'absolute', bottom: '30px', right: '30px' }}
        component={Link}
        to="/write"
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default InquiryBoard;
