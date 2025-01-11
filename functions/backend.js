// Import the axios library for making HTTP requests
const axios = require('axios');

// The serverless function
export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // Parse the YouTube video URL from the request body
  const { videoUrl } = req.body;

  // Validate the input
  if (!videoUrl) {
    return res.status(400).json({ error: 'YouTube video URL is required.' });
  }

  try {
    // Call the AI-powered summarization API
    const response = await axios.post(
      'https://n8n-dev.subspace.money/webhook-test/ytube',
      { videoUrl } // Pass the video URL in the request body
    );

    // Get the summary from the API response
    const summary = response.data;

    // Return the summary to the frontend
    return res.status(200).json(summary);
  } catch (error) {
    console.error('Error while fetching summary:', error.message);

    // Handle errors from the API call or internal server
    return res.status(500).json({
      error: 'Failed to fetch summary. Please try again later.',
    });
  }
}
