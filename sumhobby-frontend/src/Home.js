import * as React from 'react';
import {ImageList,ImageListItem,Container,Grid,Typography} from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {

  // itemData 배열을 rating을 기준으로 내림차순으로 정렬합니다. 나중엔 조회수?기준으로
  const sortedItems = itemData.sort((a,b) => b.rating - a.rating);

  // 가장 높은 평점을 가진 상위 3개의 아이템을 추출합니다.
  const topItems = sortedItems.slice(0,3)
  
  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          실시간 인기 클래스
        </Typography>
      </Grid>
    </Grid>
    <ImageList sx={{ width: 500, height:165 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    <Link to="/class" variant="body2">
      view more
    </Link>
    </Container>
  );
}

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
  }
];
