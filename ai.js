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
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(1, new Date().toISOString(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const latestBlock = this.getLatestBlock();
    const newIndex = latestBlock.index + 1;
    const newTimestamp = new Date().toISOString();
    const newBlock = new Block(newIndex, newTimestamp, data, latestBlock.hash);
    this.chain.push(newBlock);
  }

  // Other methods can be added based on the requirements

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash() ||
          currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// Example usage:
const myBlockchain = new Blockchain();
myBlockchain.addBlock({ amount: 5 });
myBlockchain.addBlock({ amount: 10 });

console.log(JSON.stringify(myBlockchain, null, 2));
console.log('Is Blockchain Valid?', myBlockchain.isValid());
