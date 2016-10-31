import {Component, OnInit}  from '@angular/core';
import {Product} from './product.model';
import {ProductsService} from './products.service';
import {Pagination} from '../dtShared/table/dt.pagination.model';
import {Filter} from '../dtShared/table/dt.filter.model';
import {Sort} from '../dtShared/table/dt.sort.model';

@Component({
    templateUrl: 'app/test_products/products.component.html',
    styleUrls:['app/test_products/products.component.css']
})
export class ProductsComponent implements OnInit {
    //products to diplay on the page
    productsToDisplay: Product[];
    loaderHidden=false;

    //nr of items diplayed per page
    itemsPerPage: number = 5;
    nrOfPages: number = 0;
    currentPage: number = 1;

    //flags used to prevent user to click on previous or next when these pages don't exist
    displayPreviousBtn = false;
    displayNextBtn = false;

    //set to disabled when the previous and next have to be disabled
    prevBtnClass = "";
    nextBtnClass = "";

    //the pages displayed in the paginator
    pages: any[];
    _totalNrOfItems: number = 0;

    pagination: Pagination = new Pagination();
    sort: Sort = new Sort("name", "asc");
    filter: Filter;
    filterValue = "";



    constructor(private _productsService: ProductsService) { }
    ngOnInit() {
        this.getProductsPaginated();
    }
    /**
     * get products from the database using the products service
     * when the data is fetched initialize page elements (products, paginator)
     * @author Roxana
     */
    getProductsPaginated() {
        this.updatePaginationInfo();
        this.loaderHidden=false;        
        this._productsService.getProductsPaginated(this.pagination).subscribe(
            data => this.initPageElements(data.json())
        )
    }
     /**
     * this event is triggered when the user changes the filter value
     * @author Roxana
     */
    filterValueChanged($event) {
        let This=this;
        let filterList:Filter[];
        this.filterValue=$event;
        setTimeout(function () {
            filterList=new Array();
            filterList.push(new Filter("nameGenericName", This.filterValue))
            This.pagination.setfilterList(filterList);
            This.loaderHidden=false;
            This.getProductsPaginated();
        }, 2000);
    }

    /**
     * update page, pageSize, sort in the Pagination object according to currentPage, itemsPerPage
     * @author Roxana
     */
    updatePaginationInfo() {
        this.pagination.setPage(this.currentPage);
        this.pagination.setPageSize(this.itemsPerPage);
        this.pagination.setSort(this.sort);
    }
   
    initPageElements(items) {
        this.loaderHidden=true;
        console.log(items);
        //when the component is initialized and the products are retrieved initialize the page paginator
        this.productsToDisplay = items.data;
        this._totalNrOfItems = items.totalRows;

        //calculate the number of pages
        this.calculateNrOfPages();

        //determine the state of the previous and next in the paginator
        this.determineNextPreviousState();
    }
      
    /**
     * this event is triggered when the user changes the number of items per page
     * @author Roxana
     */
    onItemSelectChange($event) {

        //reset the current page
        this.currentPage = 1;

        //update nr of items per page
        this.itemsPerPage = $event;

        //recalculate the number of pages
        this.getProductsPaginated();
    }

    /**
     * calculate the number of pages to display based on the number of items per page and total number of rows
     * @author Roxana
     */
    calculateNrOfPages() {
        //find the number of full pages that will contain exactly itemPerPage products
        let nrOfFullPages = Math.floor(this._totalNrOfItems / this.itemsPerPage);

        //find the number of remaining items which will be displayed on the last page
        let nrOfRemainingItems = this._totalNrOfItems % this.itemsPerPage;
        this.nrOfPages = nrOfFullPages;
        if (nrOfRemainingItems != 0) {
            this.nrOfPages += 1;
        }

        this.setPages();
    }

    /**
     * set the pages that will be displayed in the paginator
     * set class "active" for the current page
     * @author Roxana
     */
    setPages() {
        this.pages = new Array();
        let idx;
        for (let i = 0; i < this.nrOfPages; i++) {
            idx = i + 1;
            //set the class active to the current page
            if (idx == this.currentPage)
                this.pages[i] = { "index": idx, "class": "active" };
            else
                this.pages[i] = { "index": idx, "class": "" };
        }
        console.log(this.pages);
    }


    /**
     * this event is triggered when the user clicks on the paginator
     * selectedPage is the page requested
     * @author Roxana
     */
    changePage($event) {
        let selectedPage=$event.page;
        //let the user change the page only if the nr of the page required is valid
        if (selectedPage > 0 && selectedPage <= this.nrOfPages) {
            this.currentPage = selectedPage;
            this.determineNextPreviousState();
            this.getProductsPaginated();
            this.setPages();
        }
    }

    /**
     * determine the next and previous buttons state
     * @author Roxana
     */
    determineNextPreviousState() {
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
    }
}