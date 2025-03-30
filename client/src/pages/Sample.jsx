import React from "react";
import { Box, Typography } from "@mui/material";

const PageWithWebBackground = () => {
  //const handleSubmit = async(e) => {
    //   e.preventDefault();
    //   setIsLoading(true);
    //   try {
    //     if(isLogin){
    //       const data={email:email, password:pass};
    //       console.log(data);
    //       const response=await fetch('http://localhost:3000/user/login',{
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(data),
    //         method:'POST'
    //       });
    //       const returneddata=await response.json();
    //       setIsLoading(false);
    //       dispatch(setLogin({
    //         user:returneddata.user,
    //         token:returneddata.token
    //       }));
    //       navigate('/search');
    //     }
    //     else
    //     {
    //       const data={firstName:first, lastName:last,email:email, password:pass};
    //       const response=await fetch('http://localhost:3000/user/signup',{
    //         headers:{"Content-Type":"application/json"},
    //         body:JSON.stringify(data),
    //         method:'POST'
    //       });
    //       const returneddata=await response.json();
    //       setIsLoading(false);
    //       dispatch(setLogin({
    //         user:returneddata.user,
    //         token:returneddata.token
    //       }));
    //       navigate('/search');
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  return (
    <Box sx={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Background Web Effect */}
     
{/* 
            <Divider sx={{ my: 2 }}>or</Divider>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                >
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>Email</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter your email" 
                      variant="outlined" 
                      sx={{ mb: 2 }} 
                      onChange={(e)=>{setemail(e.target.value)}}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>Password</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter your password" 
                      type="password" 
                      variant="outlined"
                      onChange={(e)=>{setpass(e.target.value)}} 
                    />
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    gap: 2, 
                    mb: 2 
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>First Name</Typography>
                      <TextField 
                        fullWidth 
                        placeholder="First name" 
                        variant="outlined" 
                        onChange={(e)=>{setfirst(e.target.value)}} 
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>Last Name</Typography>
                      <TextField 
                        fullWidth 
                        placeholder="Last name" 
                        variant="outlined" 
                        onChange={(e)=>{setlast(e.target.value)}} 
                      />
                    </Box>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>Email</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Enter your email" 
                      variant="outlined" 
                      sx={{ mb: 2 }}
                      onChange={(e)=>{setemail(e.target.value)}}  
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>Password</Typography>
                    <TextField 
                      fullWidth 
                      placeholder="Create a strong password" 
                      type="password" 
                      variant="outlined" 
                      onChange={(e)=>{setpass(e.target.value)}} 
                    />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            <Button 
              fullWidth 
              variant="contained" 
              type="submit" 
              disabled={isLoading}
              sx={{ 
                mb: 2, 
                position: 'relative', 
                backgroundColor:'#635acc',
                py: 1.5
              }}
            >
              {isLoading ? (
                <CircularProgress 
                  size={24} 
                  sx={{ position: 'absolute', color: 'white' }} 
                />
              ) : (
                isLogin ? 'Login' : 'Signup'
              )}
            </Button> */}

            {/* <Box sx={{ textAlign: 'center' }}>
              {isLogin ? (
                <Typography variant="body2">
                  Don't have an account yet? 
                  <Button 
                    onClick={() => setIsLogin(false)} 
                    sx={{ ml: 1 }}
                  >
                    Signup
                  </Button>
                </Typography>
              ) : (
                <Typography variant="body2">
                  Already have an account? 
                  <Button 
                    onClick={() => setIsLogin(true)} 
                    sx={{ ml: 1 }}
                  >
                    Login
                  </Button>
                </Typography>
              )}
            </Box> */}
      {/* Actual Page Content */}
      <Box
        sx={{
          position: "relative", // Ensure content is above the background
          zIndex: 10, // Higher than background
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Welcome to My Page</Typography>
        <Typography variant="h6">This is a web effect background.</Typography>
      </Box>
    </Box>
  );
};

export default PageWithWebBackground;
