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

    itemsPerPage=5;
    currentPage: number = 1;

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
     * this event is triggered when the user clicks on the paginator
     * selectedPage is the page requested
     * @author Roxana
     */
    changePage($event) {
        let selectedPage=$event.page;
        this.currentPage = $event.page;
        this.getProductsPaginated();
    }
}