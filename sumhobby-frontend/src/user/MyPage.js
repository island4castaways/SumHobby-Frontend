import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FaAngleRight } from "react-icons/fa";
import { call, signout } from '../service/ApiService';
import { useParams } from "react-router-dom";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // 현재 사용자 정보를 가져와서 텍스트 필드에 설정
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken !== null){
      call("/auth/userinfo", "GET", null).then((response) => {
        if (response) {
          setUserInfo(response);
        }
      });
    }else{
      window.location.href = "/login";
    }
  }, []);

  const changeRole = (userDTO) => {
    call("/auth/changeRole", "PUT", userDTO).then((response) => {
      if(response) {
        setUserInfo(response);
      }
    });
  };

  const checkRole = () => {
    if(userInfo.role === "강사") {
      return (
        <Link to="/myclasses" state={{userDTO: userInfo}}>나의 강의실     {<FaAngleRight />}</Link>
      );
    } else if(userInfo.role === "강사 신청") {
      return (
        <p>강사 승인 대기 중</p>
      );
    } else {
      return (
        <Button onClick={() => {if(window.confirm("지원서를 제출하지 않았을 경우 반려될 수 있습니다.\n강사 자격을 신청하시겠습니까?")) {
            changeRole(userInfo)
          }}}>강사 신청     {<FaAngleRight />}
        </Button>
      );
    }
  };

  return(
    <div style={{ backgroundColor: "lightgrey", minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <TableContainer sx={{ width: "30%", overflow: "hidden", backgroundColor: "white", borderRadius: "6px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ borderBottom: "1px solid", width: "50%" }}>
                {userInfo.userId}님 ∑Hobby에 오신걸 환영합니다.
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
                {checkRole()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MyPage;