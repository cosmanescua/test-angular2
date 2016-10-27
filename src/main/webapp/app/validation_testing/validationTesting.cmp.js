"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var validationTesting_service_1 = require('./validationTesting.service');
var app_service_1 = require('../shared/services/app.service');
var ValidationTestingCmp = (function () {
    /*--------- Constructor --------*/
    function ValidationTestingCmp(formBuilder, validationService, _appService) {
        this.formBuilder = formBuilder;
        this.validationService = validationService;
        this._appService = _appService;
    }
    /*--------- App logic --------*/
    ValidationTestingCmp.prototype.submit = function (form) {
        var _this = this;
        var obj = {
            formName: "ImeForme",
            fields: form.value
        };
        this.validationService.testException(obj).toPromise().then(function (res) {
            _this.fields = [];
        }).catch(function (err) {
            var data = err.json();
            _this.fields = data.fields;
        });
    };
    /*--------- NG On Init ---------*/
    ValidationTestingCmp.prototype.ngOnInit = function () {
        // Variable initialization
        this.fields = [];
        // Methods execution
        this.form = this.formBuilder.group({
            firstName: ["M", [forms_1.Validators.required]],
            age: [1, [forms_1.Validators.required]]
        });
        this._appService.pageLoaded('Validation testing');
    };
    ValidationTestingCmp = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'validationTesting.cmp.html',
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, validationTesting_service_1.ValidationTestingService, app_service_1.AppService])
    ], ValidationTestingCmp);
    return ValidationTestingCmp;
}());
exports.ValidationTestingCmp = ValidationTestingCmp;
//# sourceMappingURL=validationTesting.cmp.js.map