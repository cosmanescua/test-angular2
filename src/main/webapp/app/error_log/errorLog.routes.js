"use strict";
var router_1 = require('@angular/router');
var errorLog_cmp_1 = require('./errorLog.cmp');
var errorLogTrace_cmp_1 = require('./errorLogTrace.cmp');
exports.ROUTING = router_1.RouterModule.forChild([
    {
        path: '',
        component: errorLog_cmp_1.ErrorLogCmp
    },
    {
        path: ':id',
        component: errorLogTrace_cmp_1.ErrorLogTraceCmp
    }
]);
//# sourceMappingURL=errorLog.routes.js.map