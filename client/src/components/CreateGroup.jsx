import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, Fade, Backdrop, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const CreateGroupModal = ({ open, handleClose, groups,setgroups }) => {
  const [groupName, setGroupName] = useState("");
  const user=useSelector((state)=>state.user);
  const [loading,setloading]=useState(false);
  const create=async()=>{
    const data={name:groupName, createdBy:user._id};
    setloading(true);
    try {
        const response=await fetch('http://localhost:3000/groups/create',{
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data),
            method:"POST"
        });
        const returneddata=await response.json();
        handleClose();
        const newlist=[...groups,returneddata];
        setgroups(newlist);
        
        setloading(false);
    } catch (error) {
        
    }
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350,
            bgcolor: "#121212", // Dark theme background
            color: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: "12px",
          }}
        >
          {/* Modal Title */}
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}>
            Create a Group
          </Typography>
{/* Group Name Label */}
<Typography sx={{ color: "gray", fontSize: "14px", mb: 1, fontWeight: "500" }}>
  Group Name
</Typography>

{/* Group Name Input */}
<TextField
  fullWidth
  variant="outlined"
  value={groupName}
  onChange={(e) => setGroupName(e.target.value)}
  
  sx={{
    mb: 3,
    "& input": { 
      color: "white", 
      padding: "8px 10px" // Reduced padding
    },
    "& fieldset": { 
      borderColor: "gray", 
      borderRadius: "12px" // Curved border
    },
    "&:hover fieldset": { borderColor: "#39ff14" }, // Neon hover effect
    "&.Mui-focused fieldset": { borderColor: "#39ff14 !important", borderWidth: "2px" }, // Green focus effect
  }}
/>


          {/* Create Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #28a745, #1e7e34)", // Sexy green gradient
              color: "white",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "2px",
              transition: "all 0.3s ease-in-out",
              "&:hover": { background: "linear-gradient(135deg, #1e7e34, #146c32)" },
              "&:active": { transform: "scale(0.95)" }, // Press effect
            }}
            onClick={() => {
             create();
             
            }}
          >
           {!loading?" Create Group":<CircularProgress color="white"/>}
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CreateGroupModal;
