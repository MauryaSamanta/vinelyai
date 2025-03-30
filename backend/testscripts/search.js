import https from 'https';
import dotenv from 'dotenv';

dotenv.config();
const config = {
  apiKey: "AIzaSyCgeRuLc25ZdFyJh3I2jmaBZx6RAMt29iY",
  searchEngineId: "57ec0f96016ac4253"
};

const testPerson = {
  firstName: 'Ajay',
  lastName: 'Y.',
  position: 'Co-Founder',
  company: 'Stealth AI'
};

function searchPerson(person) {
  const { firstName, lastName, company, position } = person;
 
  // Construct search query
  const searchQuery = encodeURIComponent(`"About" Linkedin Section ${firstName} ${lastName} ${position} ${company}`);
  
  // Construct Google Custom Search API URL
  const url = `https://www.googleapis.com/customsearch/v1?key=${config.apiKey}&cx=${config.searchEngineId}&q=${searchQuery}&num=5&siteSearch=linkedin.com&siteSearchFilter=i`;
  console.log('Searching for:', searchQuery);
  console.log('Request URL:', url);

  return new Promise((resolve, reject) => {
    https.get(url, (resp) => {
      let data = '';

      // A chunk of data has been received
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received
      resp.on('end', () => {
        try {
          const searchResults = JSON.parse(data);
          
          if (searchResults.error) {
            console.error('Google API Error:', searchResults.error);
            reject(new Error(`Google API Error: ${searchResults.error.message}`));
            return;
          }

          // Process and format results
          const processedResults = (searchResults.items || []).map(item => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
          }));

          resolve(processedResults);
        } catch (error) {
          console.error('Parse Error:', error);
          reject(new Error(`Failed to parse search results: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      console.error('Request Error:', error);
      reject(new Error(`Failed to fetch search results: ${error.message}`));
    });
  });
}

// Run the test
async function runTest() {
  try {
    console.log('Starting search test...');
    const results = await searchPerson(testPerson);
    
    console.log('\nSearch Results:');
    results.forEach((result, index) => {
      console.log(`\nResult ${index + 1}:`);
      console.log('Title:', result.title);
      console.log('Link:', result.link);
      console.log('Snippet:', result.snippet);
      console.log('------------------------');
      
    });
  } catch (error) {
    console.error('Test failed:', error.message);
  }
}

runTest();