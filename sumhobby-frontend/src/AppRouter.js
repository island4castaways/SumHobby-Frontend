import React from 'react';
import { Box, Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // BrowserRouter 별칭으로 가져오기

import App from './App';
import Home from './Home';
import Class from './Class';

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
      <Router> {/* BrowserRouter 대신 Router로 수정 */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/class" element={<Class />} /> 
          <Route path="/review" element={<Home />} /> {/* 경로 수정 필요 */}
        </Routes>
      </Router> {/* BrowserRouter 대신 Router로 수정 */}
      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
}

export default AppRouter;
