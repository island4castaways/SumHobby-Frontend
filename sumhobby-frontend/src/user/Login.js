import React from "react";
import { signin } from "./service/ApiService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CenterFocusStrong } from "@mui/icons-material";

function Login(_userDTO) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const userId = data.get("userId");
        const password = data.get("password");
        //ApiService의 signin 메서드를 사용해서 로그인... 
        signin({
            userId: userId,
            password: password
        })
    };


    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                {/* submit 버튼을 누르면 handleSubmit이 실행됨 */}
                <Grid container spacing={2}  alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="userId"
                            label="아이디"
                            name="userId"
                            autoComplete="userId"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="패스워드"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            로그인
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={11} style={{ textAlign: "center" }}>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item>
                                <Link to="/Findpw" variant="body2">
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                            <Grid item>
                                <span>|</span>
                            </Grid>
                            <Grid item>
                                <Link to="/Findid" variant="body2">
                                    아이디 찾기
                                </Link>
                            </Grid>
                            <Grid item>
                                <span>|</span>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                            {/* <Grid item>
                                <Link to="/mypage" variant="body2">
                                    마이페이지 지울거임 테스트용
                                </Link>
                            </Grid> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<CenterFocusStrong />}
                        >
                            구글
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<CenterFocusStrong />}
                        >
                            카카오
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<CenterFocusStrong />}
                        >            
                            네이버
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Login;