import { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { call, signin } from "../service/ApiService";
import { Link } from "react-router-dom";

const ChangePw = () => {
    const [passwords, setPasswords] = useState({});
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(passwords);
        // event.preventDefault();
        // const data = new FormData(event.target);

        console.log(passwords.newPW)
        if(passwords.newPW === passwords.newPwOk){
            call("/auth/modifypw", "PUT", passwords).then((response) => {
                console.log(response.data)
                if(response.data =='fail'){
                    alert("변경에 실패하였습니다.")   
                }else{
                    alert("비밀번호 변경 성공")
                    window.location.href = "/mypage";                    
                }
            });
        }else{
            alert("변경에 실패하였습니다.");
        }
        //ApiService의 signin 메서드를 사용해서 로그인..
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPasswords((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log("handleChange", name, value);
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography marginBottom="15px"component="h1" variant="h5">
                        비밀번호 변경
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {/* submit 버튼을 누르면 handleSubmit이 실행됨 */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="originalPW"
                            label="현재 비밀번호"
                            name="originalPW"
                            autoComplete="originalPW"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="newPW"
                            label="새 비밀번호"
                            name="newPW"
                            autoComplete="newPW"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="newPwOk"
                            label="새 비밀번호 확인"
                            name="newPwOk"
                            autoComplete="newPwOk"
                            onChange={handleChange}
                        />
                        {passwordError && (
                            <Typography color="error">{passwordError}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            변경
                        </Button>
                    </Grid>
                    <Grid item>
                        <Grid>
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
};

export default ChangePw;
