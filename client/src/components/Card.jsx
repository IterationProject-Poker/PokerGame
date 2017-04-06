import React, { PropTypes } from 'react';

const Card = (props) => {
  // const { hidden, cardValue } = props;
  // const hidden = false;
  // const cardBackgroundUrl = hidden ? 'url(img/hidden.png)' : `url(img/${cardValue}.png)`;
  // const cardStyle = { backgroundImage: cardBackgroundUrl };

  
  const suits = ['c', 's', 'h', 'd'];
  const mySuit = suits[Math.floor(props.val / 13)];
  let myValue = props.val % 13 + 2;
  if (myValue === 14) myValue = 1;
  const cardName = mySuit + myValue;

  // console.log('props.val', props.val, 'cardName:', cardName)

  const url = props.hidden ? `./static/client/img/hidden.png` : `./static/client/img/${cardName}.png`;

  return (
    <img src={url} />
  );
};

// Card.propTypes = {
//   // hidden: PropTypes.boolean.isRequired,
//   cardValue: PropTypes.number.isRequired,
// };

export default Card;
