const assert = require('assert')
const { GenerateAccount } = require('../src/client')
const { CreditAccount } = require('../src/server')
const { CreateRPCClient } = require('../src/util')
const { AccountBalanceQuery } = require('@hashgraph/sdk')
const { AccountStartingBalance } = require('../src/config')

describe('Library Tests', function () {
  describe('Server', function () {
    it('should credit account', async function () {
      // rpc client
      const rpcClient = CreateRPCClient()

      // generate account
      const account = await GenerateAccount()
      console.log(`Private Key: ${account.toStringRaw()}`)
      console.log(`Public Key: ${account.publicKey}`)

      const newAccountId = await CreditAccount(account.publicKey)

      console.log('The new account ID is: ' + newAccountId)

      // Verify the account balance
      const accountBalance = await new AccountBalanceQuery()
        .setAccountId(newAccountId.receipt.accountId)
        .execute(rpcClient)
      console.log(`Balance: ${accountBalance.hbars.toTinybars()}`)
      assert.equal(
        accountBalance.hbars
          .toTinybars()
          .equals(AccountStartingBalance),
        true
      )
    })
  })
})
