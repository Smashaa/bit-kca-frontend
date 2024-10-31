// SPDX-License-Identifier: MIT

pragma solidity 0.8.28;

contract Counter {
    // declaring the state variables
    uint256 number;
    string public message;

    // constructor
    constructor(uint256 startingPoint, string memory startingMessage) {
        number = startingPoint;
        message = startingMessage;
    }

    // read function
    function getNumber() external view returns(uint256) {
        return number;
    }
    
    // writing functions
    // increasing number by 1
    function increaseNumber() external {
        number++;
    }

    // decreasing number by 1
    function decreaseNumber() external {
        number--;
    }

    // function to update the message
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }   

}