import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  CircularProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Close, CloudUpload } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../state';

export const ConnectionsUploadModal = ({ open, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isloading,setisloading]=useState(false);
  const user=useSelector((state)=>state.user);
  const token=useSelector((state)=>state.token);
  const dispatch=useDispatch();
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Implement file upload logic here
      console.log('Uploading file:', selectedFile);
      onClose();
    }
  };

  const upload=async()=>{
    try {
        const formData=new FormData();
        formData.append("userId", user._id);
        formData.append("file", selectedFile);
        setisloading(true);
        const response=await fetch('http://localhost:3000/connections/upload',{
            body:formData,
            method:"POST"
        });
        const returneddata=await response.json();
        dispatch(setLogin({
          user:returneddata.user,
          token:token
        }));
        onClose();
        setisloading(false);
    } catch (error) {
        
    }
  }

  return (
    <Modal 
      open={open} 
      onClose={()=>{onClose();setSelectedFile(null)}}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Box 
              sx={{
                width: 500,
                background: "linear-gradient(135deg, #101010, #222222)",
                color: 'white',
                borderRadius: 3,
                p: 4,
                position: 'relative',
                outline: 'none',
                boxShadow: '0 12px 24px rgba(0,0,0,0.3)'
              }}
            >
              <IconButton 
                onClick={()=>{onClose();setSelectedFile(null)}} 
                sx={{
                  position: 'absolute', 
                  top: 10, 
                  right: 10, 
                  color: 'white'
                }}
              >
                <Close />
              </IconButton>

              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold', 
                  textAlign: 'center' 
                }}
              >
                Upload Connections
              </Typography>

              <Box 
                sx={{
                  border: '2px dashed rgba(255,255,255,0.2)',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  mb: 3,
                  transition: 'all 0.3s',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)'
                  }
                }}
              >
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': {
                        borderColor: 'white'
                      }
                    }}
                  >
                    Choose CSV File
                  </Button>
                </label>
                {selectedFile && (
                  <Typography 
                    variant="body2" 
                    sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}
                  >
                    {selectedFile.name}
                  </Typography>
                )}
              </Box>

              <Button
                fullWidth
                variant="contained"
                disabled={!selectedFile}
                onClick={upload}
                sx={{
                  backgroundColor: selectedFile 
                    ? '#15ab33' 
                    : 'rgba(100, 100, 100, 0.5)',
                  '&:hover': {
                    backgroundColor: selectedFile 
                      ? '#15ab33' 
                      : 'rgba(100, 100, 100, 0.5)'
                  }
                }}
               // onClick={()=>{upload();}}
              >
                {!isloading?"Upload Connections": <CircularProgress 
                                  size={24} 
                                  sx={{ position: 'absolute', color: 'white' }} 
                                />}
              </Button>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};