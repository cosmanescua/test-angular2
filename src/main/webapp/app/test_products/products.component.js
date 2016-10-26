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
var ProductsComponent = (function () {
    function ProductsComponent(_productsService) {
        this._productsService = _productsService;
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
    }
    ProductsComponent.prototype.ngOnInit = function () {
        this.getAllProducts();
    };
    ProductsComponent.prototype.getAllProducts = function () {
        var _this = this;
        this._productsService.getProducts().subscribe(function (data) { return _this.initPageElements(data.json()); });
    };
    ProductsComponent.prototype.initPageElements = function (items) {
        //when the component is initialized and the products are retrieved initialized the page paginator
        this.products = items;
        this._totalNrOfItems = this.products.length;
        //calculate the number of pages
        this.calculateNrOfPages();
        //determine which products must be displayed according to the number if items per page
        this.determineProductsToDisplay();
        //determine the state of the previous and next in the paginator
        this.determineNextPreviousState();
    };
    //this event is generated when the user changes the number of items per page
    ProductsComponent.prototype.onItemSelectChange = function ($event) {
        //reset the current page
        this.currentPage = 1;
        //update nr of items per page
        this.itemsPerPage = $event;
        //recalculate the number of pages
        this.calculateNrOfPages();
        this.determineProductsToDisplay();
        this.determineNextPreviousState();
    };
    //calculate the number of pages to display
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
    //set the pages that will be displayed in the paginator
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
    //this event is triggered when the user clicks on the paginator
    ProductsComponent.prototype.changePage = function (selectedPage) {
        //let the user change the page only if the nr of the page required is valid
        if (selectedPage > 0 && selectedPage <= this.nrOfPages) {
            this.currentPage = selectedPage;
            this.determineNextPreviousState();
            this.determineProductsToDisplay();
            this.setPages();
        }
    };
    //determine the next and previous buttons state
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
    //determine which products to display on the page
    //this method will be replaced with a call to the ProductsService with the parameters from and to (in order to get the data from the DB)
    ProductsComponent.prototype.determineProductsToDisplay = function () {
        this.productsToDisplay = new Array();
        this.from = (this.currentPage - 1) * this.itemsPerPage;
        this.to = (this.currentPage * this.itemsPerPage) - 1;
        var idx = 0;
        for (var i = this.from; i <= this.to && i < this._totalNrOfItems; i++) {
            this.productsToDisplay[idx] = this.products[i];
            idx++;
        }
    };
    ProductsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/test_products/products.component.html'
        }), 
        __metadata('design:paramtypes', [products_service_1.ProductsService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map