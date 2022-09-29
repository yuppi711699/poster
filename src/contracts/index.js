const path = require('path')
const fs = require('fs-extra')
const solc = require('solc')

module.exports = {

  LoggingServiceSmartContract: () => {
    const contractName = 'LoggingService.sol'
    const source = fs.readFileSync(
      path.resolve('src/contracts', contractName),
      'UTF-8'
    )
    const input = {
      language: 'Solidity',
      sources: {
        'LoggingService.sol': {
          content: source
        }
      },
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
    }

    return JSON.parse(solc.compile(JSON.stringify(input))).contracts[
      contractName
    ].LoggingService
  },
  InheritanceServiceSmartContract: () => {
    const contractName = 'InheritanceService.sol'
    const source = fs.readFileSync(
      path.resolve('src/contracts', contractName),
      'UTF-8'
    )
    const input = {
      language: 'Solidity',
      sources: {
        'InheritanceService.sol': {
          content: source
        }
      },
      settings: {
        optimizer: {
          enabled: true,
          runs: 400
        },
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
    }

    return JSON.parse(solc.compile(JSON.stringify(input))).contracts[
      contractName
    ].InheritanceService
  }
}
