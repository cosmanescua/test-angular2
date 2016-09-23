System.register(['@angular/router', '../admin-create_report/adminCreateReport.cmp'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var router_1, adminCreateReport_cmp_1;
    var ROUTING;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (adminCreateReport_cmp_1_1) {
                adminCreateReport_cmp_1 = adminCreateReport_cmp_1_1;
            }],
        execute: function() {
            exports_1("ROUTING", ROUTING = router_1.RouterModule.forChild([
                {
                    path: '',
                    component: adminCreateReport_cmp_1.AdminCreateReportCmp
                }
            ]));
        }
    }
});
//# sourceMappingURL=adminCreateReport.routes.js.map