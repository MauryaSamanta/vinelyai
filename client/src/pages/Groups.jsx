import { Box, Typography, Button, Divider, Grid, Avatar, IconButton } from "@mui/material";
import { Settings } from "@mui/icons-material";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SearchIcon from '@mui/icons-material/Search';
import { Lock, Schema, Search, FlashOn } from "@mui/icons-material";
import { useEffect, useState } from "react";
import CreateGroupModal from "../components/CreateGroup";
import { useSelector } from "react-redux";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useSearchParams} from 'react-router-dom';
import addlink from "../assets/add-link.png"
const featureData = [
    { title: "Data Privacy", icon: <Lock />, description: "Only group members can see other members' data" },
    { title: "Combined Networks", icon: <Schema />, description: "Expand your reach by adding more people" },
    { title: "Group Search", icon: <Search />, description: "Members can search the connections of everyone in the group" },
    { title: "Quick Setup", icon: <FlashOn />, description: "Create and manage your group in a few clicks" },
  ];

const GroupsPage = () => {
    const [groups,setgroups]=useState([]);
    const user=useSelector((state)=>state.user);
    const [creategroup,setcreategroup]=useState(false);
    const [searchParams,setSearchParams]=useSearchParams();
    useEffect(()=>{
        const getgroups=async()=>{
            
                if(searchParams.get("invite")){
                  const groupid=searchParams.get("invite");
                  const data={userId:user._id, groupId: groupid};
                  try {
                    const response=await fetch('http://localhost:3000/groups/addmember',{
                      method:"POST",
                      headers:{"Content-Type":"application/json"},
                      body:JSON.stringify(data)
                    });
                    if(response.status===200){
                      const returnedgrp=await response.json();
                      setgroups(returnedgrp);
                      setSearchParams('')
                    }
                  } catch (error) {
                    
                  }
                }
                else
                {const data={userId:user._id}
                try {
                    const response=await fetch('http://localhost:3000/groups/getgroups',{
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(data),
                        method:"POST"
                    });
                    const returneddata=await response.json();
                   setgroups(returneddata)
                  }
                    catch(error){

                    }
                    
            }
             
        }
        getgroups();
    },[])

 

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#121212", p: 3 }}>
      {/* Navbar on the Left */}
      <Navbar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, maxWidth: "70%", margin: "0 auto", p: 3, color: "white",}}>
        {/* Title and Subtitle */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="h3">
            Groups
          </Typography>
          <Typography variant="h6" color="gray">
            Perfect for teams and communities
          </Typography>
        </motion.div>

        {/* Feature Points */}
        <Grid container spacing={2} sx={{ marginTop: 3 }}>
  {featureData.map((feature, index) => (
    <Grid item xs={12} sm={6} key={index}> {/* Two per row */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            padding: "10px 15px",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            fontWeight: "bold",
          }}
        >
          {/* Icon inside a semi-green circular button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: "rgba(0, 255, 0, 0.06)", // Semi-green background
            }}
          >
            {feature.icon && (
              <Box sx={{ color: "#39ff14", fontSize: "24px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                {feature.icon}
              </Box>
            )}
          </Box>

          {/* Feature Text */}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
            <Typography sx={{  fontWeight: "bold", fontSize: 15 }}>
              {feature.title}
            </Typography>
            <Typography variant="body2" color="gray">
              {feature.description}
            </Typography>
          </Box>
        </Box>
      </motion.div>
    </Grid>
  ))}
</Grid>


<Box sx={{display:'flex', justifyContent:'center'}}>    
<Button
  variant="contained"
  sx={{
    marginTop: 4,
    background: "linear-gradient(135deg, #28a745, #1e7e34)", // Gradient green
    color: "white",
    padding: "2px 14px",
    textTransform: "none",
    fontSize: "18px",
    borderRadius: "8px", // Softer edges
    transition: "all 0.3s ease-in-out",

    "&:active": {
      transform: "scale(0.95)", // Press effect
      boxShadow: "0px 2px 5px rgba(0, 255, 0, 0.2)", // Reduce shadow on press
    },
  }}
  onClick={()=>{setcreategroup(true)}}
>
  Create group
</Button>
</Box>
<CreateGroupModal open={creategroup} handleClose={()=>{setcreategroup(false)}} groups={groups} setgroups={setgroups}/>
        {/* Divider */}
        <Divider sx={{ backgroundColor: "gray", marginY: 4 }} />

        {/* Group List */}
        <Grid container spacing={3}>
          {groups?.length>0 && groups.map((group, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 2,
                    borderRadius: "10px",
                    //backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    cursor:'pointer',
                    "&:hover": {  border: "1px solid rgba(4, 255, 0, 0.52)",},
                  }}
                >
                    <Box sx={{display:'flex', alignItems:'center', gap:2}}>
                  {/* Group Avatar */}
                  <Avatar sx={{ bgcolor: "white", color: "black", fontWeight: "bold" }}>
                    {group.name.charAt(0)}
                  </Avatar>

                  {/* Group Name */}
                  <Typography variant="h6">{group.name}</Typography>
                  </Box>

                    {/* Group Members Avatars (Overlapping) */}
  <Box sx={{ display: "flex", alignItems: "center", gap: "-10px" }}>
    {group.members?.slice(0, 2).map((member, index) => (
      <Avatar
        key={index}
        src={member.avatar}
        sx={{
          width: 32,
          height: 32,
          border: "2px solid white",
          marginLeft: index === 0 ? 0 : "-10px",
        }}
      />
    ))}

    {group.members?.length > 3 ? (
      <Avatar
        sx={{
          width: 32,
          height: 32,
          backgroundColor: "gray",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
          border: "2px solid black",
          marginLeft: "-10px",
        }}
      >
        +{group.members?.length - 2}
      </Avatar>
    ) : group.members[2] ? (
      <Avatar
        src={group.members[2].avatar}
        sx={{
          width: 32,
          height: 32,
          border: "2px solid black",
          marginLeft: "-10px",
        }}
      />
    ) : null}
  </Box>

                  <Box sx={{display:'flex', flexDirection:'row'}}>
                    <IconButton>
                  <img style={{ width:25,height:25 }}
                  onClick={()=>{navigator.clipboard.writeText(`http://localhost:5173/groups?invite=${group._id}&name=${group.name}`);}}
                  src={addlink}
                  />
                  </IconButton>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default GroupsPage;
