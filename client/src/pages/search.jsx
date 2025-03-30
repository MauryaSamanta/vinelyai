"use client"

import { useEffect, useState } from "react"
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Collapse,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Tooltip,
  Menu,
  MenuItem,
  Icon,
  Divider,
  useMediaQuery
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { LinkedIn, Close as CloseIcon, Search as SearchIcon } from "@mui/icons-material"
import Navbar from "../components/Navbar"
import {motion} from 'framer-motion';
import logo from "../assets/comet.png";
import XIcon from '@mui/icons-material/X';
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from "react-redux"
import ThinkingText from "../loaders/Thinking"
import SearchDetailsModal from "../components/SearchDetails"
import HelpButton from "../components/HelpButton"
import download from "../assets/download.png";
import { saveAs } from "file-saver";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useLiveSearch } from "../loaders/useLiveSearch"
import InfiniteScrollSuggestions from "../components/InfiniteScroll"
import PulseLoader from "../loaders/ThinkingPulse"
import { TypeAnimation } from 'react-type-animation';
import ScopeSelect from "../components/Scopeselect"
import scope from "../assets/people.png";
import Waves from "../components/WavesBack"

const SearchContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a1a1a",
  minHeight: "100vh",
  color: "white",
}))

export default function SearchInterface() {
  const [searchResults, setSearchResults] = useState([]);
  const user=useSelector((state)=>state.user);
  const [searched,setsearched]=useState(false);
  const [open,setOpen]=useState(false);
  const [prompt,setprompt]=useState('');
  const [isloading, setloading]=useState(false);
  const [showinddiag,setshowinddiag]=useState(false);
  const [filters,setfilters]=useState('');
  const [traits,settraits]=useState('');
  const [expanded, setExpanded] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [myconn,setmyconn]=useState(true);
  const [friendsall,setfriendsall]=useState(user.friends?.length>0?true:false);
  const [groups,setgroups]=useState([]);
  const [selectedgroups,setselectedgroups]=useState([]);
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
 const search = async () => {
    const query = prompt.trim() === '' ? 'Software Developers from Jadavpur University' : prompt;
    let data = { userId: user._id, query, myconn, friendsall};

    const selectedGroupIds = selectedgroups?.map(group => group._id);
    //console.log(selectedGroupIds)
    if(selectedGroupIds.length>0){
      data={...data,groups:selectedGroupIds}
    }
    console.log(JSON.stringify(data));
    setloading(true);
    try {
      const response = await fetch('http://localhost:3000/connections/search', {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data)
      }) .then(async (response) => {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
    
        let receivedText = "";
    
        while (true) {
          const { done, value } = await reader.read();
          if (done) break; // Stop reading when the stream ends
    
          receivedText += decoder.decode(value, { stream: true });
    
          // Handle multiple JSON responses (each `res.write()` sends one)
          try {
            const jsonChunks = receivedText.trim().split("\n"); // Split responses
            jsonChunks.forEach((chunk) => {
              if (!chunk) return;
    
              const parsedData = JSON.parse(chunk);
    
              if (parsedData.filters) {
                if(parsedData.filters.filters.length>0){
                  setfilters(parsedData.filters.filters)
                }
                if(parsedData.filters.summaries.length>0){
                  settraits(parsedData.filters.summaries)
                }
              } else if (parsedData.data) {
                setloading(false);
                setSearchResults(parsedData.data)

              }
            });
    
            // Reset receivedText to avoid duplicate parsing
            receivedText = "";
          } catch (err) {
            console.error("Error parsing JSON chunk:", err);
          }
        }
      });
      // const returneddata = await response.json();
      // setloading(false);
      // setSearchResults(returneddata.data);
    } catch (error) {
      // handle error
    }
  }


const exportToCSV = (data=searchResults, filename = `${prompt}.csv`) => {
  if (!data || data.length === 0) return;
   console.log(data);
  // Define CSV headers
  const headers = ["First Name", "Last Name", "Position", "Company", "LinkedIn URL"];
  
  // Convert data to CSV format
  const csvContent = [
    headers.join(","), // Add headers as first row
    ...data.map(result => 
      [
        `"${result.firstName}"`, 
        `"${result.lastName}"`, 
        `"${result.position}"`, 
        `"${result.company}"`, 
        `"${result.url}"`
      ].join(",") // Wrap values in quotes to avoid issues with commas
    )
  ].join("\n");

  // Create a Blob and trigger the download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, filename);
};

useEffect(()=>{
        const getgroups=async()=>{
            const data={userId:user._id}
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
             
        
        getgroups();
    },[])

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
     
      <SearchContainer component="main" sx={{ flex: 1, p: 3, alignItems:!searched&&'center', justifyContent:!searched&&'center', display:'flex'
    
       }}>
         

        <Box sx={{alignItems:!searched&&'center', justifyContent:!searched&&'center', display:'flex'}}>
        
        {!searched &&(<Box sx={{
          position:'absolute',
          bottom:30,
          right:50
        }}>
          <HelpButton/>
        </Box>)}
        <Box sx={{ minWidth: '70%', margin: "0 auto", mt:searched&&4, ml:30}}>
        {!searched && (<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
          
          }}
        >
          <img src={logo} style={{width:70, height:70, marginBottom:10}}/>
          {/* <Typography sx={{display:'flex', fontSize:40,cursor:'default'}}>Search People from your Network</Typography> */}
          <TypeAnimation
            sequence={[
              `Search People from your Network`,  // Show filters text
            ]}
            speed={35} // Typing speed
            style={{display:'flex', fontSize:!isSmallScreen?40:20,cursor:'default'}} // Keeps new lines and space between each part
            repeat={0} // No repeat
            cursor={false}
          />
         
          </motion.div>)}
       
       {!searched &&( <TextField
  fullWidth
  placeholder="I am looking for....."
  variant="outlined"
  autoComplete="off"
  value={prompt}
  sx={{
    width: "700px",
    margin: "0 auto",
    display: "flex",
    mb: 3,
    "& .MuiOutlinedInput-root": {
      color: "white",
      backgroundColor: "rgba(255,255,255,0.1)",
      borderRadius: 5,
      height: "130px",
      alignItems: "flex-start",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3), inset 0px -4px 6px rgba(255,255,255,0.1)", // 3D effect
      border: "1px solid rgba(255,255,255,0.2)",
      //background: "linear-gradient(145deg, rgba(255,255,255,0.15), rgba(0,0,0,0.2))", // Subtle comic gradient
      transition: "0.3s ease-in-out",
      "& fieldset": {
        border: "none", // Removes default MUI border
      },
      "&:hover": {
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.4), inset 0px -5px 8px rgba(255,255,255,0.2)", // Stronger hover depth
      },
      "&.Mui-focused": {
        //boxShadow: "0px 6px 18px rgba(81, 254, 81, 0.4), inset 0px -6px 8px rgba(255,255,255,0.25)", // Glowing focused state
       // background: "linear-gradient(145deg, rgba(255,255,255,0.2), rgba(0,0,0,0.3))",
      },
    },
    "& .MuiInputBase-input": {
      paddingTop: "12px",
    },
  }}
  onChange={(e) => {
    setprompt(e.target.value);
  }}
  InputProps={{
    startAdornment:(
      <Box sx={{position:'absolute', bottom:5, left:5, display:'flex', flexDirection:'row', alignItems:'center', gap:"2px"}}>
       <IconButton  
  onClick={(event) => {
    setMenuAnchor(event.currentTarget); //  Set anchor correctly
  }}
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "10px",
    padding: "5px",
    borderColor: myconn === false && friendsall === false && selectedgroups.length===0  ? "red" : "rgba(255, 255, 255, 0.2)",
    borderStyle: myconn === false && friendsall === false && selectedgroups.length===0 ? "solid" : "dashed",
    borderWidth: myconn === false && friendsall === false && selectedgroups.length===0 ? "2px" : "1px",
    animation: myconn === false && friendsall === false && selectedgroups.length===0 
      ? "blinkBorder 2s infinite" 
      : "none", //  Apply blinking only when both are false
    "@keyframes blinkBorder": {
      "0%": { borderColor: "red" },
      "50%": { borderColor: "transparent" },
      "100%": { borderColor: "red" },
    }
  }}
>
  <img src={scope} style={{ width: 25, height: 25 }} />
</IconButton>
{!myconn && !friendsall && selectedgroups.length===0 && (<Typography sx={{color:'grey', fontSize:16}}>You need to select directories or groups to search over</Typography>)}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "top", // ✅ Opens at the top of the button
         // horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom", // ✅ Ensures it expands upwards
         // horizontal: "center",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgba(20, 20, 20, 1.0)", // ✅ Dark background but doesn't affect padding
            borderRadius: 2, // Optional: Rounded corners for a sleek look
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", // Optional: 3D depth
            color:"white",
            
          },
        }}
      >

<Typography sx={{ px: 2, py: 1, fontSize: 14, color: "gray" }}>
    Connections
  </Typography>
  <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mx: 1 }} />
          <MenuItem
            
            onClick={() => {
             setmyconn(!myconn);
            }}
            sx={{
              "&:hover": { backgroundColor: "rgba(34, 139, 34, 0.3)" },
              fontSize:15
            }}
          >
            Your Connections
          </MenuItem>
         {user.friends?.length>0&&( <MenuItem
            
            onClick={() => {
             setfriendsall(!friendsall);
            }}
            sx={{
              "&:hover": { backgroundColor: "rgba(34, 139, 34, 0.3)" },
              fontSize:15
            }}
          >
            Your Friends' Connections
          </MenuItem>)}
          
          {groups?.length > 0 && (
    <Typography sx={{ px: 2, py: 1, fontSize: 14, color: "gray" }}>
      Groups
    </Typography>
  )}
  <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)", mx: 1 }} />
           {/* Dynamically List Groups */}
  {groups?.map((group) => (
    <MenuItem
      key={group._id}
      onClick={() => {
        if (!selectedgroups.some((g) => g._id === group._id)) {
          setselectedgroups([...selectedgroups, group]);
        }
      }}
      sx={{
        "&:hover": { backgroundColor: "rgba(34, 139, 34, 0.3)" },
        fontSize: 15,
      }}
    >
      {group.name}
    </MenuItem>
  ))}
      </Menu>
      {myconn&&(  <Typography
                onClick={()=>{setmyconn(false)}}
               sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                fontSize:10,
                borderRadius: "6px",
                padding: "2px 10px",
                fontWeight:'bold',
                transition: "0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
                cursor:'pointer'
              }}
              letterSpacing={"1px"}
            >Your connections</Typography>)}
            {friendsall&&(  <Typography
            onClick={()=>{setfriendsall(false)}}
               sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "white",
                fontSize:10,
                borderRadius: "6px",
                padding: "2px 10px",
                fontWeight:'bold',
                transition: "0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
                cursor:'pointer'
              }}
              letterSpacing={"1px"}
            >Your friends' connections</Typography>)}


 
    {selectedgroups?.map((group)=>(<Typography
      key={group?._id}
      onClick={() => {
        setselectedgroups(selectedgroups.filter((groups) => groups._id !== group._id));
      }}
      sx={{
        backgroundColor: "rgba(255,255,255,0.1)",
        color: "white",
        fontSize: 10,
        borderRadius: "6px",
        padding: "2px 10px",
        fontWeight: "bold",
        transition: "0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
          backgroundColor: "rgba(255,255,255,0.1)",
        },
        cursor: "pointer",
      }}
      letterSpacing={"1px"}
    >
      {group?.name}
    </Typography>))}



      </Box>
    ),
    endAdornment: (
      <IconButton
        sx={{
          color: "rgba(81, 254, 81, 0.8)",
          position: "absolute",
          bottom: 5,
          right: 5,
          backgroundColor: "rgba(34, 139, 34,0.3)",
          borderRadius: "17px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3), inset 0px -2px 4px rgba(255,255,255,0.2)", // 3D effect for button
          transition: "0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.5), inset 0px -3px 5px rgba(255,255,255,0.3)",
            backgroundColor: "rgba(34, 139, 34,0.5)",
          },
        }}
        onClick={() => {
          setsearched(true);
          search();
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    ),
  }}
/>

)}
        {!searched && (
  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width:'100%' }}>
    <Box
      sx={{
       // width: "80%", // Adjust width as needed
        overflow: "hidden",
        position: "relative",
        maskImage: "linear-gradient(to right, rgba(0, 0, 0, 0.1), black 30%, black 70%, rgba(0, 0, 0, 0.1))",
        WebkitMaskImage: "linear-gradient(to right, rgba(0, 0, 0, 0.1), black 30%, black 70%, rgba(0, 0, 0, 0.1))",
      }}
    >
      <InfiniteScrollSuggestions />
    </Box>
  </Box>
)}

          {searched>0 && (
            <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', width:1100}}>
            <Typography sx={{color:'white', fontSize:30, fontWeight:600}}>{prompt}</Typography>
           {searchResults.length>0 &&( <Tooltip title="Export to CSV" placement="bottom"
              componentsProps={{
                tooltip: {
                  sx: {
                    backgroundColor: '#333', // Change this to your desired color
                    color: 'white', // Ensure text is visible
                    fontSize: '12px', // Adjust font size if needed
                    borderRadius: '6px', // Slightly rounded edges
                    padding: '6px 10px', // Comfortable padding
                  },
                },
              }}>
      <Button
        sx={{
          borderRadius: '5px', // Curved border
          border: '0.3px solid rgba(255, 255, 255, 0.1)', // Gray border
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          minWidth: '24px', // Reduced button size
    height: '27px',
          padding: "4px 3px",
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
        onClick={()=>{exportToCSV();}}
       // onClick={handleExportCSV} // Define this function to handle CSV export
      >
        <img src={download} style={{width:'25px', height:'25px'}}/>
      </Button>
    </Tooltip>)}
            </Box>
          )}
     
          {searched && (<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
      

         {isloading || searchResults?.length>0 ? ( <Box sx={{ my: 2,  display:'flex', flexDirection:'column', justifyContent:'flex-start' }}>
         <Box sx={{display:'flex', flexDirection:"row", alignItems:'center'}}>
      {isloading && searchResults?.length===0 && ( <PulseLoader/>)}
      {searchResults?.length>0 && (<Box
      sx={{
        backgroundColor: "rgba(34, 139, 34, 0.2)", // Sexy darker green
        borderRadius: "50%",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr:1
      }}
    >
      <img
        src={logo}
        style={{ width: 27, height: 27 }}
      />
    </Box>)}
       {/* Analysing Text */}
       <TypeAnimation
          sequence={[
            'Analysing your search query...',  // Start typing the "Analysing your search query" text
          ]}
          speed={50} // Typing speed (adjust as needed)
          style={{ fontSize: 17, whiteSpace: 'pre-line', marginBottom: 5 }} // Keeps new lines and space between each part
          repeat={0} // No repeat
          cursor={false}
        />
        </Box>
        <Box sx={{ml:6, display:'flex', flexDirection:'column'}}>
        {/* Filter Text */}
        {!(filters && filters.length>0) &&(traits && traits.length>0) ?(
          <TypeAnimation
            sequence={[
              `Profiling: ${traits.join(', ')}`,  // Show filters text
              
            ]}
            speed={50} // Typing speed
            style={{ fontSize: 17, whiteSpace: 'pre-line', marginBottom: 5}} // Keeps new lines and space between each part
            repeat={0} // No repeat
            cursor={false}
          />
        ):(filters && filters.length>0) ||(traits && traits.length>0) ?( <TypeAnimation
          sequence={[
            `Filtering By: ${filters?.join(', ')} \nProfiling: ${traits.join(', ')}`,  // Show filters text
            
          ]}
          speed={50} // Typing speed
          style={{ fontSize: 17, whiteSpace: 'pre-line', marginBottom: 5}} // Keeps new lines and space between each part
          repeat={0} // No repeat
          cursor={false}
        />):(<></>)}

         {searchResults?.length > 0 && (
  <Typography
    variant="body2"
    sx={{
      mt: 1,
      color: "rgba(255,255,255,1)",
      fontSize: 18,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    }}
  >
  Got it! I have searched from {myconn && `${user.number_con} first-degree connections`} {myconn && friendsall && "and"} {friendsall && `${user.friends.reduce((sum, friend) => sum + Number(friend.number_con),0)} more from your friends' networks`}  {(myconn || friendsall)&&"and"} {selectedgroups.length>0 && `${selectedgroups.length} of your groups`} and found these for you
  </Typography>
)}

      </Box>
    </Box>):(<></>)}
   
          <List>
  {searchResults?.map((result) => (
    <ListItem
      key={result.id}
      sx={{
        mb: 1,
        backgroundColor: "rgba(255,255,255,0.1)",
        borderRadius: 3,
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.2)",
        },
        cursor:'pointer'
      }}
      onClick={()=>{setshowinddiag(result);}}
    >
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight="bold" letterSpacing={1}>
            {result.firstName} {result.lastName}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
            {result.position} {result.company}
          </Typography>
        }
      />
      <ListItemSecondaryAction>
      
        <IconButton size="small" sx={{ color: "#0077b5" }} onClick={()=>{ window.open(result.url, "_blank");}}>
          <LinkedIn />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))}
</List>
<SearchDetailsModal open={showinddiag} onClose={()=>{setshowinddiag(false)}} result={showinddiag}/>

          </motion.div>)}
        </Box>
        </Box>
      </SearchContainer>
     
    </Box>
  )
}

