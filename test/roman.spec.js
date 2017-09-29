const expect = require('chai').expect;

const roman = require('../roman');

describe('roman',function(){
    it('is a function',function(){
        expect(roman).to.be.a('function');
    });
});