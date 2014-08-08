"use strict";

var Get = require("especially/abstract-operations").Get;
var SameValueZero = require("especially/abstract-operations").SameValueZero;
var ToInteger = require("especially/abstract-operations").ToInteger;
var ToLength = require("especially/abstract-operations").ToLength;
var ToObject = require("especially/abstract-operations").ToObject;
var ToString = require("especially/abstract-operations").ToString;
var abs = require("especially/math").abs;
var define_built_in_data_property = require("especially/meta").define_built_in_data_property;

define_built_in_data_property(Array.prototype, "contains", function contains(searchElement) {
    var fromIndex = arguments[1];

    var O = ToObject(this);
    var len = ToLength(Get(O, "length"));

    if (len === 0) {
        return false;
    }

    var n = ToInteger(fromIndex);

    var k;
    if (n === +Infinity) {
        return false;
    } else if (n === -Infinity) {
        k = 0;
    } else if (n >= len) {
        return false;
    } else if (n >= 0) {
        k = n;
    } else {
        k = len - abs(n);
        if (k < 0) {
            k = 0;
        }
    }

    while (k < len) {
        var elementK = Get(O, ToString(k));
        if (SameValueZero(searchElement, elementK) === true) {
            return true;
        }

        ++k;
    }

    return false;
});