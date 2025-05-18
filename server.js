require('dotenv').config();


const express = require('express');
const cors = require('cors');

const spotifyPreviewFinder = require('spotify-preview-finder');

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/preview', async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Missing 'name' query" });

  try {
  
    const result = await spotifyPreviewFinder(name, 1);
    // console.log(result)
    if (result.success && result.results.length > 0) {

      const previewUrl = result.results[0].previewUrls[0] || "";
      res.json({ previewUrl });
    } else {
      res.status(404).json({ error: 'No preview found for this song' });
    }
  } catch (err) {
    res.status(500).json({ error: "Error fetching preview", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Preview API server running at http://localhost:${PORT}`);
});
