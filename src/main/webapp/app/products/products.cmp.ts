import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';

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

import { AppService } from '../shared/services/app.service';

@Component({
    templateUrl: 'app/products/products.cmp.html',
    // styleUrls: ['app/products/product.cmp.css'],

    encapsulation: ViewEncapsulation.None
})
export class ProductsCmp implements OnInit, DTTableViewIF {
    products: Product[];
    productsToFilter: Product[];

    __pageSize: number;
    __pageSizeModel: number;
    __currentPage: number;
    __totalItems: number
    __pageCount: number;

    pageSizeChangeStatus: boolean;

    filters: any;
    sort: Sort;
    pageSizes: number[];
    timeout: any;

    show: boolean = true;
    isLoading: boolean = false;

    constructor(
        private _productsService: ProductsService,
        private _dtService: DTService,
        private _dtTable: DTTable,
        private _changeDetectionRef: ChangeDetectorRef,
        private _appService: AppService
    ) { }

    /* === Ajax calls === */

    private loadProductsRest(currentPage: number, pageSize: number): void {
        this._dtService.setRestMessageContent('ProductsCmp', 'loadProductsRest()');
        this._productsService.getProducts(this._dtTable.getPaginationParams(currentPage, pageSize, this.filters, this.sort))
            .toPromise().then(products => {
                this.__totalItems = products.totalRows;

                console.log(this.__totalItems);
                

                this.products = products.data;
                this.productsToFilter = this.products;
                this.__currentPage = currentPage;
                this.__pageSize = pageSize;

                setTimeout(() => {
                    this.pageSizeChangeStatus = false;
                    this.isLoading = false;
                }, 50);
            }, error => {
                this.pageSizeChangeStatus = true;
                this.__currentPage = 1;

                setTimeout(() => {
                    this.isLoading = false;
                    this.pageSizeChangeStatus = false;
                }, 50);
            });
    }

    /* === Pagination methods === */
    public __onPageChanged(event: any): void {
        this.isLoading = true;
        if (!this.pageSizeChangeStatus) {
            this.__currentPage = event.page;
            this.loadProductsRest(this.__currentPage, this.__pageSize);
        }
    };

    public __onPageSizeChanged(): void {
        this.pageSizeChangeStatus = true;
        this.isLoading = true;

        this._changeDetectionRef.detectChanges();

        this.loadProductsRest(1, this.__pageSizeModel);
    }

    public filterByName(): void {
        // this._changeDetectionRef.detectChanges();

        this.timeout = setTimeout(() => {
            this.pageSizeChangeStatus = true;
            this.isLoading = true;


            this.loadProductsRest(1, this.__pageSizeModel);
        }, 2000);
    }



    // ---------------------- ON INIT
    ngOnInit() {
        // Variable initialization
        this.__pageSizeModel = 10;
        this.__pageSize = 10;
        this.__currentPage = 1;
        this.__totalItems = 0;

        this.filters = {
        }
        this.sort = new Sort('name', 'asc');
        this.pageSizes = [5, 6, 7, 8, 9, 10, 11];

        // Methods execution
        this.isLoading = true;
        this.loadProductsRest(this.__currentPage, this.__pageSize);

        // Construct methods
        this._appService.pageLoaded('Products');
    }
}