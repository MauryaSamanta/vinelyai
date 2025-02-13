import React from "react";
import { Dialog, DialogContent, Typography, Box, Divider, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const SearchDetailsModal = ({ open, onClose, result }) => {
  if (!result) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#111", // Sexy black background
          color: "white",
          borderRadius: "12px",
          padding: "10px",
        },
      }}
    >
      {/* Animated Box */}
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

          {/* Platform + LinkedIn */}
          <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="body2" sx={{ backgroundColor: "rgba(255,255,255,0.1)", padding:1, borderRadius:'10px', fontSize:14, width:75,textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
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
                <Typography variant="body2" sx={{ mr: 1, backgroundColor: "rgba(255,255,255,0.1)", padding:1, borderRadius:'10px', fontSize:14, width:75,textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center"}}>
              Mutuals
            </Typography>
            <Typography variant="body2" sx={{  opacity: 0.8 }}>
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
        </DialogContent>
      </motion.div>
    </Dialog>
  );
};

export default SearchDetailsModal;
