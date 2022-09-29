const { GenerateAccount } = require('../src/client')

describe('Library Tests', function () {
  describe('passphrase based test', function () {
    it('should create, credit, store, and use an existing account', async function () {
      await GenerateAccount('this is the random passphrase')
    })
  })
})
