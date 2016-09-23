System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ValidationService;
    return {
        setters:[],
        execute: function() {
            ValidationService = (function () {
                function ValidationService() {
                }
                /**
                 * Get error message according to validation type
                 * @Author DynTech
                 */
                ValidationService.getValidatorErrorMessage = function (validatorName, validatorValue) {
                    //console.log('Validator name: ' +validatorName)
                    var config = {
                        'required': 'Required',
                        'validateMin': 'Value is less than min limit',
                        'validateMax': 'Value is more than max limit',
                        'minlength': 'Minimum length',
                        'maxlength': 'Max length'
                    };
                    return config[validatorName];
                };
                /**
                 * Validate min value of number
                 * @Author DynTech
                 */
                ValidationService.validateMin = function (min, formControl) {
                    //console.log('validateMin: ' + min + '-' + parseInt(formControl.value));
                    if (!((parseInt(formControl.value) >= min))) {
                        return { validateMin: (parseInt(formControl.value) >= min) };
                    }
                };
                /**
                 * Validate max value of number
                 * @Author DynTech
                 */
                ValidationService.validateMax = function (max, formControl) {
                    //console.log('validateMin: ' + max + '-' + parseInt(formControl.value));
                    if (!((parseInt(formControl.value) <= max))) {
                        return { validateMax: (parseInt(formControl.value) <= max) };
                    }
                };
                return ValidationService;
            }());
            exports_1("ValidationService", ValidationService);
        }
    }
});
//# sourceMappingURL=validation.service.js.map