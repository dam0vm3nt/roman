const expect = require('chai').expect;

const roman = require('../roman');

describe('roman',function(){
    it('is a function',function(){
        expect(roman).to.be.a('function');
    });

    it('is a roman constructor',function(){
        expect(new roman(0)).to.be.instanceOf(roman);
    });

    it('has an "toInt" method',function(){
        expect(roman).to.respondsTo('toInt');
    });

    it('has an "toString" method',function(){
        expect(roman).to.respondsTo('toString');
    });
});