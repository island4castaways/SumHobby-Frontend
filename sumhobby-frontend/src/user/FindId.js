import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { signin } from "../service/ApiService";
import { Link } from "react-router-dom";

//수정 필요함 
const FindId = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        //ApiService의 signin 메서드를 사용해서 로그인... 
        signin({
            email: email
        })
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        아이디 찾기
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                {/* submit 버튼을 누르면 handleSubmit이 실행됨 */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            찾기
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
                                <Link to="/login" variant="body2">
                                    로그인
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}


export default FindId;