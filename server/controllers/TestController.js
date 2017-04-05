const mongoose = require('mongoose');
const Game = require('../../models/Game.js');

const GameController = {
    createGame: (req, res, next) => {
        User.create(req.body, (err, doc) => {
            if (err) throw err;
            else next();
        })
    },

    createDeck: () => {
        const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
            24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
            49, 50, 51];
        const deck = [];

        for (let i = 52; i > 43; i -= 1) {
            let cardIndex = Math.floor(Math.random() * i);
            deck.push(cards.splice(cardIndex, 1)[0]);
        }
        return deck;
    },

    defaultWinner: (hands) => {
        const dealerHand = hands[0];
        const opponentHand = hands[1];
        if (dealerHand[0] < opponentHand[0]) return 'dealer';
        if (dealerHand[0] > opponentHand[0]) return 'opponent';

        //tied with fullhouse or twoPair
        if (dealerHand[0] === 2 || dealerHand[0] === 6) {
            if (dealerHand[1][0] > opponentHand[1][0]) return 'dealer';
            if (opponentHand[1][0] > dealerHand[1][0]) return 'opponent';
            if (dealerHand[1][1] > opponentHand[1][1]) return 'dealer';
            if (opponentHand[1][1] > dealerHand[1][1]) return 'opponent';
            return 'tie';
        }
        //tied with flush
        if (dealerHand[0] === 3) {
            while (dealerHand[1].length) {
                let dealerCard = dealerHand[1].pop();
                let opponentCard = opponentHand.pop();
                if (dealerCard > opponentCard) return 'dealer';
                if (opponentCard > dealerCard) return 'opponent';
            }
            return 'tie';
        }
        //tied with anything else
        if (dealerHand[1] > opponentHand[1]) return 'dealer';
        if (opponentHand[1] > dealerHand[1]) return 'opponent';

        return 'tie';
    },

    straightFlush: (cards) => {
        cards.sort((a, b) => a - b);
        let consecutive = 0;
        let straightFlush = false;
        cards.forEach((card, index) => {
            if (consecutive === 0) consecutive = 1;
            else if (card === cards[index - 1] + 1 && card % 13 !== 0) consecutive += 1;
            else consecutive = 1;

            if (consecutive >= 5) {
                straightFlush = card % 13;
            }
        });
        return straightFlush;
    },

    fourOfAKind: (cards) => {
        cardValues = cards.map(card => card % 13).sort((a, b) => a - b);

        let consecutive = 0;
        let four_of_a_kind = false;
        cardValues.forEach((card, index) => {
            if (consecutive === 0) consecutive = 1;
            else if (card === cardValues[index - 1]) consecutive += 1;
            else consecutive = 1;

            if (consecutive === 4) {
                four_of_a_kind = card;
            }
        });

        return four_of_a_kind;
    },

    fullHouse: (cards) => {
        cardValues = cards.map(card => card % 13).sort((a, b) => a - b);
        myHand = cardValues.reduce((acc, card) => {
            if (acc[card]) acc[card] += 1;
            else acc[card] = 1;
            return acc;
        }, {});
        let threes = GameController.threeOfAKind(cards);
        let full_house = false;
        if (threes !== false) {
            delete myHand[threes];
            Object.keys(myHand).forEach(cardval => {
                if (myHand[cardval] >= 2) {
                    full_house = [threes, parseInt(cardval, 10)];
                }
            })
        }

        return full_house;
    },

    flush: (cards) => {
        let flush = false;
        const cardValues = cards.map(card => card % 13);
        const cardSuits = cards.map(card => Math.floor(card / 13));
        const suitsObj = cardSuits.reduce((acc, suit, index) => {
            if (acc[suit]) acc[suit].push(cardValues[index]);
            else acc[suit] = [cardValues[index]];
            return acc;
        }, {});
        Object.keys(suitsObj).forEach(suit => {
            if (suitsObj[suit].length >= 5) {
                flush = suitsObj[suit].sort((a, b) => a - b).slice(-5);
            }
        });
        return flush;
    },

    straight: (cards) => {
        let str8 = false;
        let cardValues = cards.map(card => card % 13).sort((a, b) => a - b);
        let consecutive = 0;
        let lastCard;
        cardValues.forEach((card, index) => {
            if (consecutive === 0) {
                consecutive = 1;
                lastCard = card;
            }
            else if (card === lastCard) return;
            else if (card === lastCard + 1) {
                consecutive += 1;
                lastCard = card;
            } else consecutive = 1;

            if (consecutive >= 5) {
                str8 = lastCard;
            }
        });
        return str8;
    },

    threeOfAKind: (cards) => {
        cardValues = cards.map(card => card % 13).sort((a, b) => a - b);

        let consecutive = 0;
        let three_of_a_kind = false;
        cardValues.forEach((card, index) => {
            if (consecutive === 0) consecutive = 1;
            else if (card === cardValues[index - 1]) consecutive += 1;
            else consecutive = 1;

            if (consecutive === 3) {
                three_of_a_kind = card;
            }
        });

        return three_of_a_kind;
    },

    twoPair: (cards) => {
        let two_pair = false;
        let cardValues = cards.map(card => card % 13).sort((a, b) => a - b);

        let myHand = cardValues.reduce((acc, card) => {
            if (acc[card]) acc[card] += 1;
            else acc[card] = 1;
            return acc;
        }, {});

        let twos = GameController.pair(cards);

        if (twos !== false) {
            delete myHand[twos];
            Object.keys(myHand).forEach(cardval => {
                if (myHand[cardval] >= 2) {
                    two_pair = [twos, parseInt(cardval, 10)];
                }
            })
        }
        return two_pair;
    },

    pair: (cards) => {
        cardValues = cards.map(card => card % 13).sort((a, b) => a - b);

        let consecutive = 0;
        let pair = false;
        cardValues.forEach((card, index) => {
            if (consecutive === 0) consecutive = 1;
            else if (card === cardValues[index - 1]) consecutive += 1;
            else consecutive = 1;

            if (consecutive === 2) {
                pair = card;
            }
        });
        return pair;
    },

    highCard: (cards) => {
        let cardValues = cards.map(card => card % 13).sort((a, b) => a - b);
        return cardValues[cardValues.length - 1];
    },

  playerHands: (deck) => {
        const handTypes = [GameController.straightFlush, GameController.fourOfAKind, GameController.fullHouse, GameController.flush, GameController.straight,
        GameController.threeOfAKind, GameController.twoPair, GameController.pair, GameController.highCard];

        const dealerCards = deck.slice(0, 2).concat(deck.slice(4));
        const opponentCards = deck.slice(2);

        let dealerHand = [];
        let opponentHand = [];
        handTypes.forEach((valuation, index) => {
            if (!dealerHand.length && valuation(dealerCards) !== false) dealerHand.push(index, valuation(dealerCards));
            if (!opponentHand.length && valuation(opponentCards) !== false) opponentHand.push(index, valuation(opponentCards));
        });

        return [dealerHand, opponentHand];


    },

    createReadableDeck: (deck) => {
        const suits = ['c', 's', 'h', 'd'];
        const newDeck = deck.map(card => {
            let cardVal = card % 13 + 2;
            let cardSuit = suits[Math.floor(card / 13)]
            return cardVal + cardSuit;
        });
        return newDeck;
    },

    createHand: (username) => {
        const deck = GameController.createDeck();
        const hand = {
            deck,
            readableDeck: GameController.createReadableDeck(deck),
            dealer: username,
            defaultWinner: GameController.defaultWinner(GameController.playerHands(deck)),
            dealerHand: GameController.playerHands(deck)[0],
            opponentHand: GameController.playerHands(deck)[1],
            currentRound: 1,
            round1: [],
            round2: [],
            round3: [],
            round4: [],
        };
        return hand;
    },


}

module.exports = GameController;
