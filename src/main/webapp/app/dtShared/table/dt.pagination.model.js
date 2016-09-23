System.register(['../../dtShared/table/dt.sort.model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dt_sort_model_1;
    var Pagination;
    return {
        setters:[
            function (dt_sort_model_1_1) {
                dt_sort_model_1 = dt_sort_model_1_1;
            }],
        execute: function() {
            Pagination = (function () {
                function Pagination() {
                }
                Pagination.prototype.setPageSize = function (pageSize) {
                    this.pageSize = pageSize;
                };
                Pagination.prototype.setPage = function (page) {
                    this.page = page;
                };
                Pagination.prototype.setSort = function (sort) {
                    this.sort = new dt_sort_model_1.Sort(sort.getName(), sort.getType());
                };
                Pagination.prototype.setfilterList = function (filters) {
                    this.filterList = filters;
                };
                return Pagination;
            }());
            exports_1("Pagination", Pagination);
        }
    }
});
//# sourceMappingURL=dt.pagination.model.js.map