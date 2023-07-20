import { Button, Container, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { React, useEffect, useState } from "react";
import { call } from "../service/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

function AdminReviews() {
    const location = useLocation();
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [sortKey, setSortKey] = useState("");
    const [sortMethod, setSortMethod] = useState("");
    const [searchKey, setSearchKey] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [original, setOriginal] = useState([]);
    const [admin, setAdmin] = useState({});

    const classDTO = location.state.classDTO;

    useEffect(() => {
        call("/auth/returnUser", "GET", null).then((response) => {
            if(response) {
                if(response.role !== "관리자") {
                    navigate("/");
                } else {
                    setAdmin(response);
                }
            }
        }).catch((error) => {
            alert("관리자 정보를 확인하는데 실패했습니다.")
        });
    }, []);

    useEffect(() => {
        call("/admin/reviews", "PATCH", classDTO).then((response) => {
            if(response.data) {
                setReviews(response.data);
                setOriginal(response.data);
                setSortKey("revDate");
                setSortMethod("desc");
            }
        }).catch((error) => {
            alert("리뷰를 가져오는데 실패했습니다.")
        });
    }, [classDTO]);

    useEffect(() => {
        onSort(sortKey, sortMethod);
    }, [sortKey, sortMethod]);

    const onSort = (key, method) => {
        const tempReviews = [...reviews];
        const sortByAsc = (a, b) => (a[key] < b[key] ? -1 : 1);
        const sortByDesc = (a, b) => (a[key] > b[key] ? -1 : 1);

        if(method === "asc") {
            setReviews(tempReviews.sort(sortByAsc));
        } else {
            setReviews(tempReviews.sort(sortByDesc));
        }
    };

    const columnClicked = (key) => {
        if(sortKey === key) {
            if(sortMethod === "asc") {
                setSortMethod("desc");
            } else {
                setSortMethod("asc");
            }
        } else {
            setSortKey(key);
            setSortMethod("asc");
        }
    }

    const handleSearchKeyChange = (event) => {
        setSearchKey(event.target.value);
    };
    
    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };
    
    const handleSearch = () => {
        const filteredReviews = original.filter((review) => {
            const value = review[searchKey] && review[searchKey].toString().toLowerCase();
            return value && value.includes(searchValue.toLowerCase());
        });
        setReviews(filteredReviews);
    };

    const deleteReview = (reviewDTO) => {
        call("/admin/deleteReview", "DELETE", reviewDTO).then((response) => {
            if(response.data) {
                setReviews(response.data);
                setOriginal(response.data);
                setSortKey("revDate");
                setSortMethod("desc");
            }
        }).catch((error) => {
            alert("리뷰를 삭제하는데 실패했습니다.");
        });
    };

    const returnToList = () => {
        navigate("/admin/classes");
    };

    const makeTHCell = (name, key) => {
        if(key === sortKey) {
            if(sortMethod === "asc") {
                return <TableCell onClick={() => columnClicked(key)}>{name} ↑</TableCell>
            } else {
                return <TableCell onClick={() => columnClicked(key)}>{name} ↓</TableCell>
            }
        } else {
            return <TableCell onClick={() => columnClicked(key)}>{name}</TableCell>
        }
    };

    return (
        <Container>
            <h2>강의 관리</h2>
            <h4>{admin.userName} 로그인</h4>
            {classDTO && (
                <h5>{classDTO.classNum}, {classDTO.className} 강의실</h5>
            )}
            <Button onClick={() => {returnToList()}}>이전 목록</Button>
            <div>
                <TextField select value={searchKey} onChange={handleSearchKeyChange}>
                    <MenuItem value="revNum">Num</MenuItem>
                    <MenuItem value="userId">UserId</MenuItem>
                    <MenuItem value="revContent">Content</MenuItem>
                    <MenuItem value="revRate">Rate</MenuItem>
                    <MenuItem value="revDate">Date</MenuItem>
                </TextField>
                <TextField label="Search" value={searchValue} onChange={handleSearchValueChange} />
                <Button onClick={handleSearch}>Search</Button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        {makeTHCell("Num", "revNum")}
                        {makeTHCell("UserId", "userId")}
                        {makeTHCell("Content", "revContent")}
                        {makeTHCell("Rate", "revRate")}
                        {makeTHCell("Date", "revDate")}
                        <TableCell>삭제</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review.revNum}>
                            <TableCell>{review.revNum}</TableCell>
                            <TableCell>{review.userId}</TableCell>
                            <TableCell>{review.revContent}</TableCell>
                            <TableCell>{review.revRate}</TableCell>
                            <TableCell>{review.revDate}</TableCell>
                            <TableCell>
                                <Button onClick={() =>{
                                    if(window.confirm("리뷰를 삭제하겠습니까?")) {
                                        deleteReview(review);
                                    }
                                }}>
                                    삭제
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
};

export default AdminReviews;