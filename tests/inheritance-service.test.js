const assert = require('assert')
const { InheritanceServiceSmartContract } = require('../src/contracts')
const {
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters
} = require('@hashgraph/sdk')
const { CreateRPCClient } = require('../src/util')
const {
  SetInheriteeKey,
  GetInheriteeKey,
  GetAddress,
  SetInheritor,
  GetInheritorKey,
  GetFileCount,
  AddFile,
  GetFile,
  EncryptFile,
  DecryptFile,
  CalculateHash,
  DeleteFile
} = require('../src/client')
const { MaxTransactionGas } = require('../src/config')

describe('Smart Contract Tests [Inheritance Service]', function () {
  it('should compile the smart contract', async function () {
    const sc = InheritanceServiceSmartContract()
    assert.notEqual(sc.evm.bytecode.object, undefined)
  })
  it('should store the smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = InheritanceServiceSmartContract()
    console.log('length', sc.evm.bytecode.object.length)
    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
  })
  it('should deploy a stored smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = InheritanceServiceSmartContract()

    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
      // Set the file ID of the Hedera file storing the bytecode
      .setBytecodeFileId(bytecodeFileId)
      // Set the gas to instantiate the contract
      .setGas(MaxTransactionGas)

      .setConstructorParameters(
        new ContractFunctionParameters().addString('v_test')
      )

    // Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(rpcClient)

    // Get the smart contract ID
    const newContractId = contractReceipt.contractId

    // Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)
    assert.notEqual(newContractId, undefined)
  })
  it('should deploy a stored smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = InheritanceServiceSmartContract()

    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
      // Set the file ID of the Hedera file storing the bytecode
      .setBytecodeFileId(bytecodeFileId)
      // Set the gas to instantiate the contract
      .setGas(MaxTransactionGas)

      .setConstructorParameters(
        new ContractFunctionParameters().addString('v_test')
      )

    // Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(rpcClient)

    // Get the smart contract ID
    const newContractId = contractReceipt.contractId

    // Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)
    assert.notEqual(newContractId, undefined)
  })
  it('should deploy and call the create inheritor key from a stored smart contract on hedera', async function () {
    // rpc client
    let rpcClient = CreateRPCClient(false, true)

    const sc = InheritanceServiceSmartContract()

    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
      // Set the file ID of the Hedera file storing the bytecode
      .setBytecodeFileId(bytecodeFileId)
      // Set the gas to instantiate the contract
      .setGas(MaxTransactionGas)

      .setConstructorParameters(
        new ContractFunctionParameters().addString('v_test')
      )

    // Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(rpcClient)

    // Get the smart contract ID
    const newContractId = contractReceipt.contractId

    // Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)

    rpcClient = CreateRPCClient()

    await SetInheriteeKey(newContractId)
    const key = await GetInheriteeKey(newContractId)
    console.log('The key is ' + key)

    const addr = await GetAddress(newContractId)
    // Confirm the transaction was executed successfully
    console.log('The address is ' + addr)
    assert.notEqual(key, undefined)
  })
  it('should deploy and add inheritor and remove inheritor from a stored smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = InheritanceServiceSmartContract()

    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
      // Set the file ID of the Hedera file storing the bytecode
      .setBytecodeFileId(bytecodeFileId)
      // Set the gas to instantiate the contract
      .setGas(MaxTransactionGas)

      .setConstructorParameters(
        new ContractFunctionParameters().addString('v_test')
      )

    // Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(rpcClient)

    // Get the smart contract ID
    const newContractId = contractReceipt.contractId

    // Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)

    const addr = await GetAddress(newContractId)
    // Confirm the transaction was executed successfully
    console.log('The address is ' + addr)

    await SetInheritor(newContractId, addr, addr)
    // await RemoveInheritor(newContractId, addr, addr)

    assert.notEqual(addr, undefined)
  })
  it('should deploy and add inheritor and recover inheritee key from a stored smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = InheritanceServiceSmartContract()

    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
      // Set the file ID of the Hedera file storing the bytecode
      .setBytecodeFileId(bytecodeFileId)
      // Set the gas to instantiate the contract
      .setGas(MaxTransactionGas)

      .setConstructorParameters(
        new ContractFunctionParameters().addString('v_test')
      )

    // Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(rpcClient)

    // Get the smart contract ID
    const newContractId = contractReceipt.contractId

    // Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)

    const addr = await GetAddress(newContractId)
    // Confirm the transaction was executed successfully
    console.log('The address is ' + addr)

    await SetInheriteeKey(newContractId)
    await SetInheritor(newContractId, addr, addr)

    const inheritorKey = await GetInheritorKey(newContractId, addr)
    console.log('The inheritor key is ' + inheritorKey)

    assert.notEqual(inheritorKey, undefined)
  })
  it('should deploy add inheritor file and recover file key from a stored smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = InheritanceServiceSmartContract()

    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
      // Set the file ID of the Hedera file storing the bytecode
      .setBytecodeFileId(bytecodeFileId)
      // Set the gas to instantiate the contract
      .setGas(MaxTransactionGas)

      .setConstructorParameters(
        new ContractFunctionParameters().addString('v_test')
      )

    // Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(rpcClient)

    // Get the smart contract ID
    const newContractId = contractReceipt.contractId

    // Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)

    const addr = await GetAddress(newContractId)
    // Confirm the transaction was executed successfully
    console.log('The address is ' + addr)

    await SetInheriteeKey(newContractId)
    await SetInheritor(newContractId, addr, addr)

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
  })
  it('end to end test', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = InheritanceServiceSmartContract()

    // Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = new FileCreateTransaction()
      // Set the bytecode of the contract
      .setContents(sc.evm.bytecode.object)

    // Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(rpcClient)

    // Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId

    // Log the file ID
    console.log('The smart contract byte code file ID is ' + bytecodeFileId)

    assert.notEqual(bytecodeFileId, undefined)
    // Instantiate the contract instance
    const contractTx = await new ContractCreateTransaction()
      // Set the file ID of the Hedera file storing the bytecode
      .setBytecodeFileId(bytecodeFileId)
      // Set the gas to instantiate the contract
      .setGas(MaxTransactionGas)

      .setConstructorParameters(
        new ContractFunctionParameters().addString('v_test')
      )

    // Submit the transaction to the Hedera test network
    const contractResponse = await contractTx.execute(rpcClient)

    // Get the receipt of the file create transaction
    const contractReceipt = await contractResponse.getReceipt(rpcClient)

    // Get the smart contract ID
    const newContractId = contractReceipt.contractId

    // Log the smart contract ID
    console.log('The smart contract ID is ' + newContractId)

    const addr = await GetAddress(newContractId)
    // Confirm the transaction was executed successfully
    console.log('The address is ' + addr)

    await SetInheriteeKey(newContractId)
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

    // this should succeed and retrieve the address of the file
    let file = await GetFile(newContractId, addr, 0)
    console.log(`File contents ${file}`)

    // this should succeed
    await DeleteFile(newContractId, addr, 0)

    // this should succeed and retrieve the "deleted status of the file"
    file = await GetFile(newContractId, addr, 0)
    console.log(`Deleted File contents ${file}`)

    try {
      await DeleteFile(newContractId, addr, 0)
    } catch (err) {
      console.log('Deletion failed because the file was already deleted!')
    }

    const content =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    const encryptedFile = await EncryptFile(content, inheritorKey)
    const hashEncryptedFile = await CalculateHash(encryptedFile)
    console.log(`Hash encrypted file: ${hashEncryptedFile}`)
    assert.notEqual(encryptedFile, content)
    const decryptedFile = await DecryptFile(encryptedFile, inheritorKey)
    const hashDecryptedFile = await CalculateHash(decryptedFile)
    console.log(`Hash decriptedFile file: ${hashDecryptedFile}`)

    assert.equal(decryptedFile, content)
  })
})
