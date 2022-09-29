const assert = require('assert')
const { GenerateAccount, SetOrRecoverAccount, GetAddress } = require('../src/client')
const { CreditAccount } = require('../src/server')
const { CreateRPCClient } = require('../src/util')
const { AccountBalanceQuery } = require('@hashgraph/sdk')
const { AccountStartingBalance } = require('../src/config')

describe('Library Tests', function () {
  describe('Stored browser account', function () {
    it('should create, credit, store, and use an existing account', async function () {
      // rpc client
      let rpcClient = CreateRPCClient(false, true) // we use the testnet, and the operator to generate the account

      // generate account keys
      const account = await GenerateAccount()
      console.log(`Private Key: ${account.toStringRaw()}`)
      console.log(`Public Key: ${account.publicKey}`)

      // create and credit hedera account
      const newAccountId = await (await CreditAccount(account.publicKey)).receipt.accountId

      console.log('The new account ID is: ' + newAccountId)

      // Verify the account balance
      const accountBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(rpcClient)
      console.log(`Balance: ${accountBalance.hbars.toTinybars()}`)
      assert.equal(
        accountBalance.hbars
          .toTinybars()
          .equals(AccountStartingBalance),
        true
      )
      // store the created account into the localstorage/polyfill
      SetOrRecoverAccount(newAccountId, account.toStringRaw())

      rpcClient = CreateRPCClient() // we generate the rpcclient with the stored account (see logs)
      // get the Address of the newly account
      const addr = await GetAddress('0.0.47899333') // we use an already generated smart contract on hedera
      console.log(addr)
    })
  })
})
