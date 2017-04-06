import React, { Component } from 'react';
import Room from './Room.jsx';

class Lobby extends Component {
  constructor() {
    super();
    this.createGame = this.createGame.bind(this);
    this.lobbySwitch = this.lobbySwitch.bind(this);
  }
  createGame() {
    const hostIP = '192.168.0.97';  //Change if hosting on different computer
    const socket = new WebSocket(`ws://${hostIP}:8080/`);
    let that = this;
    socket.onopen = () => { 
      console.log('Socket open'); 
      console.log(this.props.state.username);
      socket.send(JSON.stringify({
        action: 'createGame',
        username: that.props.state.username,
      }));
    }
    socket.onmessage = msg => {
      let pMsg = JSON.parse(msg.data);
      console.log('Server sends ', pMsg, ' Boolean: ' ,pMsg === "GameReady");
      if (pMsg.action === "GameReady") this.props.setSt( { gameReady: true } );
      if (pMsg.action === "hand") {
        this.props.setSt({ 
          hand: pMsg.hand,
          amDealer: pMsg.amDealer,
        }); 
      };
      if (pMsg.action === 'ok') this.props.setSt( { readyMessage: pMsg.readyMessage } )
      if (pMsg.action === "win") this.props.setSt( { winMessage: pMsg.winMessage, opponent: pMsg.opponent } );
    }
    socket.onclose = () => console.log('Socket closed');
    this.props.setSt({ socket: socket });
    console.log("Socket:", socket);
  }
  lobbySwitch() {
    console.log('message for room', this.props.state.message)
    console.log(this.props.state.gameReady);
    if (this.props.state.socket !== 0 && this.props.state.gameReady === false) { 
      return (<div>Waiting for other player. . .</div>)
    }
    if (this.props.state.socket !== 0 && this.props.state.gameReady === true) {
      return (
        <div className>
          <Room winMessage = {this.props.state.winMessage} readyMessage={this.props.state.readyMessage} opponent={this.props.state.opponent} hand = {this.props.state.hand} amDealer = {this.props.state.amDealer} socket={this.props.state.socket} username = {this.props.state.username} /> 
          <p id = 'title'> Poker by Ryan, Will, and Matt - Updated by Glenn, Masaya, and Jelena</p>
        </div>
      )
    } else {
      return (
        <div id="lobby">
          <button onClick={this.createGame}>Join Game</button>
        </div>
      )
    }
  }
  render() {
    return (
      <div>
        {this.lobbySwitch()}
      </div>
    )
  }
} 

export default Lobby;