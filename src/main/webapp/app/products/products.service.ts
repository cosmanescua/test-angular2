import { Injectable } from '@angular/core';

import { Headers, RequestOptions } from '@angular/http';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Pagination } from '../dtShared/table/dt.pagination.model';

@Injectable()
export class ProductsService {

    constructor(private _http: Http) { }

    getProducts(pagination: Pagination): Observable<any> {
        let encodedQueryTemp = encodeURI(JSON.stringify(pagination));

        return this._http.get('products?pagination=' + encodedQueryTemp)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);

        return Observable.throw(error.json().error || 'Server error');
    }

}