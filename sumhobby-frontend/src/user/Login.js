import React from "react";
import { signin } from "../service/ApiService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const userId = data.get("userId");
        const password = data.get("password");
        //ApiService의 signin 메서드를 사용해서 로그인... 
        signin({
            userId: userId,
            password: password
        }).catch((error) => {
            console.log(error);
            alert("로그인을 실패했습니다.\n회원 정보를 확인해주세요.");
        });
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
                <Grid container spacing={2} alignItems="center">
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
                                <Link to="/signup" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Login;