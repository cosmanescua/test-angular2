import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Product} from './product.model';
@Injectable()
export class ProductsService{
    private baseUri="app/test_products/api/products.json";
    constructor(private _http:Http){}
        getProducts(){
            return this._http.get(this.baseUri);
        }
}