import React, { useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import QuestionIcon from "../assets/question.png"; // Adjust path if needed

const HelpButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ width: 50 }}
      animate={{ width: isHovered ? 130 : 50 }} // Expands to the left only
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: isHovered ? "#25bc23" : "transparent",
        borderRadius: "25px",
        overflow: "hidden",
        padding: 1,
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <IconButton sx={{ padding: 0 }}>
        <img src={QuestionIcon} alt="Help" style={{ width: 40, height: 40 }} />
      </IconButton>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              paddingLeft: "8px",
            }}
          >
            Help
          </Typography>
        </motion.div>
      )}
    </motion.div>
  );
};

export default HelpButton;
