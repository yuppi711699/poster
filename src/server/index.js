const { CreateRPCClient } = require('../util')
const {
  AccountCreateTransaction,
  Hbar,
  ContractFunctionParameters,
  ContractExecuteTransaction
} = require('@hashgraph/sdk')
const { AccountStartingBalance, MaxTransactionGas } = require('../config')
module.exports = {
  CreditAccount: async (publicKey) => {
    // fetch the hedera client
    const rpcClient = CreateRPCClient(false, true)

    // Create a new account with  starting balance
    const newAccount = await new AccountCreateTransaction()
      .setKey(publicKey)
      .setInitialBalance(
        Hbar.fromTinybars(AccountStartingBalance)
      )
      .execute(rpcClient)

    const getReceipt = await newAccount.getReceipt(rpcClient)
    return {
      tx: newAccount,
      receipt: getReceipt
    }
  },
  LogMessage: async (contractId, message) => {
    // rpc client
    const rpcClient = CreateRPCClient()

    // Create the transaction to update the contract message
    const contractExecTx = await new ContractExecuteTransaction()
      // Set the ID of the contract
      .setContractId(contractId)
      // Set the gas for the contract call
      .setGas(MaxTransactionGas)
      // Set the contract function to call
      .setFunction(
        'LogAction',
        new ContractFunctionParameters().addString(message)
      )

    // Submit the transaction to a Hedera network and store the log
    const submitExecTx = await contractExecTx.execute(rpcClient)

    // Get the receipt of the transaction
    return await submitExecTx.getReceipt(rpcClient)
  }
}
