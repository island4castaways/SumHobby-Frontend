import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { modify } from "../service/ApiService";

function ChangeInfo() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // 오브젝트에서 form에 저장된 데이터를 맴의 형태로 변환
        const data = new FormData(event.target);
        const userId = data.get("userId");
        const password = data.get("password");
        const userName = data.get("userName");
        const email = data.get("email");
        const phone = data.get("phone");
        modify({ userId: userId, password: password, userName: userName, email: email, phone: phone }).then(
            (response) => {
                //계정 생성 성공시 login 페이지로 리다이렉트
                window.location.href = "/login";
            }
        );
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            회원 정보 수정
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="userId"
                            variant="outlined"
                            required
                            fullWidth
                            id="userId"
                            label="아이디"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="userName"
                            label="이름"
                            type="userName"
                            id="userName"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>            
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="phone"
                            label="휴대폰 번호"
                            type="phone"
                            id="phone"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="email"
                            label="이메일"
                            type="email"
                            id="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            수정 완료
                        </Button>
                    </Grid>
                </Grid>

            </form>
        </Container>
    )

}
export default ChangeInfo;