// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

contract LoggingService {
    address _operator;
    string version;
    event Log(string message);

    constructor(string memory version_) {
        _operator = msg.sender;
        version = version_;
    }

    function LogAction(string memory message) public {
        require(
            msg.sender == _operator,
            'Log Service: only the operator can log messages'
        );
        emit Log(message);
    }
}
