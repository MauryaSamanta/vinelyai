import { useState } from "react"
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Drawer,
  ListItemButton,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Avatar,
  ListSubheader,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { LinkedIn, Close as CloseIcon, Menu as MenuIcon, ListOutlined } from "@mui/icons-material"
import SearchIcon from "@mui/icons-material/Search"
import PeopleIcon from "@mui/icons-material/People"
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact"
import logo from "../assets/comet.png"
import { useSelector } from "react-redux"
import { useTransform } from "framer-motion"
import UserMenu from "./UserMenu"
import HandshakeIcon from '@mui/icons-material/Handshake';
import GroupIcon from '@mui/icons-material/Group';
// Custom styled components
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 240,
    backgroundColor: "#242424",
    color: "white",
    borderRight: "1px solid rgba(255,255,255,0.1)",
  },
}))

const Logo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  "& img": {
    width: 40,
    height: 40,
  },
  "&:hover": {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
}))

const drawerItems = [
  { text: "Search", icon: <SearchIcon />, link: "/search" },
  { text: "Connections", icon: <ConnectWithoutContactIcon />, link: "/connections" },
  { text: "Friends", icon: <HandshakeIcon />, link: "/friends" },
]

export default function Navbar() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState('') // Track the selected tab

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleTabClick = (tab) => {
    setSelectedTab(tab)
  }
  const user=useSelector((state)=>state.user);

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: "fixed", top: 16, left: 16, color: "white", backgroundColor: "black", "&:hover": { backgroundColor: "#15ab33" } }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <StyledDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
      >
        <Logo>
          <img src={logo} alt="ChainHive.ai Logo" />
          <Typography variant="h6" component="div" sx={{cursor:'default'}}>
            SearchUp.ai
          </Typography>
        </Logo>
        <List sx={{padding:'10px'}}>
         
            <ListItemButton
              key={"Search"}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                fontWeight: selectedTab === "Search" ? 'bold' : 'normal', // Bold for selected tab
                borderRadius:'10px'
              }}
              component="a"
              href={"/search" || "#"}
              onClick={() => handleTabClick("Search")} // Set selected tab on click
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}><SearchIcon /></ListItemIcon>
              <ListItemText primary={"Search"} />
            </ListItemButton>
            <ListSubheader sx={{ color: "white", backgroundColor: "transparent" }}>Socials</ListSubheader>

            <ListItemButton
              key={"Connections"}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                fontWeight: selectedTab === "Connections" ? 'bold' : 'normal', // Bold for selected tab
                borderRadius:'10px'
              }}
              component="a"
              href={"/connections" || "#"}
              onClick={() => handleTabClick("Connections")} // Set selected tab on click
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}><ConnectWithoutContactIcon /></ListItemIcon>
              <ListItemText primary={"Connections"} />
            </ListItemButton>

            <ListItemButton
              key={"Friends"}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                fontWeight: selectedTab === "Friends" ? 'bold' : 'normal', // Bold for selected tab
                borderRadius:'10px'
              }}
              component="a"
              href={"/friends" || "#"}
              onClick={() => handleTabClick("Friends")} // Set selected tab on click
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}><HandshakeIcon /></ListItemIcon>
              <ListItemText primary={"Friends"} />
            </ListItemButton>

            <ListItemButton
              key={"Groups"}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                fontWeight: selectedTab === "Groups" ? 'bold' : 'normal', // Bold for selected tab
                borderRadius:'10px'
              }}
              component="a"
              href={"/groups" || "#"}
              onClick={() => handleTabClick("Groups")} // Set selected tab on click
            >
              <ListItemIcon sx={{ color: "white", minWidth: 40 }}><GroupIcon /></ListItemIcon>
              <ListItemText primary={"Groups"} />
            </ListItemButton>
           
        </List>
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "white",
          }}
        >
         
        <UserMenu/>
        </Box> 
      </StyledDrawer>
    </>
  )
}
