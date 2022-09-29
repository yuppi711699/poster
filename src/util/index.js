const { Client } = require('@hashgraph/sdk')
const { MyAccountID, MyPrivateKey } = require('../config')

const storage = () => {
  if (window.localStorage) {
    console.log('Using browser native localstorage for storage!')
    return window.localStorage
  } else {
    console.log('Using in memory storage (not persistent) for storage!')
    return {}
  }
}

module.exports = {
  CreateRPCClient: (isMainnet, useOperator) => {
    // Grab your Hedera testnet account ID and private key from your .env file
    if (storage.DIFC_AccountID && storage.DIFC_PrivateKey) {
      console.log(`Present user generated account! ${storage.DIFC_AccountID}`)
    }
    let myAccountId = storage.DIFC_AccountID || MyAccountID
    let myPrivateKey = storage.DIFC_PrivateKey || MyPrivateKey

    if (useOperator) {
      console.log('Using operator account for rpc client!')
      myAccountId = MyAccountID
      myPrivateKey = MyPrivateKey
    }

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
      throw new Error(
        'Environment variables myAccountId and myPrivateKey must be present'
      )
    }

    // Create our connection to the Hedera network
    const client = isMainnet ? Client.forMainnet() : Client.forTestnet()

    client.setOperator(myAccountId, myPrivateKey)
    return client
  },
  SetAccount: (accountID, privateKey) => {
    storage.DIFC_AccountID = accountID
    storage.DIFC_PrivateKey = privateKey
  }
}
