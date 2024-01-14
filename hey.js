const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto.createHash('sha256').update(
      this.index +
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash
    ).digest('hex');
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== '0'.repeat(difficulty)) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined:', this.hash);
  }
}

class Blockchain {
  // ... (unchanged)

  addBlock(data) {
    const latestBlock = this.getLatestBlock();
    const newIndex = latestBlock.index + 1;
    const newTimestamp = new Date().toISOString();
    const newBlock = new Block(newIndex, newTimestamp, data, latestBlock.hash);
    newBlock.mineBlock(4); // You can adjust the difficulty here
    this.chain.push(newBlock);
    this.broadcastNewBlock(newBlock);
  }

  // ... (unchanged)

  broadcastNewBlock(newBlock) {
    io.emit('newBlock', { block: newBlock });
  }
}

// Initialize Express and Socket.IO
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Initialize Blockchain
const myBlockchain = new Blockchain();

// Serve static files (optional, for a simple frontend)
app.use(express.static('public'));

// Define HTTP routes
app.get('/mineBlock', (req, res) => {
  myBlockchain.addBlock({ amount: 5 });
  res.json({ message: 'Block mined successfully!' });
});

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // You can add more socket-related logic here

  // Send the current blockchain to the connected client
  socket.emit('currentBlockchain', { blockchain: myBlockchain });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
