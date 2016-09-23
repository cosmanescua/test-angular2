System.register(['@angular/core', 'ng2-translate/ng2-translate', '../shared/services/app.service'], function(exports_1, context_1) {
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
    var core_1, ng2_translate_1, app_service_1;
    var NavCmp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_translate_1_1) {
                ng2_translate_1 = ng2_translate_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            }],
        execute: function() {
            // import { LoginCmp } from '../login/login.cmp';
            NavCmp = (function () {
                function NavCmp(translate, _appService) {
                    this._appService = _appService;
                    this.onTranslationChange = new core_1.EventEmitter();
                    translate.setDefaultLang('prevod1');
                    // the lang to use, if the lang isn't available, it will use the current loader to get them
                    translate.use('prevod1');
                }
                NavCmp.prototype.promenaJezika = function () {
                    this.onTranslationChange.emit();
                };
                NavCmp.prototype.ngOnInit = function () {
                    // console.log('NG on init');
                    // this._appService.titleChanged.subscribe(lang => console.log(lang));
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], NavCmp.prototype, "onTranslationChange", void 0);
                NavCmp = __decorate([
                    core_1.Component({
                        selector: 'navigation-menu',
                        templateUrl: 'app/common/nav.cmp.html',
                    }), 
                    __metadata('design:paramtypes', [ng2_translate_1.TranslateService, app_service_1.AppService])
                ], NavCmp);
                return NavCmp;
            }());
            exports_1("NavCmp", NavCmp);
        }
    }
});
//# sourceMappingURL=nav.cmp.js.map