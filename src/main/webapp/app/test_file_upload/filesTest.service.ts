import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Http, Response,ResponseType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class TestFilesService{
    private _baseUrl:string="rest/";
    constructor(private _http:Http){};
    getAllFiles(): Observable<any>{
        return this._http.get(this._baseUrl + 'getFiles')
            .map((response: Response) => response.json())
            .do(data=>console.log(JSON.stringify(data)))
            .catch(this.handleError);
    }
    downloadFile(id:number):Observable<any>{
         return this._http.get(this._baseUrl + 'downloadFile/'+id)
            .map((response: Response) => this.handleResponse(response))
            .do(data=>data=data)
            .catch(this.handleError);
    }

    handleResponse(response:Response){
        let contentType=response.headers.get("content-type");
        console.log(response.arrayBuffer());
        return new Blob([response.text()],{type : contentType});
    }
     //error handler method
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error|| 'Server error');
    }
}