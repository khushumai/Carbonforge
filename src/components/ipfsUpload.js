// ipfsUpload.js
const { create } = require('ipfs-http-client');
const projectsData = require('/projectsData'); // Import your project data
const mongoose = require('mongoose');
const CarbonCredit = require('./models/CarbonCredit'); // Your MongoDB model

// Replace 'YOUR_INFURA_PROJECT_ID' with the actual API key from your Infura dashboard
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from('YOUR_INFURA_PROJECT_ID' + ':').toString('base64')}`, // Only API key used here, no secret
  },
});

async function uploadProjectsToIPFS() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/carbonCredits', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (const project of projectsData) {
      try {
        // Convert project data to JSON format
        const projectData = JSON.stringify(project);

        // Upload project JSON to IPFS
        const result = await client.add(projectData);
        console.log(`Project "${project.title}" uploaded to IPFS at: ${result.path}`);

        // Update MongoDB with the IPFS hash
        await CarbonCredit.findOneAndUpdate(
          { title: project.title },
          { ipfsHash: result.path },
          { new: true, upsert: true } // Creates a new document if one doesn't exist
        );
      } catch (error) {
        console.error(`Error uploading project "${project.title}":`, error);
      }
    }
  } catch (error) {
    console.error("Error connecting to MongoDB or IPFS:", error);
  } finally {
    // Close MongoDB connection after all uploads
    mongoose.connection.close();
  }
}

uploadProjectsToIPFS();
