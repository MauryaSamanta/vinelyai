import React from "react";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

const PulseLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
       // height: "100vh", // Full height center
        padding:"8px"
        //backgroundColor: "black", // Optional dark background
      }}
    >
      <motion.div
        style={{
          width: 20, // Base size
          height: 20,
          borderRadius: "50%",
          backgroundColor: "rgba(34, 139, 34,1.0)", // Light greenish color
        }}
        animate={{
          scale: [1, 1.6, 1], // Expanding & shrinking
          opacity: [0.5, 1, 0.5], // Fading effect
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Box>
  );
};

export default PulseLoader;
