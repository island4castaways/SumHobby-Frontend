import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { call } from '../service/ApiService';

const InquiryBoard = () => {
  const [inquiries, setInquiries] = useState([]);
  const [userDTO, setUserDTO] = useState({});

  const [expandedInquiry, setExpandedInquiry] = useState(null);

  const handleInquiryClick = (inqNum) => {
    setExpandedInquiry((prevExpanded) => (prevExpanded === inqNum ? null : inqNum));
  };

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
    call("/auth/inquiry", "PATCH", userDTO).then((response) => {
      if (response.data) {
        setInquiries(response.data);
      } else {
        alert("문의글 정보를 가져오는데 실패했습니다.");
      }
    });
  }, [userDTO]);

  return (
    <div style={{ position: 'relative' }}>
      <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;문의함</h1>
      <TableContainer component={Paper} sx={{ maxWidth: 900, margin: '0 auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell sx={{ minWidth: 200 }}>내 QnA</TableCell>
              <TableCell>작성일</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {inquiries.map((inquiry) => (
              <React.Fragment key={inquiry.inqNum}>
                <TableRow key={inquiry.inqNum} onClick={() => handleInquiryClick(inquiry.inqNum)} style={{ cursor: 'pointer' }}>
                  <TableCell>{inquiry.inqNum}</TableCell>
                  <TableCell>{inquiry.inqContent}</TableCell>
                  <TableCell>{inquiry.inqDate}</TableCell>
                </TableRow>
                {expandedInquiry === inquiry.inqNum && (
                  <TableRow>
                    <TableCell colSpan={3}>{inquiry.inqAnswer}</TableCell>
                  </TableRow>
                )}
              </React.Fragment>
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