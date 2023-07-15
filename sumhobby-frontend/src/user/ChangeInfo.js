import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { modifyUserInfo, call } from "../service/ApiService"; // getUserInfo import 제거

const ModifyUserInfo = () => {
    const [userInfo, setUserInfo] = useState({});
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    useEffect(() => {
        // 현재 사용자 정보를 가져와서 텍스트 필드에 설정
        call("/auth/userinfo", "GET", null).then((response) => {
            console.log("userinfo has been called.");
            if (response) {
                setUserInfo(response);
                console.log("userinfo", userInfo);
            }
        });
    }, []);

    // 이벤트 객체에서 name과 value를 추출 후 userInfo 상태를 갱신하여 입력된 정보를 반영
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log("handleChange", name, value);
    };

    const handleSubmit = (event) => {
        setEmailError("");
        setPhoneError("");
        event.preventDefault();
        console.log("handleSubmit", userInfo);

        // 바로 API 호출
        modifyUserInfo(userInfo)
            .then(() => {
                window.location.href = "/mypage";
            })
            .catch((error) => {
                console.error("Failed to update user info:", error);
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
                            autoFocus="true"
                            variant="outlined"
                            required
                            fullWidth
                            name="userId"
                            label="아이디"
                            type="text"
                            value={userInfo.userId}
                            disabled
                            id="userId"
                            autoComplete="userId"
                            InputLabelProps={{
                                shrink: true, // 라벨을 항상 위로 고정
                            }}
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
                            value="********" // 비밀번호는 암호화된 상태로 표시, 값 안 가져옴
                            disabled
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
                            type="text"
                            value={userInfo.userName}
                            disabled
                            id="userName"
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
                            name="phone"
                            label="휴대폰 번호"
                            type="tel"
                            value={userInfo.phone}
                            onChange={handleChange}
                            id="phone"
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
                            name="email"
                            label="이메일"
                            type="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            id="email"
                            InputLabelProps={{
                                shrink: true,
                            }}
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

export default ModifyUserInfo;