System.register(['@angular/core', 'ng2-file-upload'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, ng2_file_upload_1;
    var URL, SimpleDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_file_upload_1_1) {
                ng2_file_upload_1 = ng2_file_upload_1_1;
            }],
        execute: function() {
            URL = '/api/';
            //const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
            SimpleDemoComponent = (function () {
                function SimpleDemoComponent() {
                    this.uploader = new ng2_file_upload_1.FileUploader({ url: URL });
                    this.hasBaseDropZoneOver = false;
                    this.hasAnotherDropZoneOver = false;
                }
                SimpleDemoComponent.prototype.fileOverBase = function (e) {
                    this.hasBaseDropZoneOver = e;
                };
                SimpleDemoComponent.prototype.fileOverAnother = function (e) {
                    this.hasAnotherDropZoneOver = e;
                };
                SimpleDemoComponent = __decorate([
                    core_1.Component({
                        selector: 'simple-demo',
                        template: 'app/test_file_upload/fileUpload.cmp.html',
                    }), 
                    __metadata('design:paramtypes', [])
                ], SimpleDemoComponent);
                return SimpleDemoComponent;
            }());
            exports_1("SimpleDemoComponent", SimpleDemoComponent);
        }
    }
});
//# sourceMappingURL=fileUpload.cmp.js.map