class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }
  createNewBlock(nonce, previousBlockHash, hash) {
    const newBlock = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce,
      hash,
      previousBlockHash
    };
    this.pendingTransactions = [];
    this.chain.push(newBlock);
    return newBlock;
  }
}

class Block {
  constructor() {

  }
}
class Blockchain {
  constructor() {

  }
}

class Gamer {
  constructor(gamerTag, password) {
    this.gamerTag = gamerTag;
    this.password = password;
    this.account = new Account();
  }
}

class Account {
  constructor() {
    this.acctNum = Math.floor(Math.random() * 1000000000);
    this.balance = 100;
  }
}

const gamer = new Gamer('John', '123');
console.log(gamer);