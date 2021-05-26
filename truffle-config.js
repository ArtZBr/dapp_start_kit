require('babel-register');
require('babel-polyfill');

require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    // kovan: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       privateKeys.split(','), // Array of account private keys
    //       `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
    //     )
    //   },
    //   gas: 5000000,
    //   gasPrice: 5000000000, // 5 gwei
    //   network_id: 42
    // },
    main: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://main.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 1
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // Array of account private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 5000000000, // 5 gwei
      network_id: 4
    },
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       privateKeys.split(','), // Array of account private keys
    //       `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`// Url to an Ethereum Node
    //     )
    //   },
    //   gas: 5000000,
    //   gasPrice: 5000000000, // 5 gwei
    //   network_id: 3
    // },
    bsc_testnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://data-seed-prebsc-1-s1.binance.org:8545`
      ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc_mainnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(','),
        `https://bsc-dataseed1.binance.org`
      ),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: ">=0.6.0 <0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
