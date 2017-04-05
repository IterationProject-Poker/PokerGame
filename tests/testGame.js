const expect = require('chai').expect;
const Game = require('../server/controllers/TestController');


describe('2 aces', function () {
    it('be a pair', () => {
        expect(Game.pair([0, 13])).to.equal(0);
    });
    it('not to be a fullhouse', () => {
        expect(Game.fullHouse([0, 13])).to.not.equal(undefined);
    });
});

describe('2 aces and 2 twos', function () {
    it('be a two pair', () => {
        expect(Game.twoPair([0, 1, 13, 14])).to.deep.equal([1, 0]);
    });
    it('not to be a fullhouse', () => {
        expect(Game.fullHouse([0, 1, 13, 14])).to.not.equal(undefined);
    });
});

describe('3 aces', function () {
    it('be a three of a kind', () => {
        expect(Game.threeOfAKind([0, 13, 26])).to.equal(0);
    });
    it('not to be a straight', () => {
        expect(Game.straight([0, 13, 26])).to.not.equal(undefined);
    });
});

describe('Five cards of any suit, in sequential order', function () {
    it('be a straight', () => {
        expect(Game.straight([0, 4, 14, 16, 28])).to.equal(4);
    });
    it('not to be a flush', () => {
        expect(Game.flush([0, 4, 14, 16, 28])).to.not.equal(undefined);
    });
});

describe('Five cards of the same suit, in any order', function () {
    it('be a flush', () => {
        expect(Game.flush([0, 2, 4, 6, 9])).to.deep.equal([0, 2, 4, 6, 9]);
    });
    it('not to be a straight', () => {
        expect(Game.straight([0, 2, 4, 6, 9])).to.not.equal(undefined);
    });
});

describe('3 aces and 2 twos', function () {
    it('be a fullhouse', () => {
        expect(Game.fullHouse([0, 1, 13, 14, 26])).to.deep.equal([0, 1]);
    });
    it('not to be a threeOfAKind', () => {
        expect(Game.threeOfAKind([0, 1, 13, 14, 26])).to.not.equal(undefined);
    });
});

describe('4 aces', function () {
    it('be a fourOfAKind', () => {
        expect(Game.fourOfAKind([0, 13, 26, 29])).to.equal(false);
    });
    it('not to be a threeOfAKind', () => {
        expect(Game.threeOfAKind([0, 13, 26, 29])).to.not.equal(undefined);
    });
});

describe('Five cards of the same suit in sequential order', function () {
    it('be a straigtFlush', () => {
        expect(Game.straightFlush([0, 1, 2, 3, 4])).to.deep.equal(4);
    });
    it('not to be a threeOfAKind', () => {
        expect(Game.flush([0, 1, 2, 3, 4])).to.not.equal(undefined);
    });
});

