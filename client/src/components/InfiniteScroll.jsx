import React from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

const suggestedSearches = [
  "Passouts from IIT Kharagpur who have worked at Google",
  "Law graduates from NALSAR working in corporate law",
  "Mechanical engineers from IIT Bombay now working at Tesla",
  "Artists from JJ School of Arts who became digital illustrators",
  "Economics graduates from Delhi University working in investment banking",
  "Entrepreneurs from IIM Ahmedabad who founded fintech startups",
  "Musicians from KM Conservatory working in Bollywood",
  "Psychologists from Jadavpur University specializing in behavioral finance",
  "Chemical engineers from NIT Trichy in the pharma industry",
  "Chartered Accountants from ICAI who moved into venture capital",
  "Fashion designers from NIFT who launched their own brands",
  "Philosophy graduates from Calcutta University working in content creation",
  "Literature majors from St. Xavier’s Kolkata working in publishing",
  "AI researchers from IISc Bangalore working in self-driving cars",
  "Doctors from AIIMS who transitioned into health-tech startups",
  "Historians from JNU who became documentary filmmakers",
  "Mechanical engineers from BITS Pilani working in EVs",
  "Investment bankers from ISB Hyderabad who switched to impact investing",
  "Sports scientists from Lakshmibai National Institute working with Olympic teams",
  "Startup founders from YC with a background in sociology",
  "Web3 developers from IIIT Hyderabad working on blockchain startups",
  "Economics majors from Presidency University in RBI research roles",
  "Civil engineers from SRM Chennai who worked on metro projects",
  "Commerce graduates from Calcutta University who built unicorn startups"
];


const InfiniteScrollSuggestions = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: 600,
        overflow: "hidden",
       // borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        //background: "rgba(255, 255, 255, 0.1)",
        //boxShadow: "0px 0px 30px rgba(0,0,0,0.1)"
      }}
    >
      {/* Blurred Edge Effect */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
         // background: "linear-gradient(to right, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)",
          zIndex: 2
        }}
      />

      {/* Scrolling Text */}
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap" }}
        animate={{ x: ["30%", "-30%"] }}
        transition={{
          repeat: Infinity,
          duration: 90,
          ease: "linear"
        }}
        whileHover={{ x: "0%" }}
      >
        {suggestedSearches.map((item, index) => (
          <Box
            key={index}
            sx={{
              minWidth: "200px",
              margin: "0 10px",
              padding: "10px 20px",
              borderRadius: "10px",
              background: " rgba(255,255,255,0.1)",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity:0.5
            }}
          >
            <Typography
             
              sx={{ color: "#fff", fontWeight: "bold", whiteSpace: "nowrap", fontSize:15 }}
            >
              {item}
            </Typography>
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default InfiniteScrollSuggestions;
