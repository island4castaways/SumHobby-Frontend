import { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { modifyUserInfo, call } from "../service/ApiService"; // modifyUserInfo import 추가
import { Link } from "react-router-dom";

const ChangePw = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handlePasswordChange = (event) => {
        setPasswordError("");
        const { name, value } = event.target;
        if (name === "currentPassword") {
            setCurrentPassword(value);
        } else if (name === "newPassword") {
            setNewPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // 유효성 검사: 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
        if (newPassword !== confirmPassword) {
            setPasswordError("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        // 서버에 비밀번호 변경 요청 보내기
        const userDTO = {
            password: currentPassword,
            newPassword: newPassword,
        };
        modifyUserInfo(userDTO)
            .then(() => {
                // 비밀번호 변경이 성공적으로 완료되었을 때 처리하는 로직 추가 가능
                // 예: 비밀번호 변경 완료 메시지 띄우기, 다른 페이지로 리다이렉트 등
                console.log("비밀번호 변경 성공");
            })
            .catch((error) => {
                // 비밀번호 변경이 실패했을 때 처리하는 로직 추가 가능
                console.error("Failed to change password:", error);
            });
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        비밀번호 변경
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="currentPassword"
                            label="현재 비밀번호"
                            type="password"
                            value={currentPassword}
                            onChange={handlePasswordChange}
                            id="currentPassword"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="newPassword"
                            label="새 비밀번호"
                            type="password"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            id="newPassword"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="새 비밀번호 확인"
                            type="password"
                            value={confirmPassword}
                            onChange={handlePasswordChange}
                            id="confirmPassword"
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
