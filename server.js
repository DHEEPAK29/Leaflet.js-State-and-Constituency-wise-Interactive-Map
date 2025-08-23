const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(__dirname));

app.get('/api/geojson', (req, res) => {
    const geojsonPath = path.join(__dirname, 'TAMIL NADU_parliament.geojson');

    fs.readFile(geojsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading GeoJSON file:", err);
            return res.status(500).json({ error: "Failed to read GeoJSON data" });
        }
        res.header("Content-Type", 'application/json');
        res.send(data);
    });
});

// Default route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'disp_port.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});