const { SetInheriteeKey, SetInheritor, GetInheritorKey, GetFileCount, AddFile, GetFile, EncryptFile, CalculateHash, DecryptFile } = require('../client')

window.DIFCClient = require('../client')

async function test () {
  const newContractId = '0.0.47856905'
  const addr = '0000000000000000000000000000000002d94f1a'

  // set inheriteeKey
  await SetInheriteeKey(newContractId)
  // set inheritee as inheritor
  await SetInheritor(newContractId, addr, addr)

  const inheritorKey = await GetInheritorKey(newContractId, addr)
  console.log('The inheritor key is ' + inheritorKey)

  let fileCount = await GetFileCount(newContractId, addr)
  console.log(`Initial file count ${fileCount}`)

  await AddFile(
    newContractId,
    JSON.stringify({
      name: 'test',
      location: 'test loc',
      hash: 'test hash'
    })
  )
  fileCount = await GetFileCount(newContractId, addr)
  console.log(`File count ${fileCount}`)

  const file = await GetFile(newContractId, addr, 0)
  console.log(`File contents ${file}`)

  const content =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const encryptedFile = await EncryptFile(content, inheritorKey)
  const hashEncryptedFile = await CalculateHash(encryptedFile)
  console.log(`Hash encrypted file: ${hashEncryptedFile}`)

  const decryptedFile = await DecryptFile(encryptedFile, inheritorKey)
  const hashDecryptedFile = await CalculateHash(decryptedFile)
  console.log(`Hash decriptedFile file: ${hashDecryptedFile}`)
}
test()
