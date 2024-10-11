const express = require('express');
const path = require('path');
const { exec } = require('child_process'); // Destructure exec
const app = express();

// Serve static files from the "public" directory

app.use(express.static('public')); // Removed unnecessary forward slash
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  
  // Automatically open the browser to the localhost URL
  exec(`start http://localhost:${PORT}`, (err) => {
    if (err) {
      console.error("Failed to open browser:", err);
    } else {
      console.log("Browser opened successfully.");
    }
  });
});