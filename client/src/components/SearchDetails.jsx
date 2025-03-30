import React, { useState } from "react";
import { Dialog, DialogContent, Typography, Box, Divider, IconButton, Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";
import SendIcon from "@mui/icons-material/Send"; // Added an icon for the "Create Message" button
import { useSelector } from "react-redux";

const SearchDetailsModal = ({ open, onClose, result }) => {
  const [isMessageStage, setIsMessageStage] = useState(false); // Track if we are in the message creation stage
  const [showMessage, setShowMessage] = useState(false); // Control message visibility
  const [selectedButton, setSelectedButton] = useState(null); // Track which button is selected
  const [loading,setloading]=useState(false);
  const user=useSelector((state)=>state.user);
  if (!result) return null;

  // Handle the "Create Message" button click
  const handleCreateMessage = async() => {
    const data={mydetails:user,persondetails:result, messageType:selectedButton};
    setloading(true);
    try {
      const response=await fetch('http://localhost:3000/connections/getmsg',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      const returneddata=await response.json();
      setloading(false);
      setShowMessage(returneddata.message);
    } catch (error) {
      
    }
  };

  // Handle animation transition
  const handleEmailClick = () => {
    setIsMessageStage(true); // Move to message stage
  };

  // Handle button selection
  const handleButtonSelect = (button) => {
    setSelectedButton(button);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {onClose(); setIsMessageStage(false); setShowMessage(false)}}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#111", // Sexy black background
          color: "white",
          borderRadius: "12px",
          padding: "10px",
        },
        cursor: "pointer",
      }}
    >
      {/* Email Icon Button */}
      <IconButton
        onClick={handleEmailClick}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "white",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          padding: "8px",
        }}
      >
        <MailIcon />
      </IconButton>

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <DialogContent>
          {/* Name */}
          <Typography variant="h6" fontWeight="bold">
            {result.firstName} {result.lastName}
          </Typography>

          {/* Show message creation content only after clicking the email button */}
          {isMessageStage ? (
            <>
              {/* Buttons for different purposes */}
              <Box display="flex" justifyContent="space-between" mt={2}>
              {["Referral", "Networking", "Career Advice", "Job Opportunity"].map((button) => (
  <Button
    key={button}
    variant="outlined"
    sx={{
      borderRadius: "30px", // Increased roundness for a smoother look
      width: "22%", // Adjust width so that it fits the text properly
      color: selectedButton === button ? "#ffffff" : "#b3ffcc", // Light green text for visibility, white when selected
      backgroundColor: selectedButton === button ? "#085a1a" : "#085a1a", // Keep the same dark green background
      fontWeight: "bold",
      border: selectedButton === button ? "2px solid #4caf50" : "2px solid #0c5e1d", // Highlight border in green when selected
      "&:hover": {
        backgroundColor: selectedButton === button ? "#4caf50" : "#0a4c18", // Dark green on hover, lighter green when selected
        border: selectedButton === button ? "2px solid #388e3c" : "2px solid #083d14", // Lighter green border when selected
        transform: selectedButton === button ? "scale(1.1)" : "scale(1.05)", // Slight scale effect on hover, stronger when selected
        boxShadow: selectedButton === button ? "0px 6px 12px rgba(0, 0, 0, 0.2)" : "0px 4px 10px rgba(0, 0, 0, 0.1)", // Add shadow for depth
      },
      display: "flex",
      justifyContent: "center", // Center text horizontally
      alignItems: "center", // Center text vertically
      whiteSpace: "nowrap", // Ensure text doesn't overflow and wraps
      overflow: "hidden", // Hide overflowed text
      textOverflow: "ellipsis", // Add ellipsis if text overflows
      padding: 1, // Slight padding to make buttons feel more comfortable
      textTransform: "none", // No text transform
    }}
    onClick={() => handleButtonSelect(button)}
  >
    <Typography
      variant="body2"
      noWrap
      sx={{
        fontSize: "9px",
        display: "flex",
        justifyContent: "center", // Center text horizontally
        alignItems: "center", // Center text vertically
      }}
    >
      {button}
    </Typography>
  </Button>
))}

</Box>
 {/* Show generated message with copy option */}
 {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box mt={2} display="flex" justifyContent="center" alignItems="center" sx={{overflowY:'auto'}}>
                    <Typography variant="body2" sx={{ maxWidth: "80%", textAlign:'justify' }}>
                      {showMessage}
                      </Typography>
                    <IconButton
                      sx={{
                        color: "#635acc",
                        marginLeft: "10px",
                      }}
                      onClick={() =>
                        navigator.clipboard.writeText(showMessage)
                      }
                    >
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>Copy</Typography>
                    </IconButton>
                  </Box>
                </motion.div>
              )}

              {/* "Create Message" Button */}
<Box  mt={3}>
  <Button
    variant="contained"
    sx={{
      backgroundColor: "#4caf50", // Green background
      color: "white",
      borderRadius: "10px", // Increased roundness for a sleeker look
      padding: "5px 10px", // Smaller padding for a more compact design
      fontSize: "14px", // Adjusted font size for better readability
      fontWeight: "500", // Slightly lighter font weight for a more modern look
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow for depth
      display: "flex",
      alignItems: "center",
      transition: "all 0.3s ease-in-out", // Smooth transition on hover
      "&:hover": {
        backgroundColor: "#388e3c", // Darker green on hover
        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)", // More prominent shadow on hover
        transform: "scale(1.05)", // Slight scale on hover for interactivity
      },
      textTransform:'none'
    }}
    onClick={handleCreateMessage}
  >
   {!loading && <SendIcon sx={{ marginRight: 1, fontSize: "18px" }} /> }
    {!showMessage && !loading?"Create Message":showMessage && !loading && "Re-Generate"}
    {loading &&   <CircularProgress
                      size={24} 
                      sx={{ position: 'absolute', color: 'white' }} 
                    />}
  </Button>
</Box>


             
            </>
          ) : (
            <>
              {/* Platforms & LinkedIn */}
              <Box display="flex" alignItems="center" mt={1}>
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: 1,
                    borderRadius: "10px",
                    fontSize: 14,
                    width: 75,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Platforms
                </Typography>
                <IconButton
                  component="a"
                  href={result.url}
                  target="_blank"
                  sx={{
                    color: "#0077B5", // LinkedIn Blue
                  }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>

              {/* Mutuals */}
              {result.userId && (
                <Box display="flex" alignItems="center" mt={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      mr: 1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      padding: 1,
                      borderRadius: "10px",
                      fontSize: 14,
                      width: 75,
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Mutuals
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {result.userId.firstName} {result.userId.lastName}
                  </Typography>
                </Box>
              )}

              {/* Divider */}
              <Divider sx={{ my: 2, backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

              {/* Position & Company */}
              <Typography variant="body2" fontWeight="bold">
                {result.position}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {result.company}
              </Typography>
            </>
          )}
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

export default SearchDetailsModal;
