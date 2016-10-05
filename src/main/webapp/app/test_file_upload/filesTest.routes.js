System.register(['@angular/router', '../test_file_upload/filesTest.cmp'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, filesTest_cmp_1;
    var ROUTING;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (filesTest_cmp_1_1) {
                filesTest_cmp_1 = filesTest_cmp_1_1;
            }],
        execute: function() {
            exports_1("ROUTING", ROUTING = router_1.RouterModule.forChild([
                {
                    path: '',
                    component: filesTest_cmp_1.TestFilesCmp
                }
            ]));
        }
    }
});
//# sourceMappingURL=filesTest.routes.js.map