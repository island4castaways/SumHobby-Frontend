import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Box } from '@mui/material';
import { call } from './service/ApiService';
import "./Home.css";

const Home = () => {
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    call('/class/top-rated', 'GET', null)
      .then((response) => {
        const categorizedClasses = categorizeClasses(response.data);
        setClassData(categorizedClasses);
      }).catch((error) => {
        console.log(error);
      })
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
          <Typography component="h1" variant="h3" align="center" fontSize="30px" border="border">
            실시간 인기 클래스
          </Typography>
        </Grid>
      </Grid>
      <Box mt={2} textAlign="center" >
        <Link to="/allclasses" variant="body2" className='view'>
          View more →
        </Link>
      </Box>
      {Object.keys(classData).map((category) => (
        <React.Fragment key={category}>
          <Typography variant="h5" component="h2" style={{ marginTop: '25px', textDecorationLine:'blink',textEmphasis:'CaptionText' }}>
            {category}
          </Typography>
          <Grid container spacing={2}>
            {classData[category].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.classNum}>
                {/* <div onClick={() => {onclickClass(item)}}> */}
                <Link to="/classdetail" state={{ item: item }}>
                 <Card style={{ height: '100%',marginTop:'15px' }} >
                    <CardActionArea style={{ textDecoration: 'none', height: '100%' }}>
                      <CardMedia component="img" height="200" image={item.classImg} alt="Thumbnail"/>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div" marginTop='15px'>
                          {item.className}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
                  
                {/* </div> */}
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Home;
