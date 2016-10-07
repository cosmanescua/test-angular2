"use strict";
var Sort = (function () {
    function Sort(_field, _type) {
        this.field = _field;
        this.type = _type;
    }
    Sort.prototype.getName = function () {
        return this.field;
    };
    Sort.prototype.getType = function () {
        return this.type;
    };
    return Sort;
}());
exports.Sort = Sort;
//# sourceMappingURL=dt.sort.model.js.map