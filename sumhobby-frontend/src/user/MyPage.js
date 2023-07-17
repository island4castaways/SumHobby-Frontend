import { Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FaAngleRight } from "react-icons/fa";
import { signout } from '../service/ApiService';
import { useParams } from "react-router-dom";

const MyPage = () => {
  const { userId } = useParams();
  return (
        <>
        <div style={{ backgroundColor: "lightgrey", minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <TableContainer sx={{ width: "30%", overflow: "hidden", backgroundColor: "white", borderRadius: "6px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ borderBottom: "1px solid", width: "50%" }}>
              { userId }님 ∑Hobby에 오신걸 환영합니다.
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "1px solid", width: "50%" }}>
                <Grid item>
                  <Button color='primary' variant="contained" raised onClick={signout}>
                    로그아웃
                  </Button>
                </Grid>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left" sx={{ borderBottom: "1px solid", borderRight: "1px solid", width: "50%" }}>
                <Link to="/changeinfo">내 정보 수정     {<FaAngleRight />}</Link>
              </TableCell>
              <TableCell align="left" sx={{ borderBottom: "1px solid", width: "50%" }}>
                <Link to="/changepw">비밀번호 변경     {<FaAngleRight />}</Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" sx={{ borderBottom: "1px solid", borderRight: "1px solid", width: "50%" }}>
                <Link to="/purchase">구매 내역     {<FaAngleRight />}</Link>
              </TableCell>
              <TableCell align="left" sx={{ borderBottom: "1px solid", width: "50%" }}>
                <Link to="/faq">문의하기     {<FaAngleRight />}</Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" sx={{ border: "0px solid" }}>
                <Link to="/profiles">강사 신청     {<FaAngleRight />}</Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div></>
  );
};
export default MyPage;