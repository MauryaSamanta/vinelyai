import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import { Readable } from 'stream';
import OpenAI from "openai";
import Connection from '../models/Connections.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
import Group from '../models/Groups.js';
dotenv.config();

const openai = new OpenAI();
// Controller function to handle CSV upload and parse data
export const uploadLinkedInConnections = async(req, res) => {
  const {userId}=req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a CSV file' });
  }

  const results = [];
  const stream = Readable.from(req.file.buffer.toString());

  stream
  .pipe(csv())
  .on('data', (row) => {
    const formattedRow = {
      firstName: row[Object.keys(row)[0]] || '',
      lastName: row[Object.keys(row)[1]] || '',
      url: row[Object.keys(row)[2]] || '',
      email: row[Object.keys(row)[3]] || '',
      company: row[Object.keys(row)[4]] || '',
      position: row[Object.keys(row)[5]] || '',
    };
    results.push(formattedRow);
  })
  .on('end', async() => {
    results.forEach(async(connection)=>{
      const text = `${connection.firstName} ${connection.lastName} works as ${connection.position} at ${connection.company}`;
      const embedding = await generateEmbedding(text);
    
      const newConnection = new Connection({
        userId,
        firstName:connection.firstName,
        lastName:connection.lastName,
        company:connection.company,
        position:connection.position,
        url:connection.url,
        embedding,
      });
    
      await newConnection.save();
    })
    const user=await User.findById(userId);
    user.number_con=results.length;
    await user.save();
    res.status(200).json({ user:user });
  })
  .on('error', (error) => {
    res.status(500).json({ message: 'Error processing file', error: error.message });
  });
};

// Function to compute cosine similarity
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// 📌 Search Controller
export const search = async (req, res) => {
  try {
    const { userId, query, myconn, friendsall, groups } = req.body;
     
    if (!userId || !query) {
      return res.status(400).json({ error: "userId and query are required" });
    }

    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    const { filters } = await extractFiltersAndTraits(query);
    res.write(JSON.stringify({  filters }) + "\n");
    //Fetch Users and Friends of users
     const user = await User.findById( userId ).populate("friends");
    if (!user) return res.status(404).json({ error: "User not found" });

    const friendIds = user.friends.map(friend => friend._id);
    let allowedUsers=[]
    if(myconn)
      allowedUsers=[user._id];
    if(friendsall)
      allowedUsers.push(...friendIds);
    if(groups?.length>0){
      const groupData = await Group.find({ _id: { $in: groups } }, "members");

      let allMemberIds = groupData.flatMap(group => group.members);
  
      allMemberIds = allMemberIds.filter(memberId =>  !allowedUsers.includes(memberId.toString()));
      allowedUsers.push(...allMemberIds);
    }
    //const allowedUsers = [user._id, ...friendIds]; // User + Friends' IDs
    
    // Fetch all connections for the given user
    let connections = await Connection.find({ userId: { $in: allowedUsers } }).populate('userId');

// Filter out duplicates based on firstName and lastName
const seenNames = new Set();
connections = connections.filter(connection => {
  const fullName = `${connection.firstName} ${connection.lastName}`;
  if (seenNames.has(fullName)) {
    return false; // Skip duplicate
  }
  seenNames.add(fullName);
  return true; // Keep unique
});
    // Compute similarity for each connection
    const scoredConnections = connections.map((conn) => ({
      ...conn._doc, // Spread MongoDB document
      similarity: cosineSimilarity(queryEmbedding, conn.embedding),
    }));

    // Sort by similarity (higher is better)
    scoredConnections.sort((a, b) => b.similarity - a.similarity);
    
    // Return top 30 results
    res.write(JSON.stringify({ success: true, data: scoredConnections.slice(0, 30) }) + "\n");

  } catch (error) {
    console.error(" Error searching connections:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const extractFiltersAndTraits = async (query) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "Extract filters (education, workplace, location, etc(just show the filter which is there and present in a simple comma seperated way)) and generate a 2-3 possible summaries (2-3 word samples of the person the prompt is looking for) from the user's query. Return JSON of {filters:[], summaries:[]}.",
        },
        {
          role: "user",
          content: `Query: "${query}"`,
        },
      ],
      
    });

    const extractedData = JSON.parse(response.choices[0].message.content);
    console.log(extractedData);
    return {
      filters: extractedData || {},
      //traits: extractedData || [],
    };
  } catch (error) {
    console.error("Error extracting filters/traits:", error);
    return { filters: {}, traits: [] };
  }
};
export async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding; // Returns a vector
}


export const getmessages = async (req, res) => {
  try {
    const { mydetails, persondetails, messageType } = req.body;

    if (!mydetails || !persondetails || !messageType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Define the prompt for OpenAI
    const prompt = `
      Generate a friendly, engaging, and professional ice-breaker message based on the following details:
      - **Sender**: ${mydetails.firstName}, ${mydetails.lastName}.
      - **Receiver**: ${persondetails.firstName},${persondetails.lastName}, ${persondetails.position}, from ${persondetails.company}.
      - **Context**: The sender wants to connect for getting "${messageType}" purposes.

      Make sure the message is warm, relevant, and encourages further conversation. Send back just the message and nothing more before and after it.
    `;

    // Call OpenAI API to generate the message
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
    });

    const generatedMessage = response.choices[0]?.message?.content?.trim();

    if (!generatedMessage) {
      return res.status(500).json({ error: "Failed to generate message" });
    }

    return res.status(200).json({ message: generatedMessage });
  } catch (error) {
    console.error("Error generating message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteAllConnections = async (req, res) => {
  try {
    await Connection.deleteMany({}); // Delete all documents

    return res.json({ success: true, message: "All connections deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting connections:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

