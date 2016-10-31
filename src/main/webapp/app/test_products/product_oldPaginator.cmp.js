"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var products_service_1 = require('./products.service');
var dt_pagination_model_1 = require('../dtShared/table/dt.pagination.model');
var dt_filter_model_1 = require('../dtShared/table/dt.filter.model');
var dt_sort_model_1 = require('../dtShared/table/dt.sort.model');
var ProductsComponent = (function () {
    function ProductsComponent(_productsService) {
        this._productsService = _productsService;
        this.loaderHidden = false;
        //nr of items diplayed per page
        this.itemsPerPage = 5;
        this.nrOfPages = 0;
        this.currentPage = 1;
        //flags used to prevent user to click on previous or next when these pages don't exist
        this.displayPreviousBtn = false;
        this.displayNextBtn = false;
        //set to disabled when the previous and next have to be disabled
        this.prevBtnClass = "";
        this.nextBtnClass = "";
        this._totalNrOfItems = 0;
        this.pagination = new dt_pagination_model_1.Pagination();
        this.sort = new dt_sort_model_1.Sort("name", "asc");
        this.filterValue = "";
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.getProductsPaginated();
    };
    /**
     * get products from the database using the products service
     * when the data is fetched initialize page elements (products, paginator)
     * @author Roxana
     */
    ProductsComponent.prototype.getProductsPaginated = function () {
        var _this = this;
        this.updatePaginationInfo();
        this.loaderHidden = false;
        this._productsService.getProductsPaginated(this.pagination).subscribe(function (data) { return _this.initPageElements(data.json()); });
    };
    /**
    * this event is triggered when the user changes the filter value
    * @author Roxana
    */
    ProductsComponent.prototype.filterValueChanged = function ($event) {
        var This = this;
        var filterList;
        this.filterValue = $event;
        setTimeout(function () {
            filterList = new Array();
            filterList.push(new dt_filter_model_1.Filter("nameGenericName", This.filterValue));
            This.pagination.setfilterList(filterList);
            This.loaderHidden = false;
            This.getProductsPaginated();
        }, 2000);
    };
    /**
     * update page, pageSize, sort in the Pagination object according to currentPage, itemsPerPage
     * @author Roxana
     */
    ProductsComponent.prototype.updatePaginationInfo = function () {
        this.pagination.setPage(this.currentPage);
        this.pagination.setPageSize(this.itemsPerPage);
        this.pagination.setSort(this.sort);
    };
    ProductsComponent.prototype.initPageElements = function (items) {
        this.loaderHidden = true;
        console.log(items);
        //when the component is initialized and the products are retrieved initialize the page paginator
        this.productsToDisplay = items.data;
        this._totalNrOfItems = items.totalRows;
        //calculate the number of pages
        this.calculateNrOfPages();
        //determine the state of the previous and next in the paginator
        this.determineNextPreviousState();
    };
    /**
     * this event is triggered when the user changes the number of items per page
     * @author Roxana
     */
    ProductsComponent.prototype.onItemSelectChange = function ($event) {
        //reset the current page
        this.currentPage = 1;
        //update nr of items per page
        this.itemsPerPage = $event;
        //recalculate the number of pages
        this.getProductsPaginated();
    };
    /**
     * calculate the number of pages to display based on the number of items per page and total number of rows
     * @author Roxana
     */
    ProductsComponent.prototype.calculateNrOfPages = function () {
        //find the number of full pages that will contain exactly itemPerPage products
        var nrOfFullPages = Math.floor(this._totalNrOfItems / this.itemsPerPage);
        //find the number of remaining items which will be displayed on the last page
        var nrOfRemainingItems = this._totalNrOfItems % this.itemsPerPage;
        this.nrOfPages = nrOfFullPages;
        if (nrOfRemainingItems != 0) {
            this.nrOfPages += 1;
        }
        this.setPages();
    };
    /**
     * set the pages that will be displayed in the paginator
     * set class "active" for the current page
     * @author Roxana
     */
    ProductsComponent.prototype.setPages = function () {
        this.pages = new Array();
        var idx;
        for (var i = 0; i < this.nrOfPages; i++) {
            idx = i + 1;
            //set the class active to the current page
            if (idx == this.currentPage)
                this.pages[i] = { "index": idx, "class": "active" };
            else
                this.pages[i] = { "index": idx, "class": "" };
        }
        console.log(this.pages);
    };
    /**
     * this event is triggered when the user clicks on the paginator
     * selectedPage is the page requested
     * @author Roxana
     */
    ProductsComponent.prototype.changePage = function ($event) {
        var selectedPage = $event.page;
        //let the user change the page only if the nr of the page required is valid
        if (selectedPage > 0 && selectedPage <= this.nrOfPages) {
            this.currentPage = selectedPage;
            this.determineNextPreviousState();
            this.getProductsPaginated();
            this.setPages();
        }
    };
    /**
     * determine the next and previous buttons state
     * @author Roxana
     */
    ProductsComponent.prototype.determineNextPreviousState = function () {
        this.displayPreviousBtn = true;
        this.displayNextBtn = true;
        this.prevBtnClass = "";
        this.nextBtnClass = "";
        //disable previous button when the current page is the first one
        if (this.currentPage == 1) {
            this.displayPreviousBtn = false;
            this.prevBtnClass = "disabled";
        }
        //disable previous button when the current page is the last one
        if (this.currentPage == this.nrOfPages) {
            this.displayNextBtn = false;
            this.nextBtnClass = "disabled";
        }
    };
    ProductsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/test_products/products.component.html',
            styleUrls: ['app/test_products/products.component.css']
        }), 
        __metadata('design:paramtypes', [products_service_1.ProductsService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=product_oldPaginator.cmp.js.map