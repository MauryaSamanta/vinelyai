import React, { useState } from "react";
import scope from "../assets/people.png";
import { Box } from "@mui/material";
const ScopeSelect = () => {
  
  return (
   <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', borderRadius:"15px", borderColor:'rgba(255, 255, 255, 0.2)', borderStyle:'dashed', borderWidth:"1px",
    padding:"5px"}}>
    <img src={scope} style={{width:25, height:25}}/>
   </Box>
  );
};

export default ScopeSelect;
