import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import help from "../assets/linkedin.png";
const LinkedInCSVModal = ({ open, onClose, onNext }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #101010, #222222)",
            color: "white",
            width: "450px",
            padding: "24px",
            borderRadius: "12px",
            //boxShadow: "0px 10px 30px rgba(0, 255, 127, 0.3)",
            textAlign: "left",
            position: "relative",
          }}
        >
         
          <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
            Upload LinkedIn Connections
          </Typography>

          {/* Steps */}
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
            <ArrowForwardIosIcon sx={{ color: "#15ab33", fontSize: 20 }} />
            <Typography>
              Go to <b>LinkedIn</b> → Click on{" "}
              <b>‘Settings & Privacy’</b> → Select <b>‘Get a Copy of Your Data’</b>.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
            <ArrowForwardIosIcon sx={{ color: "#15ab33", fontSize: 20 }} />
            <Typography>
              Under <b>‘Connections’</b>, click <b>Request Archive</b>. 
              You’ll receive an email in a few minutes.
            </Typography>
          </Box>
          <img src={help} style={{width:400,height:200, borderRadius:10}}/>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2 }}>
            <ArrowForwardIosIcon sx={{ color: "#15ab33", fontSize: 20 }} />
            <Typography>
              Download the <b>CSV file</b> from your email and{" "}
              <b>upload it here</b>.
            </Typography>
          </Box>

          {/* Buttons Container */}
          <Box sx={{ display: "flex", justifyContent:"flex-end", mt: 3 }}>
            {/* Upload Button */}
            
            {/* Sexy "Next" Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "rgba(0, 255, 127, 0.3)",
                color: "#15ab33",
                fontWeight: "bold",
                padding: "10px 24px",
                borderRadius: "8px",
               // boxShadow: "0px 0px 15px rgba(0, 255, 127, 0.5)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#15ab33",
                  color: "#fff",
                  boxShadow: "0px 0px 20px rgba(0, 255, 127, 0.8)",
                },
              }}
              onClick={onNext}
            >
              Next →
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default LinkedInCSVModal;
