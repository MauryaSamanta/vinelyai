import { Box, Typography, Button, Paper, Icon } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LinkedIn, Twitter } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { ConnectionsUploadModal } from "../components/Uploadcsv";
import { useSelector } from "react-redux";
import LinkedInCSVModal from "../components/LinkedInHelpModal";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  minWidth:400
}));

const ConnectionCard = ({ icon: Icon, title, color }) => {
  //const [openlicon,setopenlicon]=useState(false);
  <StyledPaper >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2}}>
      <Icon sx={{ fontSize: 32, color }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 1, display:'flex', alignItems:'flex' }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
    <Button
      variant="outlined"
      sx={{
        color: "white",
        borderColor: "#15ab33",
        backgroundColor: "#15ab33",
        "&:hover": {
          borderColor: "#13992e",
          backgroundColor: "#15ab33",
        },
        "&:focus": {
          borderColor: "#15ab33",
        },
        alignSelf: "flex-start",
      }}
     
    >
      Connect
    </Button>
  </StyledPaper>
};

export default function ConnectionsInterface() {
  const [openlicon,setopenlicon]=useState(false);
  const [opendropdown,setopendropdown]=useState(false);
  const user=useSelector((state)=>state.user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        color: "white",
        backgroundColor: "#121212",
      }}
    >
      <Navbar />
      <Box sx={{ flexGrow: 1, p: 3, pt: 7, margin: "0 auto", maxWidth: '70%' }}>
        <Typography variant="h3" sx={{ mb: 1}}>
          Connections
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 1, color: "rgba(255,255,255,0.8)", fontSize:20 }}
        >
          Make your network searchable to you, your friends, and groups
          you&apos;re in. We never share, sell, or use your data to train AI
          models.
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 4, color: "rgba(255,255,255,0.8)", fontSize:20 }}
        >
          Processing typically takes a couple hours.
        </Typography>
        <Box sx={{ maxWidth: 400, display:'flex', flexDirection:'row', gap:5 }}>
        <StyledPaper >
    <Box sx={{  alignItems: "center", gap: 2}}>
      <LinkedIn sx={{ fontSize: 32, color:"#0077b5" }}  />
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.8)", mb: 1, display:'flex', alignItems:'flex', fontWeight:700, fontSize:15 }}
        >
         LinkedIn
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.5)", display:'flex', alignItems:'flex' }}
        >
         upload a csv of your linkedin connections
        </Typography>
      </Box>
    </Box>
    <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
    <Button
      variant="outlined"
      sx={{
        color: "white",
        borderColor: "#15ab33",
        backgroundColor: "#15ab33",
        "&:hover": {
          borderColor: "#13992e",
          backgroundColor: "#15ab33",
        },
        "&:focus": {
          borderColor: "#15ab33",
        },
        alignSelf: "flex-start",
      }}
      onClick={()=>{setopenlicon(true)}}
    >
      Connect
    </Button>
    {user.number_con && (
  <Typography
    sx={{
      border: '2px solid #2ECC71', // Elegant green border
      backgroundColor: 'rgba(46, 204, 113, 0.1)', // Slightly transparent green
      color: '#2ECC71', // Classy green text
      padding: '4px 10px', // Adds some spacing
      borderRadius: '6px', // Soft, rounded edges
      display: 'inline-block', // Ensures proper spacing
      fontWeight: 600, // Makes it stand out subtly
      cursor:'pointer'
    }}
  >
    Active
  </Typography>
)}

    </Box>
    <LinkedInCSVModal open={openlicon} onClose={()=>{setopenlicon(false)}} onNext={()=>{setopenlicon(false); setopendropdown(true)}}/>
    <ConnectionsUploadModal open={opendropdown} onClose={()=>{setopendropdown(false)}}/>
  </StyledPaper>
          {/* <ConnectionCard
            icon={LinkedIn}
            title="Import a list of your LinkedIn connections"
            color="#0077b5"
          />
          <ConnectionCard
            icon={Twitter}
            title="Import a list of your Twitter followers"
            color="#1DA1F2"
          /> */}
        </Box>
      </Box>
    </Box>
  );
}
