import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Box } from '@mui/material';
import { call } from './service/ApiService';

const Home = () => {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    call('/class/top-rated', 'GET', null)
      .then((response) => {
        const categorizedClasses = categorizeClasses(response.data);
        setClassData(categorizedClasses);
      })
      .catch((error) => console.error(error));
  }, []);

  const categorizeClasses = (classes) => {
    const categorized = {};

    // Categorize classes by classCategory
    for (const classItem of classes) {
      
      const category = classItem.classCategory;

      if (categorized[category]) {
        categorized[category].push(classItem);
      } else {
        categorized[category] = [classItem];
      }
    }
    
    return categorized;
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '8%' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" align="center">
            실시간 인기 클래스
          </Typography>
        </Grid>
      </Grid>
      {Object.keys(classData).map((category) => (
        <React.Fragment key={category}>
          <Typography variant="h6" component="h2" style={{ marginTop: '16px' }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {classData[category].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.classNum}>
                <Card style={{ height: '100%' }}>
                  <CardActionArea component={Link} to={`/class/${item.className}`} style={{ textDecoration: 'none', height: '100%' }}>
                    <CardMedia component="img" height="200" image={item.img} alt={item.className} />
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
        </React.Fragment>
      ))}
      <Box mt={2} textAlign="center">
        <Link to="/class" variant="body2">
          View more
        </Link>
      </Box>
    </Container>
  );
};

export default Home;
