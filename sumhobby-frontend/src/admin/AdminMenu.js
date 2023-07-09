import { Button, Grid, Paper } from "@mui/material";
import { React } from "react";
import { adminClasses, adminInquiries, adminOrders, adminUsers, adminlogout } from "../service/ApiService";

function AdminMenu() {

    return (
        <div className="AdminMenu">
            <Paper>
                <Grid>
                    <h2>
                        관리자 메뉴
                    </h2>
                </Grid>
                <Grid>
                    <Button onClick={adminUsers}>
                        사용자 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={adminOrders}>
                        결제 내역 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={adminClasses}>
                        강의실 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={adminInquiries}>
                        문의글 관리
                    </Button>
                </Grid>
                <Grid>
                    <Button onClick={adminlogout}>
                        관리자 로그아웃
                    </Button>
                </Grid>
            </Paper>
        </div>
    );
};

export default AdminMenu;