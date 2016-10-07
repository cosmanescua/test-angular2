"use strict";
var dt_sort_model_1 = require('../../dtShared/table/dt.sort.model');
var Pagination = (function () {
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
exports.Pagination = Pagination;
//# sourceMappingURL=dt.pagination.model.js.map