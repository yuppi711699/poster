const assert = require('assert')
const { GenerateAccount } = require('../src/client')

describe('Library Tests', function () {
  describe('Client', function () {
    it('should create a public and a private key pair', async function () {
      const account = await GenerateAccount()
      console.log(`Private Key: ${account.toStringRaw()}`)
      console.log(`Public Key: ${account.publicKey}`)
      assert.notEqual(account, undefined)
    })
  })
})
