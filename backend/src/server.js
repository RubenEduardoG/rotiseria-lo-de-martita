const path = require('path');
// Esto configura dotenv de forma estándar: si encuentra un archivo .env local lo usa, y si está en internet usa las variables del servidor
require('dotenv').config(); 
const http = require('http');
const createApp = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await connectDB();
    const app = createApp();
    const server = http.createServer(app);
    server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
