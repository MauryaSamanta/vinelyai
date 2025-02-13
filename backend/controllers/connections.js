import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import { Readable } from 'stream';
import OpenAI from "openai";
import Connection from '../models/Connections.js';
import User from '../models/User.js';

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
    const { userId, query } = req.body;
    
    if (!userId || !query) {
      return res.status(400).json({ error: "userId and query are required" });
    }

    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // Fetch all connections for the given user
    const connections = await Connection.find({ userId });

    // Compute similarity for each connection
    const scoredConnections = connections.map((conn) => ({
      ...conn._doc, // Spread MongoDB document
      similarity: cosineSimilarity(queryEmbedding, conn.embedding),
    }));

    // Sort by similarity (higher is better)
    scoredConnections.sort((a, b) => b.similarity - a.similarity);
    
    // Return top 20 results
    return res.json({ success: true, data: scoredConnections.slice(0, 20) });
  } catch (error) {
    console.error(" Error searching connections:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
async function generateEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return response.data[0].embedding; // Returns a vector
}


export const deleteAllConnections = async (req, res) => {
  try {
    await Connection.deleteMany({}); // Delete all documents

    return res.json({ success: true, message: "All connections deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting connections:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

