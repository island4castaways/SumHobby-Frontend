import React, { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function AddReview(item) {

    const[review,setReview] = useState(null);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.target);
        const writeReview = data.get("write_review");
    }
    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        리뷰 작성
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={1}>
                <Grid item xs={12}>
                    title{item.title}
                </Grid>
                <Grid item xs={12}>
                    강사명:{item.instructorName}
                </Grid>
            </Grid>
                
                {/* submit 버튼을 누르면 handleSubmit이 실행됨 */}
                <Grid container spacing={3} marginTop={1}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="write_review"
                            label="리뷰"
                            name="write_review"
                            autoComplete="username"
                        />
                    </Grid>
                    
                    </Grid>
                    <Grid item xs={12} marginTop={2}>
                        <Button type="submit" fullWidth variant="contained" color="primary"
                        onSubmit={handleSubmit}>
                            작성 완료
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" variant="body2">
                            이 강의 리뷰 더 보러가기
                        </Link>
                    </Grid>
        </Container>
    );
}

export default AddReview;