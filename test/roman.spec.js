'use strict';

const expect = require('chai').expect;

const roman = require('../roman');

describe('roman', function () {

    // Formal tests

    it('is a function', function () {
        expect(roman).to.be.a('function');
    });

    it('is a roman constructor', function () {
        expect(new roman(1)).to.be.instanceOf(roman);
    });

    it('has an "toInt" method', function () {
        expect(roman).to.respondsTo('toInt');
    });

    it('has an "toString" method', function () {
        expect(roman).to.respondsTo('toString');
    });

    // Now write actual tests
    it("doesn't accept null arg", function () {
        expect(function () {
            new roman(null);
        }).to.throw('value required');
    });

    it("doesn't accept empty string", function () {
        expect(function () {
            new roman('');
        }).to.throw('invalid value')
    });

    it("doesn't accept 0", function () {
        expect(function () {
            new roman(0);
        }).to.throw('invalid range');
    });

    it("knows how to encode 1", function () {
        expect(new roman(1).toString()).to.equal('I');
    });

    it("knows how to encode 3", function () {
        expect(new roman(3).toString()).to.equal('III');
    });

    it("knows how to encode 4", function () {
        expect(new roman(4).toString()).to.equal('IV');
    });

    it("knows how to encode 5", function () {
        expect(new roman(5).toString()).to.equal('V');
    });

    it("knows how to decode I", function () {
        expect(new roman('I').toInt()).to.equal(1);
    });

    it("knows how to decode III", function () {
        expect(new roman('III').toInt()).to.equal(3);
    });

    it("knows how to decode IV", function () {
        expect(new roman('IV').toInt()).to.equal(4);
    });

    it("knows how to decode V", function () {
        expect(new roman('V').toInt()).to.equal(5);
    });

    it("knows how to encode 1968", function () {
        expect(new roman(1968).toString()).to.equal('MCMLXVIII');
    });

    it("doesn't get fooled by string integer", function () {
        expect(function () {
            new roman('1473');
        }).to.throw('invalid value');
    });

    it("knows how to encode 2999", function () {
        expect(new roman(2999).toString()).to.equal('MMCMXCIX');
    });

    it("knows how to encode 3000", function () {
        expect(new roman(3000).toString()).to.equal('MMM');
    });

    it("knows when it's too big", function () {
        expect(function () {
            new roman(10000);
        }).to.throw('invalid range');
    });

    it("knows how to decode CDXXIX", function () {
        expect(new roman('CDXXIX').toInt()).to.equal(429);
    });

    it("knows that 1 is not an I", function () {
        expect(function () {
            new roman('CD1X');
        }).to.throw('invalid value');
    });

    it("knows that 'error' is an error", function () {
        expect(function () {
            new roman('error');
        }).to.throw('invalid value');
    });

    it("knows how to decode MCDLXXXII", function () {
        expect(new roman('MCDLXXXII').toInt()).to.equal(1482);
    });

    it("Cum ille scit quid est magnus", function () {
        expect(function () {
            new roman('MMMMCMXCIX');
        }).to.throw('invalid range');
    });

    it("Qui scit quod aliqua male scriptum est", function () {
        expect(function () {
            new roman('MMMMDMXCIX');
        }).to.throw('invalid value');
    });

    it('is idempotent', function() {
        var i;
        for (i = 1; i < 4000; i++) {
            expect(new roman(new roman(i).toString()).toInt()).to.equal(i);
        }
    });

});