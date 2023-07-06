import { React } from "react";
import { adminlogin } from "../service/ApiService";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

function AdminLogin() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const adminId = data.get("adminId");
        const adminPw = data.get("adminPw");
        //ApiService의 adminlogin 메서드 사용해서 login
        adminlogin({adminid: adminId, adminPw: adminPw});
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        관리자 로그인
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                {/* submit button 누르면 handleSubmit이 실행됨 */}
                <Grid container spacing={2}>
                    <TextField
                        variant="outlined"
                        requiredfullWidth
                        id="adminId"
                        label="adminID"
                        name="adminId"
                        autoComplete="adminId" />
                    <TextField
                        variant="outlined"
                        requiredfullWidth
                        id="adminPw"
                        label="adminPassword"
                        name="adminPw"
                        autoComplete="adminPw" />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        로그인
                    </Button>
                </Grid>
            </form>
        </Container>
    );
};

export default AdminLogin;