import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Card, 
  CircularProgress, 
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Google from '@mui/icons-material/Google';
import logo from "../assets/comet.png"
import {useDispatch} from 'react-redux';
import { setLogin, setLogout } from '../state';
import {useNavigate} from 'react-router-dom';
import WebBackground from '../components/WebBackground';
import Waves from '../components/WavesBack';
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [first,setfirst]=useState('');
  const [last,setlast]=useState('');
  const [pass,setpass]=useState('');
  const [email,setemail]=useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const googleauth=async()=>{
    try {
      const response = await fetch('http://localhost:3000/user/auth/google',{
        method:"GET",
        
      });
      const returneddata=await response.json();
      window.location.href = returneddata.url;
    } catch (error) {
      console.error('Failed to get Google auth URL:', error);
    }
  }

  return (
    <Box 
      sx={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection:'column',
        height: '100vh', 
        backgroundColor: 'black',
        position: "relative", 
        p: isMobile ? 2 : 0
      }}
    >
       <Waves
  lineColor="#fff"
  backgroundColor="rgb(0, 0, 0)"
  waveSpeedX={0.01}
  waveSpeedY={0.01}
  waveAmpX={40}
  waveAmpY={20}
  friction={0.9}
  tension={0.01}
  maxCursorMove={120}
  xGap={20}
  yGap={36}
/>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: 400 }}
      >
        
        <Card 
          sx={{ 
            width: '100%', 
            p: isMobile ? 2 : 4, 
            borderRadius: 3, 
            position: 'relative', 
            overflow: 'hidden',
            
          }}
        >
          <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:2}}>
            <Box sx={{display:'flex', flexDirection:'row', gap:2, alignItems:'center', justifyContent:'center'}}>
          {/* Logo Placeholder */}
          <img 
            style={{ 
              
              width: 40, 
              height: 40, 
              borderRadius: 2 
            }} 
            src={logo}
          />
          <Typography sx={{fontSize:35}}>SearchUp.ai</Typography>
          </Box>
          <Typography sx={{fontSize:25}}>The People Search Engine</Typography>
          </Box>
          <form>
          <Button
      fullWidth
      variant="contained"
      startIcon={<Google />}
      onClick={googleauth}
      sx={{
        mb: 1,
        mt: 3,
        background: "linear-gradient(135deg, #34A853, #0F9D58)", // Sexy Google green gradient
        color: "#fff", // White text for contrast
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "10px",
        padding: "8px 15px",
        fontSize: "16px",
        boxShadow: "0px 4px 15px rgba(15, 157, 88, 0.4)", // Soft green glow
        transition: "all 0.3s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          background: "linear-gradient(135deg, #0F9D58, #34A853)", // Reverse gradient on hover
          boxShadow: "0px 6px 18px rgba(15, 157, 88, 0.6)", // Stronger glow
        },
        "&:active": {
          transform: "scale(0.96)", // Click effect
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 80%)",
          opacity: 0,
          transition: "opacity 0.4s ease-in-out",
        },
        "&:hover::before": {
          opacity: 1, // Subtle glossy effect on hover
        },
      }}
    >
      Continue with Google
    </Button>

          </form>
        </Card>
      </motion.div>
      <Typography 
  sx={{
    position: "absolute", 
    bottom: 45, 
    fontSize: 15, 
    color: "white", 
    //cursor: "pointer",

    fontWeight: 500,
    letterSpacing: "0.5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
  }}
>
  a
  <a 
    href="https://www.linkedin.com/in/maurya-samanta-262329287/" 
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "white",
      textDecoration: "none",
      borderBottom: "2px dashed rgba(255, 255, 255, 0.6)",
      transition: "all 0.3s ease-in-out",
      paddingBottom: "2px",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = "#34A853"; // Green hover effect
      e.currentTarget.style.borderBottom = "2px solid #34A853"; // Solid green underline
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "white"; 
      e.currentTarget.style.borderBottom = "2px dashed rgba(255, 255, 255, 0.6)";
    }}
  >
    Maurya Samanta
  </a>
  product
</Typography>

</Box>
  );
};

export default AuthPage;