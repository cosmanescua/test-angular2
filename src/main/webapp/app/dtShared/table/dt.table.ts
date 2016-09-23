import { Pagination } from '../../dtShared/table/dt.pagination.model';
import { Sort } from '../../dtShared/table/dt.sort.model';
import { Filter } from '../../dtShared/table/dt.filter.model';

export class DTTable {
    
    /**
     * Get Pagination object for request query
     * @author DynTech
     */
    getPaginationParams(curentPage: number, pageSize: number, filters: any, sort: Sort): Pagination {
        let paginationTemp: Pagination = new Pagination();
        paginationTemp.setPage(curentPage);
        paginationTemp.setPageSize(pageSize);
        paginationTemp.setSort(sort);

        let filterList: Filter[] = this.getAllFilters(filters);

        paginationTemp.setfilterList(filterList);


        return paginationTemp;
    }


    /**
     * Get all filters in array
     * @author DynTech
     */
    getAllFilters(filtersObject: any): Filter[] {
        let filterTemp: Filter;
        let filtersTemp: Filter[] = [];

        for (let i in filtersObject) {
            if (filtersObject[i] != '') {
                filterTemp = new Filter(i, filtersObject[i]);

                filtersTemp.push(filterTemp);
            }
        }
        return filtersTemp;
    }
}