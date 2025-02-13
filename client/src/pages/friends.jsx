"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material"
import { Send as SendIcon, PersonAdd as PersonAddIcon } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import Navbar from "../components/Navbar" // Import Navbar component

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
    "& fieldset": {
      borderColor: "rgba(255,255,255,0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255,255,255,0.3)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#15ab33",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
}))

export default function FriendsInterface() {
  const [currentFriends, setCurrentFriends] = useState([
    { id: 1, name: "Saptarshi Sinha", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
    { id: 2, name: "Mridul Das", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
  ])

  const [suggestedFriends, setSuggestedFriends] = useState([
    { id: 3, name: "Michael Schumacher", avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
    { id: 4, name: "Nasrin", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
    { id: 5, name: "Jaswinder Singh", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
    { id: 6, name: "Ariana Grande", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
    { id: 7, name: "Elon Musk", avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
    { id: 8, name: "Emma Watson", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
    { id: 9, name: "Chris Hemsworth", avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=40&w=40" },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const addFriend = (friend) => {
    setCurrentFriends([...currentFriends, friend])
    setSuggestedFriends(suggestedFriends.filter((f) => f.id !== friend.id))
  }

  const removeFriend = (friend) => {
    setCurrentFriends(currentFriends.filter((f) => f.id !== friend.id))
    setSuggestedFriends([...suggestedFriends, friend])
  }

  const filteredSuggestedFriends = suggestedFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box sx={{ display: "flex", height: "100%", backgroundColor: "#121212", p: 3 }}>
      <Navbar />
      <Box sx={{ flexGrow: 1, maxWidth: 800, margin: "0 auto", p: 3, color: "white" }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Friends
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: "rgba(255,255,255,0.7)" }}>
          Friends can search each other&apos;s connections
        </Typography>

        <StyledPaper>
          <Typography variant="h6" sx={{ mb: 2, color:'white' }}>
            Invite Friends
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: "rgba(255,255,255,0.7)" }}>
            Share a link or send an email invitation to your friends.
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <InviteTextField
              fullWidth
              variant="outlined"
              placeholder="Enter email address or name"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              sx={{
                backgroundColor: "#15ab33",
                color: "black",
                "&:hover": { backgroundColor: "#13992e" },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </StyledPaper>

        <List>
        Your Friends

        
          {currentFriends.map((friend) => (
            <ListItem
              key={friend.id}
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 1,
                mb: 1,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar src={friend.avatar} />
              </ListItemAvatar>
              <ListItemText primary={friend.name} />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  sx={{
                    color: "red",
                    border: "1px solid red",
                    "&:hover": { backgroundColor: "rgba(255,0,0,0.1)" },
                  }}
                  onClick={() => removeFriend(friend)}
                >
                  <PersonAddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Suggested Friends
        </Typography>

        <List>
          {filteredSuggestedFriends.map((friend) => (
            <ListItem
              key={friend.id}
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 1,
                mb: 1,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar src={friend.avatar} />
              </ListItemAvatar>
              <ListItemText primary={friend.name} />
              <ListItemSecondaryAction>
                <IconButton
                  size="small"
                  sx={{
                    color: "#15ab33",
                    border: "1px solid #15ab33",
                    "&:hover": { backgroundColor: "rgba(21,171,51,0.1)" },
                  }}
                  onClick={() => addFriend(friend)}
                >
                  <PersonAddIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  )
}

