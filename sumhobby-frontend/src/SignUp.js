import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { signup } from "./service/ApiService";

function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // 오브젝트에서 form에 저장된 데이터를 맴의 형태로 변환
        const data = new FormData(event.target);
        const userId = data.get("userId");
        const password = data.get("password");
        const userName = data.get("userName");
        const phone = data.get("phone");
        const email = data.get("email");
        signup({ userId: userId, password: password, userName: userName, email: email, phone: phone }).then(
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
                            회원 가입
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="userid"
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
                            name="userName"
                            label="이름"
                            id="userName"
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
                            id="useremail"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            계정 생성
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" marginTop={"3%"}>
                    <Grid item>
                        <Link to="/login" variant="body2" style={{ marginTop: "8%" }} >
                            이미 계정이 있습니까? 로그인하세요.
                        </Link>
                    </Grid>
                </Grid>

            </form>
        </Container>
    )

}

export default SignUp;