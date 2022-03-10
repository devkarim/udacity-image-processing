"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFormatAllowed = void 0;
var isFormatAllowed = function (x) {
    return ['png', 'jpg', 'jpeg'].includes(x);
};
exports.isFormatAllowed = isFormatAllowed;
