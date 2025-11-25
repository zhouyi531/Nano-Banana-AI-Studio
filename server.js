import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for Base64 images
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files


// Ensure history directory exists
const HISTORY_DIR = path.join(__dirname, 'public', 'history');
if (!fs.existsSync(HISTORY_DIR)) {
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
}

// Routes
app.post('/api/save-image', (req, res) => {
  try {
    const { image, timestamp, prompt, mode, aspectRatio, referenceImage, targetImage } = req.body;

    if (!image || !timestamp) {
      return res.status(400).json({ error: 'Missing image or timestamp' });
    }

    // Remove header if present (e.g., "data:image/png;base64,")
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    const filename = `${timestamp}.png`;
    const filepath = path.join(HISTORY_DIR, filename);
    const txtFilename = `${timestamp}.txt`;
    const txtFilepath = path.join(HISTORY_DIR, txtFilename);

    // Save Image
    fs.writeFileSync(filepath, buffer);

    // Save Metadata to TXT
    const metadata = {
      id: timestamp.toString(),
      imageUrl: `/history/${filename}`,
      prompt: prompt || '',
      timestamp: timestamp,
      mode: mode || 'portrait',
      referenceImage: referenceImage, // Optional: save if needed, but might be large. For now, we rely on the image itself.
      targetImage: targetImage,
      aspectRatio: aspectRatio
    };
    
    // We save as JSON string in the TXT file for easy parsing, but user can read it too.
    fs.writeFileSync(txtFilepath, JSON.stringify(metadata, null, 2));

    console.log(`Saved image: ${filename} and metadata: ${txtFilename}`);

    // Return the public URL path
    res.json({ 
      success: true, 
      url: `/history/${filename}` 
    });

  } catch (error) {
    console.error('Error saving image:', error);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

app.get('/api/history', (req, res) => {
  try {
    const files = fs.readdirSync(HISTORY_DIR);
    const historyItems = [];

    // Filter for .txt files to get metadata
    const txtFiles = files.filter(file => file.endsWith('.txt'));

    for (const txtFile of txtFiles) {
      try {
        const txtPath = path.join(HISTORY_DIR, txtFile);
        const content = fs.readFileSync(txtPath, 'utf-8');
        const metadata = JSON.parse(content);
        
        // Ensure the corresponding image exists
        const imageFilename = txtFile.replace('.txt', '.png');
        if (fs.existsSync(path.join(HISTORY_DIR, imageFilename))) {
           // Ensure imageUrl is correct (it might be relative in the file)
           metadata.imageUrl = `/history/${imageFilename}`;
           historyItems.push(metadata);
        }
      } catch (err) {
        console.error(`Error parsing metadata file ${txtFile}:`, err);
      }
    }

    // Sort by timestamp descending (newest first)
    historyItems.sort((a, b) => b.timestamp - a.timestamp);

    res.json(historyItems);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// Style Presets
const STYLES_DIR = path.join(__dirname, 'public', 'styles');
if (!fs.existsSync(STYLES_DIR)) {
  fs.mkdirSync(STYLES_DIR, { recursive: true });
}

app.post('/api/save-style', (req, res) => {
  try {
    const { name, data } = req.body;
    if (!name || !data) {
      return res.status(400).json({ error: 'Missing name or data' });
    }

    const id = Date.now().toString();
    const filename = `${id}.json`;
    const filepath = path.join(STYLES_DIR, filename);

    const styleData = {
      id,
      name,
      data, // The JSON string from Gemini analysis
      timestamp: Date.now()
    };

    fs.writeFileSync(filepath, JSON.stringify(styleData, null, 2));
    console.log(`Saved style preset: ${name} (${filename})`);

    res.json({ success: true, id });
  } catch (error) {
    console.error('Error saving style:', error);
    res.status(500).json({ error: 'Failed to save style' });
  }
});

app.get('/api/styles', (req, res) => {
  try {
    if (!fs.existsSync(STYLES_DIR)) {
      return res.json([]);
    }

    const files = fs.readdirSync(STYLES_DIR);
    const styles = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const content = fs.readFileSync(path.join(STYLES_DIR, file), 'utf-8');
          styles.push(JSON.parse(content));
        } catch (err) {
          console.error(`Error parsing style file ${file}:`, err);
        }
      }
    }

    // Sort by timestamp descending
    styles.sort((a, b) => b.timestamp - a.timestamp);

    res.json(styles);
  } catch (error) {
    console.error('Error fetching styles:', error);
    res.status(500).json({ error: 'Failed to fetch styles' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
