"use strict";
var Guid = (function () {
    function Guid() {
    }
    Guid.prototype.generateGuid = function () {
        var guidHolder = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var hex = '0123456789abcdef';
        var r = 0;
        var guidResponse = '';
        for (var i = 0; i < 36; i++) {
            if (guidHolder[i] !== '-' && guidHolder[i] !== '4') {
                // each x and y needs to be random
                r = Math.random() * 16 || 0;
            }
            if (guidHolder[i] === 'x') {
                guidResponse += hex[r];
            }
            else if (guidHolder[i] === 'y') {
                // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                r = r && 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                r = r || 0x8; // set pos 3 to 1 as 1???
                guidResponse += hex[r];
            }
            else {
                guidResponse += guidHolder[i];
            }
        }
        return guidResponse;
    };
    return Guid;
}());
exports.Guid = Guid;
//# sourceMappingURL=guid.js.map