import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Box } from '@mui/material';

const Home = ({classData}) => {
  
  // useEffect(() => {

  // })
  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '8%' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" align="center">
            실시간 인기 클래스
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="center">
        {classData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.classNum}>
            <Card>
              <CardActionArea component={Link} to={`/class/${item.className}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.img}
                  alt={item.className}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.className}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={2} textAlign="center">
        <Link to="/class" variant="body2">
          View more
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
