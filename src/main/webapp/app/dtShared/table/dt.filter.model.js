System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Filter;
    return {
        setters:[],
        execute: function() {
            Filter = (function () {
                function Filter(_name, _query) {
                    this.field = _name;
                    this.query = _query;
                }
                return Filter;
            }());
            exports_1("Filter", Filter);
        }
    }
});
//# sourceMappingURL=dt.filter.model.js.map