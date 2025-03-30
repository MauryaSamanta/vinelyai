import Connection from "../models/Connections.js";
import https from 'https';
import dotenv from 'dotenv';
import { generateEmbedding } from "../controllers/connections.js";

dotenv.config();
const config = {
  apiKey: "AIzaSyCgeRuLc25ZdFyJh3I2jmaBZx6RAMt29iY",
  searchEngineId: "57ec0f96016ac4253"
};

async function getLinkedinSnippet(connection) {
    const { firstName, lastName, position, company } = connection;
    const searchQuery = encodeURIComponent(`site:linkedin.com Find all mentions in Linkedin "${firstName} ${lastName}" ${position} ${company}`);
    const url = `https://www.googleapis.com/customsearch/v1?key=${config.apiKey}&cx=${config.searchEngineId}&q=${searchQuery}&num=1&siteSearch=linkedin.com&siteSearchFilter=i`;
  
    return new Promise((resolve, reject) => {
      https.get(url, (resp) => {
        let data = '';
  
        resp.on('data', (chunk) => {
          data += chunk;
        });
  
        resp.on('end', () => {
          try {
            const searchResults = JSON.parse(data);
            
            if (searchResults.error) {
              reject(new Error(`Google API Error: ${searchResults.error.message}`));
              return;
            }
  
            const snippet = searchResults.items?.[0]?.snippet || '';
            resolve(snippet);
          } catch (error) {
            reject(new Error(`Failed to parse search results: ${error.message}`));
          }
        });
      }).on('error', (error) => {
        reject(new Error(`Failed to fetch search results: ${error.message}`));
      });
    });
  }

export async function processConnectionEmbeddings(req, res) {
    try {
      // Get all connections that haven't been processed in the last 24 hours
      const connections = await Connection.find({});
  
      console.log(`Processing ${connections.length} connections...`);
  
      // Process each connection
      for (const connection of connections) {
        try {
          // Get LinkedIn snippet
          const snippet = await getLinkedinSnippet(connection);
          
          // Create text for embedding
          const embeddingText = `${connection.firstName} ${connection.lastName} ${connection.position} ${connection.company} ${snippet}`;
          
          // Get embedding
          const embedding = await generateEmbedding(embeddingText);
  
          // Update connection
          
          connection.embedding = embedding;
        
          await connection.save();
  
          console.log(`Processed connection: ${connection.firstName} ${connection.lastName}`);
          
        } catch (error) {
          console.error(`Error processing connection ${connection._id}:`, error);
          continue; // Continue with next connection if one fails
        }
      }
  
      res.json({
        message: 'Connections processed successfully',
        processedCount: connections.length
      });
    } catch (error) {
      console.error('Error in processConnectionEmbeddings:', error);
      res.status(500).json({
        message: 'Failed to process connections',
        error: error.message
      });
    }
  }

