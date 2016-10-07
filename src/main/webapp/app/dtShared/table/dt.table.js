"use strict";
var dt_pagination_model_1 = require('../../dtShared/table/dt.pagination.model');
var dt_filter_model_1 = require('../../dtShared/table/dt.filter.model');
var DTTable = (function () {
    function DTTable() {
    }
    /**
     * Get Pagination object for request query
     * @author DynTech
     */
    DTTable.prototype.getPaginationParams = function (curentPage, pageSize, filters, sort) {
        var paginationTemp = new dt_pagination_model_1.Pagination();
        paginationTemp.setPage(curentPage);
        paginationTemp.setPageSize(pageSize);
        paginationTemp.setSort(sort);
        var filterList = this.getAllFilters(filters);
        paginationTemp.setfilterList(filterList);
        return paginationTemp;
    };
    /**
     * Get all filters in array
     * @author DynTech
     */
    DTTable.prototype.getAllFilters = function (filtersObject) {
        var filterTemp;
        var filtersTemp = [];
        for (var i in filtersObject) {
            if (filtersObject[i] != '') {
                filterTemp = new dt_filter_model_1.Filter(i, filtersObject[i]);
                filtersTemp.push(filterTemp);
            }
        }
        return filtersTemp;
    };
    return DTTable;
}());
exports.DTTable = DTTable;
//# sourceMappingURL=dt.table.js.map