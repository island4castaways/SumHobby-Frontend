import React from 'react';
import { Link } from 'react-router-dom';
import {Container,Grid,Typography,Card,CardActionArea,CardContent,CardMedia,Box,} from '@mui/material';
import { getClassData } from './Class';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
];

export default function Home() {
  const sortedItems = itemData.sort((a, b) => b.rating - a.rating);
  const topItems = sortedItems.slice(0, 3);

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
        {topItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.title}>
            <Card>
              <CardActionArea component={Link} to={`/class/${item.title}`}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${item.img}?w=200&h=200&fit=crop&auto=format`}
                  alt={item.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {item.title}
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
}
