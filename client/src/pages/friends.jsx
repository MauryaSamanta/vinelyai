"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material"
import { Send as SendIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import Navbar from "../components/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { setLogin } from "../state"

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}))

const InviteTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: theme.spacing(1),
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
    "&.Mui-focused fieldset": { borderColor: "#15ab33" },
  },
  "& .MuiInputBase-input": { color: "white" },
}))

export default function FriendsInterface() {
  const [currentFriends] = useState([
    { id: 1, name: "Saptarshi Sinha", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
    { id: 2, name: "Mridul Das", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" },
  ])

  const [suggestedFriends] = useState([
    { id: 3, name: "Michael Schumacher", avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" },
    { id: 4, name: "Nasrin", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
    { id: 5, name: "Jaswinder Singh", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
  ])
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.user);
  const token=useSelector((state)=>state.token);
  const addfriend=async(friend)=>{
    const data={userid:user._id, friendid:friend._id};
    try {
      const response=await fetch('http://localhost:3000/user/addfriend',{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(data)
      });
      const returneddata=await response.json();
      dispatch(setLogin({
              user:returneddata.user,
              token:returneddata.token
            }));
    } catch (error) {
      
    }
  }

  return (
    <Box sx={{ display: "flex", height: "100%", backgroundColor: "#121212", p: 3 }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, maxWidth: "70%", margin: "0 auto", p: 3, color: "white" }}>
        <Typography variant="h5" sx={{ mb: 1, fontSize: 40 }}>
          Friends
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "rgba(255,255,255,0.7)" }}>
          Friends can search each other&apos;s connections
        </Typography>

        <StyledPaper>
          <Typography variant="h6" sx={{ mb: 2, color: "white" }}>
            Invite Friends
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}>
            Share a link or send an email invitation to your friends.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <InviteTextField fullWidth variant="outlined" placeholder="Enter email address or name" size="small" />
            <IconButton sx={{ backgroundColor: "#15ab33", color: "black", "&:hover": { backgroundColor: "#13992e" } }}>
              <SendIcon />
            </IconButton>
          </Box>
        </StyledPaper>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Current Friends</Typography>
        <Grid container spacing={2}>
          {currentFriends.map((friend) => (
            <Grid item xs={12} sm={4} key={friend.id}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: 1,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                <Avatar src={friend.avatar} sx={{ mr: 2 }} />
                <Typography sx={{color:'white'}}>{friend.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Suggested Friends</Typography>
        <Grid container spacing={2}>
          {suggestedFriends.map((friend) => (
            <Grid item xs={6} sm={4} md={2} key={friend.id}>
              <Card sx={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 2, height: 320 }}>
  <img src={friend.avatar} style={{ width: "100%", height: 200 }} />
  <CardContent>
    <Typography
      sx={{
        color: "white",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        fontWeight: "bold",
      }}
    >
      {friend.name.length > 8 ? friend.name.substring(0, 14) + "..." : friend.name}
    </Typography>
  </CardContent>
  <CardActions sx={{ justifyContent: "center" }}>
  <Button
  size="small"
  sx={{
    color: "#b3ffcc", // Light green text for visibility
    backgroundColor: "#085a1a", // Dark green background
    fontWeight: "bold",
   // fontSize: "14px",
    border: "2px solid #0c5e1d",
    "&:hover": { backgroundColor: "#0a4c18", border: "2px solid #083d14" },
    textTransform: "none",
    px: 2,
    borderRadius: 2,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  }}
  startIcon={<PersonAddIcon sx={{ color: "#b3ffcc" }} />} // Matching icon color
>
  Add Friend
</Button>

  </CardActions>
</Card>

            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
