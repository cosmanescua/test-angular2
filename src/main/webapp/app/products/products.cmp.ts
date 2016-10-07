import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.model';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';
import { DTTableViewIF } from '../dtShared/table/dt.TableViewIF';
import { TableHead } from '../dtShared/table/dt.tableHead.model';
import { Pagination } from '../dtShared/table/dt.pagination.model';
import { Sort } from '../dtShared/table/dt.sort.model';
import { Filter } from '../dtShared/table/dt.filter.model';
import { DTTable } from '../dtShared/table/dt.table';


@Component({
    templateUrl: 'app/products/products.cmp.html',
})
export class ProductsCmp implements OnInit, DTViewCmpIf, DTTableViewIF {
    products: Product[];

    __pageSize: number;
    __pageSizeModel: number;
    __currentPage: number;
    __totalItems: number
    __pageCount: number;

    pageSizeChangeStatus: boolean;

    filters: any;
    sort: Sort;
    pageSizes: number[];

    show: boolean = true;

    constructor(private _productsService: ProductsService,
        private _dtService: DTService,
        private _dtTable: DTTable,
        private _changeDetectionRef: ChangeDetectorRef) { }

    /* === Ajax calls === */

    private loadProductsRest(currentPage: number, pageSize: number): void {
        this._dtService.setRestMessageContent('ProductsCmp', 'loadProductsRest()');
        this._productsService.getProducts(this._dtTable.getPaginationParams(currentPage, pageSize, this.filters, this.sort))
            .subscribe(products => {
                this.__totalItems = products.totalRows;

                this.products = products.data;
                this.__currentPage = currentPage;
                this.__pageSize = pageSize;

                setTimeout(() => {
                    this.pageSizeChangeStatus = false;
                });
            }, error => {
                this.pageSizeChangeStatus = true;
                this.__currentPage = 1;

                setTimeout(() => {
                    this.pageSizeChangeStatus = false;
                });
            });
    }

    /* === Pagination methods === */
    public __onPageChanged(event: any): void {

        if (!this.pageSizeChangeStatus) {
            this.__currentPage = event.page;
            this.loadProductsRest(this.__currentPage, this.__pageSize);
        }
    };

    public __onPageSizeChanged(): void {
        this.pageSizeChangeStatus = true;

        this._changeDetectionRef.detectChanges();

        this.loadProductsRest(1, this.__pageSizeModel);
    }

    public filterByName(): void {
        this.pageSizeChangeStatus = true;

        this._changeDetectionRef.detectChanges();

        this.loadProductsRest(1, this.__pageSizeModel);
    }



    // ---------------------- ON INIT
    ngOnInit() {

        this.__pageSizeModel = 10;
        this.__pageSize = 10;
        this.__currentPage = 1;
        this.__totalItems = 0;

        this.filters = {
            name: ''
        }
        this.sort = new Sort('name', 'asc');
        this.pageSizes = [5, 6, 7, 8, 9, 10, 11];


        this.loadProductsRest(this.__currentPage, this.__pageSize);

        // Construct methods
        this.__setInitPageTitle('Products');
    }

    // Interface imported
    __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    }  
}