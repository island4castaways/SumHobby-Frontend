import React from 'react';
import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App';
import Home from './Home';
import Class from './Class';
import ClassDetail from './ClassDetail';
import AddReview from './AddReview';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright ©'}
      Islandengineer, {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function AppRouter() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/class" element={<Class />} />
          <Route path="/class/:title" element={<ClassDetail />} />
          <Route path="/review" element={<AddReview />} />
          <Route path="/addreview" element={<AddReview />} />
        </Routes>
      </Router>
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
}

export default AppRouter;
