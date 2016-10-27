"use strict";
var Alert = (function () {
    function Alert(timeout, dismissable) {
        this.timeout = timeout;
        this.dismissable = dismissable;
        this.message = '';
        this.type = null;
        this.show = false;
    }
    return Alert;
}());
exports.Alert = Alert;
//# sourceMappingURL=alert.model.js.map