import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';

import { createMuiTheme, createTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

import {useSelector} from 'react-redux';

import { useDispatch } from 'react-redux';
import { setLogout } from './state';
import AuthPage from './pages/authPage';
import SearchInterface from './pages/search';
import FriendsInterface from './pages/friends';
import ConnectionsInterface from './pages/connections';
import AuthCallback from './components/AuthCallback';
import PageWithWebBackground from './pages/Sample';
import GroupsPage from './pages/Groups';
import Waves from './components/WavesBack';

const App = () => {
  const theme = createTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "5px"
          },
          "*::-webkit-scrollbar-track": {
            background: "#635acc"
          },
          "*::-webkit-scrollbar-thumb": {
            background: "#1D388F61",
            borderRadius: "2px"
          }
        }
      }
    },
    typography: {
      fontFamily: "'Cabin'",
    },
  });
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // Media query for phones and tablets
  const user=useSelector((state)=>state.user);

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
     
     <CssBaseline />
 
      <Routes>
      <Route path="/" element={!user?.firstName?<AuthPage/>:<SearchInterface/>} />
      <Route path="/search" element={user?<SearchInterface />:<AuthPage/>} />
      <Route path="/friends" element={user?<FriendsInterface />:<AuthPage/>} />
      <Route path="/connections" element={user?<ConnectionsInterface />:<AuthPage/>} />
      <Route path="/groups" element={user?<GroupsPage/>:<AuthPage/>}/>
      <Route path="/callback" element={<AuthCallback/>} />
      <Route path="/sample" element={<PageWithWebBackground/>} />
      </Routes>
      </ThemeProvider>
  </BrowserRouter>
  );
};

export default App;
