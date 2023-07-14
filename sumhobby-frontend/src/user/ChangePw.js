import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { signin } from "../service/ApiService";
import { Link } from "react-router-dom";

//수정 필요함 
const ChangePw = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const useremail = data.get("useremail");
        //ApiService의 signin 메서드를 사용해서 로그인... 
        signin({
            useremail: useremail
        })
    };

    return (
        // <p> 아이디 찾기 페이지 </p>
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        비밀번호 변경
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
                            id="useremail"
                            label="현재 비밀번호"
                            name="useremail"
                            autoComplete="useremail"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="useremail"
                            label="새 비밀번호"
                            name="useremail"
                            autoComplete="useremail"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="useremail"
                            label="새 비밀번호 확인"
                            name="useremail"
                            autoComplete="useremail"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            변경
                        </Button>
                    </Grid>
                    <Grid item >
                        <Grid >
                            <Grid item>
                                <Link to="/Findpw" variant="body2">
                                    비밀번호를 잊으셨나요? 
                                </Link>
                            </Grid>                    
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}


export default ChangePw;