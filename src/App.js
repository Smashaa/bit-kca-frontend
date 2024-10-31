import logo from './logo.svg';
import './App.css';
import { useState } from "react";

import { Web3 } from "web3";

const ADDRESS = "0x274ADA70bd93FCc9D1C7A687140eF874EFf55D7f";
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [number, setNumber] = useState('none');
  const [currentMessage, setCurrentMessage] = useState('none');
  const [newMessage, setNewMessage] = useState("");

    // initialize web3 project
    const web3 = new Web3(window.ethereum);

    // initialize the contract ABI and ADDRESS
    const myContract = new web3.eth.Contract(ABI, ADDRESS);

    // reading functions
    // number
    async function getNumber() {
      const result = await myContract.methods.getNumber().call();

      setNumber(result.toString())
    }

    // message
    async function getMessage() {
      const message = await myContract.methods.message().call();
      setCurrentMessage(message);
    }

    async function increaseNumber() {
      // connect the account i.e wallet
      const accountConnected = await web3.eth.requestAccounts();
      const tx = await myContract.methods.increaseNumber().send({ from: accountConnected[0] });
      getNumber();
    }

    async function decreaseNumber() {
      const accountPresent = await web3.eth.requestAccounts();
      const transact = await myContract.methods.decreaseNumber().send({ from: accountPresent[0] });
      getNumber();
    }

    async function updateMessage() {
      const connectedAccounts = await web3.eth.requestAccounts();
      const Transaction = await myContract.methods.setMessage(newMessage).send({ from: connectedAccounts[0] });
      getMessage();
    }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getNumber}>Get Number</button><br/>
        <button onClick={increaseNumber}>Increase Number</button><br/>
        <button onClick={decreaseNumber}>Decrease Number</button><br/>
        <p>Numbe: {number}</p>
        <br/>
        <button onClick={getMessage}>Get Message</button><br/>
        <p>Message: {currentMessage}</p><br/>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Enter new message"/>
        <br/>
        <button onClick={updateMessage}>Update Message</button>


      </header>
    </div>
  );
}

export default App;
