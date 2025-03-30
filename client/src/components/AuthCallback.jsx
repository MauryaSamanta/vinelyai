import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';

const AuthCallback = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const isCalled = useRef(false);
  useEffect(() => {
    const handleCallback = async () => {
        if (isCalled.current) return; // Prevent double calls
      isCalled.current = true;
      const code = new URLSearchParams(window.location.search).get('code');
      const data={code:code};
      if (!code) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/user/auth/google/callback', {
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify(data)
        });
        const returned=await response.json();
        const { token, user } = returned;
        console.log(returned);
        dispatch(setLogin({
            user:returned.user,
            token:returned.token
        }));
        navigate('/');
        
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>
  );
};

export default AuthCallback;