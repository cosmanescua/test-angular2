import { TableHead } from '../../dtShared/table/dt.tableHead.model';

export interface DTTableViewIF{
    // __columns: TableHead[];
    __pageSize: number;
    __pageSizeModel: number;
    __currentPage: number;
    __totalItems: number;

    __onPageSizeChanged(): void;
    __onPageChanged(event: any): void;

    // __setColumns(columns: TableHead[]);
}
