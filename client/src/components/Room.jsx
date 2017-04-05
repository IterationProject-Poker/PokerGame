import React, { Component } from 'react';
import Hand from './Hand.jsx';
import Table from './Table.jsx';

class Room extends Component {
  constructor(props) {
    super(props);
  };


  // handleFoldButton() => {

  // }

  // handleCheckButton() {

  // }

  // handleCallButton() {

  // }

  // handleBetButton() {

  // }

  render() {

    return (
      <div>
        <Table winMessage={this.props.winMessage} opponent={this.props.opponent} deck={this.props.hand.deck} round={this.props.hand.currentRound} 
        socket={this.props.socket} username={this.props.username} amDealer={this.props.amDealer} />
        <Hand deck={this.props.hand.deck} amDealer={this.props.amDealer} />
      </div>
    );
  }

}

export default Room;

// handleFoldButton={handleFoldButton()} 
//         handleCheckButton={handleCheckButton()} handleCallButton={handleCallButton()} handleBetButton={handleBetButton()}