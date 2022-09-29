const assert = require('assert')
const { LoggingServiceSmartContract } = require('../src/contracts')
const {
  FileCreateTransaction,
  ContractCreateTransaction,
  ContractFunctionParameters
} = require('@hashgraph/sdk')
const { CreateRPCClient } = require('../src/util')
const { LogMessage } = require('../src/server')

describe('Smart Contract Tests [Logging Service]', function () {
  it('should compile the smart contract', async function () {
    const sc = LoggingServiceSmartContract()
    assert.notEqual(sc.evm.bytecode.object, undefined)
  })
  it('should store the smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = LoggingServiceSmartContract()

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

    const sc = LoggingServiceSmartContract()

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
      .setGas(100000)
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

    const sc = LoggingServiceSmartContract()

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
      .setGas(100000)
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
  it('should deploy and call the log function from a stored smart contract on hedera', async function () {
    // rpc client
    const rpcClient = CreateRPCClient()

    const sc = LoggingServiceSmartContract()

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
      .setGas(100000)
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

    const receipt = await LogMessage(
      newContractId,
      JSON.stringify({
        message: 'hello!',
        user: 'difc'
      })
    )

    // Confirm the transaction was executed successfully
    console.log('The transaction status is ' + receipt.status.toString())
    assert.notEqual(receipt.status.toString(), undefined)
  })
})
