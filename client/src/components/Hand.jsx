import React, { PropTypes } from 'react';
import Card from './Card.jsx';

const Hand = (props) => {
  let cards;
  if (props.amDealer !== null) {
    cards = props.amDealer? props.deck.slice(0,2) : props.deck.slice(2,4)
  }
  return (
    <div className="hand">
      <Card val={cards[0]} />
      <Card val={cards[1]} />
    </div>
  );
};

// Hand.propTypes = {
//   cardValue: PropTypes.number.isRequired,
// };
      // { JSON.stringify(props.deck) }
      // { JSON.stringify(props.amDealer) }

export default Hand;
