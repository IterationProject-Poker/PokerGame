import React, { PropTypes } from 'react';
import Card from './Card.jsx';

const CommunityCards = (props) => {
  console.log(props.round);
  const cards = props.deck.slice(4);
  const hiddenArr = []
  for (let i = 0; i < 5; i += 1) {
    if (props.round >= 4) {
      hiddenArr.push(false);
    } else if (props.round >= 3 && i < 4 ) {
      hiddenArr.push(false);
    } else if (props.round >= 2 && i < 3 ) {
      hiddenArr.push(false);
    } else {
      hiddenArr.push(true);
    }
  }

  return (
    <div className='board'>
      <Card val={cards[0]} hidden = {hiddenArr[0]} />
      <Card val={cards[1]} hidden = {hiddenArr[1]} />
      <Card val={cards[2]} hidden = {hiddenArr[2]} />
      <Card val={cards[3]} hidden = {hiddenArr[3]} />
      <Card val={cards[4]} hidden = {hiddenArr[4]} />
    </div>
  );
};

export default CommunityCards;
