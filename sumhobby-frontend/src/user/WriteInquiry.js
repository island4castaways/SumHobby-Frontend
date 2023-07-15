import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { call } from '../service/ApiService';

const WriteInquiry = () => {
  const [inquiry, setInquiry] = useState({
    title: '',
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInquiry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    call('/inquiries', 'POST', inquiry).then(() => {
      window.location.href = '/inquiryboard'; // 글 작성 완료 후 게시판 페이지로 이동
    }).catch((error) => {
      console.error('Failed to write inquiry:', error);
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
              name="title"
              label="제목"
              type="text"
              value={inquiry.title}
              onChange={handleChange}
              id="title"
              InputLabelProps={{
                shrink: true,
              }}
            />
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
              value={inquiry.content}
              onChange={handleChange}
              id="content"
              InputLabelProps={{
                shrink: true,
              }}
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
