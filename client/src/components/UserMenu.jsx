import { useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const UserMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user=useSelector((state)=>state.user);
  return (
    <Box sx={{ position: "relative" }}>
      {/* User Avatar & Name */}
      <Button
        sx={{
          position: "absolute",
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
          alt={user.firstName}
          src="https://via.placeholder.com/40" // Replace with the actual avatar URL
          sx={{ width: 40, height: 40 }}
        />
        <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
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
            bottom: 60,
            left: 10,
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
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              variant:'contained'
            }}
            onClick={() => console.log("Logout Clicked")}
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
