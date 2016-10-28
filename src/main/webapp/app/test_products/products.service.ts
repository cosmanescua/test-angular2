import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Product} from './product.model';
import {Pagination} from '../dtShared/table/dt.pagination.model';
@Injectable()
export class ProductsService{
    private baseUri="products?pagination=";
    constructor(private _http:Http){}
        getProductsPaginated(pag:Pagination){
            return this._http.get(this.baseUri+JSON.stringify(pag));
        }
}