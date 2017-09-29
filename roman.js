'use strict';

const isInteger = require('is-integer');

/**
 * Some throws ...
 */

function throwValueRequired() {
    throw new Error('value required');
}

function throwInvalidValue() {
    throw new Error('invalid value');
}

function throwInvalidRange() {
    throw new Error('invalid range');
}

/**
 * Data for conversion.
 */


var LETTERS = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
var NUMBERS = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];


/**
 * This function will conver a roman number to indian notation.
 * @param {string} roman
 * @private
 */
function _toIndian(roman) {
    if (roman.length==0) {
        throwInvalidValue();
    }

    // Prefixes are ordered such that it will recon the right one
    // so we just eat that string until is finished and sum up everything
    // Also we are checking that higher prefixes always come before lowest
    // one otherwise that string is invalid.

    var idx = 0;
    var indian = 0;

    while(roman.length>0) {
        if (idx >= LETTERS.length) {
            throwInvalidValue();
        }
        if (roman.startsWith(LETTERS[idx])) {
            indian+=NUMBERS[idx];
            roman = roman.substring(LETTERS[idx].length);
        } else {
            idx++;
        }
    }

    if (indian>3999) {
        throwInvalidRange();
    }

    return indian;
}

/**
 * This function will convert an indian number to roman notation;
 * @param {number} indian
 * @private
 */
function _toRoman(indian) {
    if (indian<1 || indian>3999) {
        throwInvalidRange();
    }

    // We do the reverse thing here. Hammering down that indian number
    // until it's 0.
    // Values are orderer such that no normalization is to be done

    var idx = 0;
    var roman = "";

    while (indian>0) {
        if (idx >= NUMBERS.length) {
            // Actually this should never happen
            throw throwInvalidRange();
        }

        if (indian>=NUMBERS[idx]) {
            indian-=NUMBERS[idx];
            roman+=LETTERS[idx];
        } else {
            idx++;
        }
    }

    return roman;
}

/**
 * The final roman number conversion utility
 * @constructor
 * @param {string|number} arg it accepts an integer or a string rappresenting a roman number between 1-3999 otherwise throws
 */
var roman = function(arg) {
    // We decide to store the integer rappresentation
    // because it's easier to check that's ok

    // First some easy sanity check
    if (arg === null || arg === undefined) {
       throwValueRequired();
    }

    if (typeof arg === 'string') {
        // convert it to number, thus checking for a valid string
        arg = arg.toUpperCase();
        this.indian = _toIndian(arg);
        this.roman = arg;
    } else if (isInteger(arg)) {
        this.indian =arg;
        this.roman = _toRoman(arg);
    } else {
        throwInvalidValue();
    }
};

roman.prototype.toInt = function() {
    return this.indian;
};

roman.prototype.toString = function() {
    return this.roman;
};

roman.prototype.constructor = roman;

module.exports = roman;