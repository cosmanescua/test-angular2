System.register(['../../dtShared/table/dt.pagination.model', '../../dtShared/table/dt.filter.model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dt_pagination_model_1, dt_filter_model_1;
    var DTTable;
    return {
        setters:[
            function (dt_pagination_model_1_1) {
                dt_pagination_model_1 = dt_pagination_model_1_1;
            },
            function (dt_filter_model_1_1) {
                dt_filter_model_1 = dt_filter_model_1_1;
            }],
        execute: function() {
            DTTable = (function () {
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
            exports_1("DTTable", DTTable);
        }
    }
});
//# sourceMappingURL=dt.table.js.map