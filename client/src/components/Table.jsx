import React, { PropTypes } from 'react';
import CommunityCards from './CommunityCards.jsx';
// const mongoose =  require('mongoose');
// const GameController = require('./../../../server/controllers/GameController.js');
const suits = ['c', 's', 'h', 'd'];

const Table = (props) => {
  const { handleFoldButton, handleCheckButton, handleCallButton, handleBetButton } = props;

  const tableSwitch = () => {
    if (props.winMessage) {
      if (props.amDealer === true) {
        let myHand = props.deck.slice(2, 4);
        let readable = myHand.map(card => {
          let cardVal = card % 13 + 2;
          if (cardVal === 14) cardVal = 1;
          let cardSuit = suits[Math.floor(card / 13)]
          return cardSuit + cardVal;
        });
        let urls = [];
        readable.forEach((card) => {
          urls.push(`./static/client/img/${card}.png`)
        })
        return (<div className="table">
          {JSON.stringify(props.winMessage)}
          <CommunityCards deck={props.deck} round={props.round} />
          <div>{props.opponent}'s Hand: <img src={urls[0]}></img> <img src={urls[1]}></img> </div>
        </div>
        )
      } else if (props.amDealer === false) {
        let myHand = props.deck.slice(0,2);
        let readable = myHand.map(card => {
          let cardVal = card % 13 + 2;
          if (cardVal === 14) cardVal = 1;
          let cardSuit = suits[Math.floor(card / 13)]
          return cardSuit + cardVal;
        });
        let urls = [];
        readable.forEach((card) => {
          urls.push(`./static/client/img/${card}.png`)
        })
        return (<div className="table">
          {JSON.stringify(props.winMessage)}
          <CommunityCards deck={props.deck} round={props.round} />
          <div>{props.opponent}'s Hand: <img src={urls[0]}></img> <img src={urls[1]}></img></div>
        </div>
        )
      }

    } else {
      return (
        <div className="table">
          <CommunityCards deck={props.deck} round={props.round} />
          <button onClick={() => props.socket.send(JSON.stringify({ action: 'ready', username: props.username }))}>Ready!!!</button>
          {/*<button onClick={() => { handleFoldButton(); }} type="button" className="btn-fold">Fold</button>
          <button onClick={() => { handleCheckButton(); }} type="button" className="btn-check">Check</button>
          <button onClick={() => { handleCallButton(); }} type="button" className="btn-call">Call</button>
          <button onClick={() => { handleBetButton(); }} type="button" className="btn-bet">Bet</button>*/}
        </div>
      )
    }
  }
  return (
    <div>
      {tableSwitch()}
    </div>
  );
};


// <button onClick={() => { handleFoldButton(); }} type="button" className="btn-fold">Fold</button>
// <button onClick={() => { handleCheckButton(); }} type="button" className="btn-check">Check</button>
// <button onClick={() => { handleCallButton(); }} type="button" className="btn-call">Call</button>
// <button onClick={() => { handleBetButton(); }} type="button" className="btn-bet">Bet</button>
// Table.propTypes = {
//   handleFoldButton: PropTypes.func,
//   handleCheckButton: PropTypes.func,
//   handleCallButton: PropTypes.func,
//   handleBetButton: PropTypes.func,
// };

export default Table;
