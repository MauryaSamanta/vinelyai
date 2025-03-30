import { useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import { setLogout } from "../state";
const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  //console.log(user.avatar);
  return (
    <Box sx={{ position: "relative" }}>
      {/* User Avatar & Name */}
      <Button
        sx={{
          position: "absolute",
          width:200,
          bottom: 10,
          //left: 16,
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)", // Subtle greyish-white tint
    },
    textTransform:'none',
    borderRadius:'10px',
          flexDirection:'row'
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Avatar
          //alt={user.firstName}
          src={user.avatar} // Replace with the actual avatar URL
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="body2" sx={{ whiteSpace: "nowrap", fontSize:17 }}>
          {user.firstName} {user.lastName} 
        </Typography>
      </Button>

      {/* Slide-in Menu */}
      {menuOpen && (
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          style={{
            position: "absolute",
            bottom: 70,
            //left: 10,
            backgroundColor: "black",
            borderRadius: "10px",
            padding: "10px",
            width: "140px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Button
            fullWidth
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "transparent",
              borderRadius: "10px",
              justifyContent:'flex-start',
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              variant:'contained'
            }}
            onClick={() => console.log("Profile Clicked")}
            startIcon={<PersonPinIcon/>}
          >
            Profile
          </Button>
          <Button
            fullWidth
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "transparent",
              borderRadius: "10px",
              justifyContent:'flex-start',
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              variant:'contained'
            }}
            onClick={() => console.log("Profile Clicked")}
            startIcon={<SettingsIcon/>}
          >
            Settings
          </Button>
          <Button
            fullWidth
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: "transparent",
              borderRadius: "10px",
              justifyContent:'flex-start',
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              variant:'contained'
            }}
            onClick={() => {dispatch(setLogout())}}
            startIcon={<ExitToAppIcon/>}
          >
            Logout
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default UserMenu;
