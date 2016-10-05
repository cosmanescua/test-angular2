import {Component,OnInit} from '@angular/core';
import {FileUploader, FileSelectDirective, FileDropDirective} from 'ng2-file-upload';
import { CookieService } from 'angular2-cookie/core';
import {TestFile} from './filesTest.model';
import {TestFilesService} from './filesTest.service';
 const URL = 'rest/testFileUpload';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  templateUrl: 'app/test_file_upload/filesTest.cmp.html'
})
export class TestFilesCmp implements OnInit {
  files: TestFile[];
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean = false;
  hasAnotherDropZoneOver:boolean = false;
  private _token:String;

constructor(private _cookieService:CookieService,
            private _testFileService: TestFilesService
){
  this.uploader=new FileUploader({url: URL, authToken : this._cookieService.get('X-Auth-Token')});
  this._token=this._cookieService.get('X-Auth-Token');
  this.uploader.onSuccessItem=function(){
   console.log("upload success")
  }
}
 fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  ngOnInit(){
      this.getAllFiles();
  }
  getAllFiles(){
     this._testFileService.getAllFiles().subscribe(
        files=> this.files=files,
        function(error){console.log(error)},
        function(){
            console.log("getAllFiles complete");     
        });
  }
  //not working
  downloadFile(file){
      this._testFileService.downloadFile(file.id).subscribe(
        function(data){
          let a = $("<a style='display: none;'/>");
          let url = window.URL.createObjectURL(data);
          a.attr("href", url);
          a.attr("download",file.filename);
          $("body").append(a);
          a[0].click();
          window.URL.revokeObjectURL(url);
          a.remove();},
        function(error){console.log(error)},
        function(){
            console.log("download completed");     
        })
  }
  getToken(){
    return this._token;
  }
}