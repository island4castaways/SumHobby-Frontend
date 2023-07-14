import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getUserInfo, modifyUserInfo } from "./service/ApiService";
import { withRouter } from "react-router-dom";

const ModifyUserInfo = ({ history }) => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        // 현재 사용자 정보를 가져와서 텍스트 필드에 설정
        getUserInfo().then((response) => {
            const { userId, userName, email, phone } = response.data;
            setUserInfo({
                userId,
                userName,
                email,
                phone,
            });
        });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        modifyUserInfo(userInfo).then(() => {
            // 회원 정보 수정 성공시 필요한 로직 추가
            // 로컬 스토리지에 저장 후 로그인 페이지로 이동
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            history.push("/login");
        });
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
                            autoComplete="off"
                            name="userId"
                            variant="outlined"
                            required
                            fullWidth
                            value={userInfo.userId}
                            disabled
                            id="userId"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="userName"
                            label="이름"
                            type="text"
                            value={userInfo.userName}
                            disabled
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
                            type="tel"
                            value={userInfo.phone}
                            onChange={handleChange}
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
                            value={userInfo.email}
                            onChange={handleChange}
                            id="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            수정 완료
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default withRouter(ModifyUserInfo);
