import React from 'react';
import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './Home';
import Cart from './Cart';
import Class from './Class';
import ClassDetail from './ClassDetail';
import AddReview from './AddReview';
import ShowReview from './ShowReview';
import { Star } from '@mui/icons-material';

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/home" element={<Home />} />
          <Route path="/class" element={<Class />} />
          <Route path="/class/:title" element={<ClassDetail />} />
          <Route
            path="/addreview"
            element={<AddReview />}
          />
          <Route
            path="/showreview"
            element={<ShowReview />}
          />
        </Routes>
      </Router>
      <Box mt={5}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright ©'}
          Islandengineer, {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </div>
  );
}

export default AppRouter;
