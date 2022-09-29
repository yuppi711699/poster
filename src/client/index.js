const { PrivateKey, ContractFunctionParameters } = require('@hashgraph/sdk')
const { CreateRPCClient, SetAccount } = require('../util')
const sha256 = require('js-sha256').sha256
const CryptoJS = require('crypto-js')
const {
  ContractCallQuery,
  ContractExecuteTransaction,
  Hbar
} = require('@hashgraph/sdk')
const { MaxTransactionGas, MaxTransactionPayment } = require('../config')
module.exports = {
  GenerateAccount: async (passphrase) => {
    const psp = passphrase || '0x4139 was here'
    //    return await PrivateKey.generateED25519()
    console.log(sha256(psp))
    return await PrivateKey.fromStringED25519(sha256.hex(psp))
  },
  SetOrRecoverAccount: async (accountID, privateKey) => {
    SetAccount(accountID, privateKey)
  },
  SetInheriteeKey: async (contractId) => {
    // rpc client
    const rpcClient = CreateRPCClient()

    const contractExecTx = await new ContractExecuteTransaction()
      // Set the ID of the contract
      .setContractId(contractId)
      // Set the gas for the contract call
      .setGas(MaxTransactionGas)
      .setMaxTransactionFee(new Hbar(MaxTransactionPayment))
      // Set the contract function to call
      .setFunction('SetInheriteeKey')

    // Submit the transaction to a Hedera network and store the log
    const submitExecTx = await contractExecTx.execute(rpcClient)

    // Get the receipt of the transaction
    return await submitExecTx.getReceipt(rpcClient)
  },

  GetInheriteeKey: async (contractId) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction('GetInheriteeKey')
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the key
    return contractCallResult.getAddress(0)
  },
  GetInheritorListKey: async (contractId) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction('GetInheritorListKey')
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the key
    return contractCallResult.getAddress(0)
  },
  GetAddress: async (contractId) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction('GetAddress')
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the key
    return contractCallResult.getAddress(0)
  },
  SetInheritor: async (contractId, inheriteeAddress, inheritorAddress) => {
    // rpc client
    const rpcClient = CreateRPCClient()

    const contractExecTx = await new ContractExecuteTransaction()
      // Set the ID of the contract
      .setContractId(contractId)
      // Set the gas for the contract call
      .setGas(MaxTransactionGas)
      // Set the contract function to call
      .setFunction(
        'SetInheritor',
        new ContractFunctionParameters()
          .addAddress(inheriteeAddress)
          .addAddress(inheritorAddress)
      )

    // Submit the transaction to a Hedera network and store the log
    const submitExecTx = await contractExecTx.execute(rpcClient)

    // Get the receipt of the transaction
    const receipt = await submitExecTx.getReceipt(rpcClient)
    return {
      tx: submitExecTx,
      receipt
    }
  },
  // RemoveInheritor: async (contractId, inheriteeAddress, inheritorAddress) => {
  //   // rpc client
  //   const rpcClient = CreateRPCClient()

  //   const contractExecTx = await new ContractExecuteTransaction()
  //     // Set the ID of the contract
  //     .setContractId(contractId)
  //     // Set the gas for the contract call
  //     .setGas(MaxTransactionGas)
  //     // Set the contract function to call
  //     .setFunction(
  //       'RemoveInheritor',
  //       new ContractFunctionParameters()
  //         .addAddress(inheriteeAddress)
  //         .addAddress(inheritorAddress)
  //     )

  //   // Submit the transaction to a Hedera network and store the log
  //   const submitExecTx = await contractExecTx.execute(rpcClient)

  //   // Get the receipt of the transaction
  //   return await submitExecTx.getReceipt(rpcClient)
  // },
  GetInheritorKey: async (contractId, inheriteeAddress) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction(
        'GetInheritorKey',
        new ContractFunctionParameters().addAddress(inheriteeAddress)
      )
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the key
    return contractCallResult.getAddress(0)
  },
  RecoverInheritorListKey: async (contractId, inheriteeAddress) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction(
        'RecoverInheritorListKey',
        new ContractFunctionParameters().addAddress(inheriteeAddress)
      )
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the key
    return contractCallResult.getAddress(0)
  },
  GetFileCount: async (contractId, inheriteeAddress) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction(
        'GetFileCount',
        new ContractFunctionParameters().addAddress(inheriteeAddress)
      )
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the file count
    return contractCallResult.getUint256(0)
  },
  GetFile: async (contractId, inheriteeAddress, index) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction(
        'GetFile',
        new ContractFunctionParameters()
          .addAddress(inheriteeAddress)
          .addUint256(index)
      )
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the file
    return contractCallResult.getString(0)
  },
  GetInheritorList: async (contractId, inheriteeAddress) => {
    const rpcClient = CreateRPCClient()

    const query = new ContractCallQuery()
      .setContractId(contractId)
      .setGas(MaxTransactionGas)
      .setFunction(
        'GetInheritorList',
        new ContractFunctionParameters()
          .addAddress(inheriteeAddress)
      )
      .setQueryPayment(new Hbar(MaxTransactionPayment))

    // Sign with the client operator private key to pay for the query and submit the query to a Hedera network
    const contractCallResult = await query.execute(rpcClient)

    // Get the file
    return contractCallResult.getString(0)
  },
  DeleteFile: async (contractId, inheriteeAddress, index) => {
    // rpc client
    const rpcClient = CreateRPCClient()

    const contractExecTx = await new ContractExecuteTransaction()
      // Set the ID of the contract
      .setContractId(contractId)
      // Set the gas for the contract call
      .setGas(MaxTransactionGas)
      // Set the contract function to call
      .setFunction(
        'DeleteFile',
        new ContractFunctionParameters()
          .addUint256(index)
      )

    // Submit the transaction to a Hedera network and store the log
    const submitExecTx = await contractExecTx.execute(rpcClient)

    // Get the receipt of the transaction
    const receipt = await submitExecTx.getReceipt(rpcClient)
    return {
      tx: submitExecTx,
      receipt
    }
  },
  AddFile: async (contractId, metadata) => {
    // rpc client
    const rpcClient = CreateRPCClient()

    const contractExecTx = await new ContractExecuteTransaction()
      // Set the ID of the contract
      .setContractId(contractId)
      // Set the gas for the contract call
      .setGas(MaxTransactionGas)
      // Set the contract function to call
      .setFunction(
        'AddFile',
        new ContractFunctionParameters().addString(metadata)
      )

    // Submit the transaction to a Hedera network and store the log
    const submitExecTx = await contractExecTx.execute(rpcClient)

    // Get the receipt of the transaction
    const receipt = await submitExecTx.getReceipt(rpcClient)
    return {
      tx: submitExecTx,
      receipt
    }
  },
  SetInheritorList: async (contractId, metadata) => {
    // rpc client
    const rpcClient = CreateRPCClient()

    const contractExecTx = await new ContractExecuteTransaction()
      // Set the ID of the contract
      .setContractId(contractId)
      // Set the gas for the contract call
      .setGas(MaxTransactionGas)
      // Set the contract function to call
      .setFunction(
        'SetInheritorList',
        new ContractFunctionParameters().addString(metadata)
      )

    // Submit the transaction to a Hedera network and store the log
    const submitExecTx = await contractExecTx.execute(rpcClient)

    // Get the receipt of the transaction
    const receipt = await submitExecTx.getReceipt(rpcClient)
    return {
      tx: submitExecTx,
      receipt
    }
  },
  EncryptFile: async (contents, key) => {
    return CryptoJS.AES.encrypt(contents, key).toString()
  },
  DecryptFile: async (contents, key) => {
    const bytes = CryptoJS.AES.decrypt(contents, key)
    return bytes.toString(CryptoJS.enc.Utf8)
  },
  CalculateHash: async (contents) => {
    return CryptoJS.MD5(contents)
  }
}
