import { Filter } from '../../dtShared/table/dt.filter.model';
import { Sort } from '../../dtShared/table/dt.sort.model';

export class Pagination {
    private page: number;
    private pageSize: number;

    private sort: Sort;

    private filterList: Filter[];

    setPageSize(pageSize: number): void{
        this.pageSize = pageSize;
    }
    setPage(page: number): void{
        this.page = page;
    }

    setSort(sort: Sort): void{
        this.sort = new Sort(sort.getName(), sort.getType());
    }

    setfilterList(filters: Filter[]): void{
        this.filterList = filters;
    }
}