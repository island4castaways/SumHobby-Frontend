import React, { useEffect, useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { call } from '../service/ApiService';

const WriteInquiry = () => {
  const [inquiry, setInquiry] = useState({ inqContent: '' });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const confirm = window.confirm("문의 내용을 저장하겠습니까?");
    if (confirm) {
      const data = new FormData(event.target);
      const inqContent = data.get("content");
      saveInq({
        inqContent: inqContent,
        userId: userDTO.userId
      });
    }
  };

  const saveInq = (inquiryDTO) => {
    return call("/auth/inquiry", "POST", inquiryDTO).then((response) => {
      if (response) {
        alert("문의글 저장이 완료되었습니다.");
        window.location.href = "/inquiryboard";
        getInquiry();
      } else {
        alert("문의글 저장에 실패하였습니다.");
      }
    });
  };

  const getInquiry = () => {
    return call("/auth/inquiry", "PATCH", inquiry).then((response) => {
      setInquiry(response);
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '8%' }}>
      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5">
              글 작성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="content"
              label="내용"
              multiline
              rows={4}
              value={inquiry.inqContent}
              onChange={(e) => setInquiry({ ...inquiry, inqContent: e.target.value })}
              id="content"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              작성 완료
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default WriteInquiry;