'use strict';

const isInteger = require('is-integer');

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
 * This function will conver a roman number to indian notation.
 * @param roman
 * @private
 */
function _toIndian(roman) {
    if (roman.length==0) {
        throwInvalidValue();
    }
}

/**
 * The final roman number conversion utility
 * @param arg it accepts an integer or a string rappresenting a roman number between 1-3999 otherwise throws
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
        if (arg<1 || arg>3999) {
            throwInvalidRange();
        }
        this.indian =arg;
    } else {
        throwInvalidValue();
    }





};

roman.prototype.toInt = function() {

};

roman.prototype.toString = function() {

};

roman.prototype.constructor = roman;

module.exports = roman;