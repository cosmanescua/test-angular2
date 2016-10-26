import {Component,OnInit}  from '@angular/core';
import {Product} from './product.model';
import {ProductsService} from './products.service';
@Component({
    templateUrl: 'app/test_products/products.component.html'
})
export class ProductsComponent implements OnInit
{
    //all products
    products: Product[];

    //products to diplay on the page
    productsToDisplay:Product[];

    //nr of items diplayed per page
    itemsPerPage:number=5;
    nrOfPages:number=0;
    currentPage:number=1;

    //flags used to prevent user to click on previous or next when these pages don't exist
    displayPreviousBtn=false;
    displayNextBtn=false;

    //set to disabled when the previous and next have to be disabled
    prevBtnClass="";
    nextBtnClass="";

    //the pages displayed in the paginator
    pages:any[];
    private _totalNrOfItems:number=0;

    //used to establish the which products have to be dispalyed according to the selectedPage
    from:number;
    to:number;

    constructor(private _productsService: ProductsService){}
    ngOnInit(){
        this.getAllProducts();
    }
    getAllProducts()
    {
        this._productsService.getProducts().subscribe(
            data=>this.initPageElements(data.json())
        )
    }
    initPageElements(items)
    {
        //when the component is initialized and the products are retrieved initialized the page paginator
        this.products=items;
        this._totalNrOfItems=this.products.length;

        //calculate the number of pages
        this.calculateNrOfPages();

        //determine which products must be displayed according to the number if items per page
        this.determineProductsToDisplay();

        //determine the state of the previous and next in the paginator
        this.determineNextPreviousState();
    }

    //this event is generated when the user changes the number of items per page
    onItemSelectChange($event){

        //reset the current page
        this.currentPage=1;

        //update nr of items per page
        this.itemsPerPage=$event;

        //recalculate the number of pages
        this.calculateNrOfPages();

        this.determineProductsToDisplay();
        this.determineNextPreviousState();
       
    }

    //calculate the number of pages to display
    calculateNrOfPages()
    {
        //find the number of full pages that will contain exactly itemPerPage products
        let nrOfFullPages=Math.floor(this._totalNrOfItems/this.itemsPerPage);

        //find the number of remaining items which will be displayed on the last page
        let nrOfRemainingItems=this._totalNrOfItems%this.itemsPerPage;
        this.nrOfPages=nrOfFullPages;
        if(nrOfRemainingItems!=0)
        {
            this.nrOfPages+=1;
        }
       
        this.setPages();
    }

    //set the pages that will be displayed in the paginator
    setPages()
    {
        this.pages=new Array();
        let idx;
        for(let i=0;i< this.nrOfPages; i++)
        {
            idx=i+1;
            //set the class active to the current page
            if(idx==this.currentPage)
                this.pages[i]={"index": idx, "class": "active"};
            else
                this.pages[i]={"index": idx, "class": ""};
        }
        console.log(this.pages);
    }

    //this event is triggered when the user clicks on the paginator
    changePage(selectedPage)
    {

        //let the user change the page only if the nr of the page required is valid
        if(selectedPage>0 && selectedPage<=this.nrOfPages)
        {
            this.currentPage=selectedPage;
            this.determineNextPreviousState();
            this.determineProductsToDisplay();
            this.setPages();
        }
    }

    //determine the next and previous buttons state
    determineNextPreviousState()
    {
        this.displayPreviousBtn=true;
        this.displayNextBtn=true;
        this.prevBtnClass="";
        this.nextBtnClass="";

        //disable previous button when the current page is the first one
        if(this.currentPage==1)
        {
            this.displayPreviousBtn=false;
            this.prevBtnClass="disabled";
        }
        //disable previous button when the current page is the last one
        if(this.currentPage==this.nrOfPages)
        {
            this.displayNextBtn=false;
            this.nextBtnClass="disabled";
        }
    }
    //determine which products to display on the page
    //this method will be replaced with a call to the ProductsService with the parameters from and to (in order to get the data from the DB)
    determineProductsToDisplay()
    {
        this.productsToDisplay=new Array();
        this.from=(this.currentPage-1)*this.itemsPerPage;
        this.to=(this.currentPage*this.itemsPerPage)-1;
        let idx=0;
        for(let i=this.from; i<= this.to && i<this._totalNrOfItems;i++ )
        {
            this.productsToDisplay[idx]=this.products[i];
            idx++;
        }
    }
}