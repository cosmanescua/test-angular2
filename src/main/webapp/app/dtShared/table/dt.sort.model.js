System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Sort;
    return {
        setters:[],
        execute: function() {
            Sort = (function () {
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
            exports_1("Sort", Sort);
        }
    }
});
//# sourceMappingURL=dt.sort.model.js.map