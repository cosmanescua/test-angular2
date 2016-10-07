import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Http, Response,ResponseType,ResponseContentType} from '@angular/http';
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
    downloadFile(id:number):any{

         return this._http.get(this._baseUrl + 'downloadFileOk/'+id,{responseType: ResponseContentType.Blob})
            .map((response) => this.handleResponse(response))
            .catch(this.handleError);
    }

    //this throws error "The request body isn't either a blob or an array buffer"
    handleResponse(response){
        let contentType=response.headers.get("content-type");
       // console.log(response.arrayBuffer());
        console.log(contentType);
        console.log(response.blob());
       return new Blob([response.blob()],{type : contentType});
    }
     //error handler method
    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error|| 'Server error');
    }
}