import React, { Component } from 'react';
import Login from './Login';
import Lobby from './Lobby';

function getInitialState(){
  return {
    view: 'login',
    username: '',
    socket: 0,
    message: '',
    gameReady: false,
    hand: '',
    amDealer: null,
    playerTurn: null,
    winMessage: null,
    opponent: null,
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = getInitialState();
    this.loginClick = this.loginClick.bind(this);
  }

  loginClick(type) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const data = JSON.stringify({
      username,
      password,
    });
    //console.log('credentials: ', data);
    console.log(type);
    var xhr = new XMLHttpRequest();
    if (type === 'login') xhr.open('POST', '/login');
    else if (type === 'create') xhr.open('POST', '/user');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);

    xhr.onreadystatechange = function () {
      var DONE = 4; // readyState 4 means the request is done.
      var OK = 200; // status 200 is a successful return.

      if (xhr.readyState === DONE) {
        if (xhr.status === OK) {
          console.log(username);
          this.setState({
            view: 'lobby',
            username: username,
          })
        }
          console.log(xhr.responseText); // 'This is the returned text.'
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      }.bind(this);
    };

  render() {
    //console.log('app render ', this.state.username);
    let jsx;
    if (this.state.view === 'login') {
      jsx = <Login loginClick={this.loginClick.bind(this)} />
    } else if (this.state.view === 'lobby') {
      jsx = <Lobby state = {this.state} setSt = {(state) => {this.setState(state)}} /> 
    }
    return (
      <div>
        { jsx }
      </div>
    );
  }

}

export default App;
