import { FormControl } from '@angular/forms';

export class ValidationService {
    /**
     * Get error message according to validation type 
     * @author DynTech
     */
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any): string {
        //console.log('Validator name: ' +validatorName)

        let config = {
            'required': 'Required',
            'validateMin': 'Value is less than min limit',
            'validateMax': 'Value is more than max limit',
            'minlength': 'Minimum length',
            'maxlength': 'Max length'
        };

        return config[validatorName];
    }


    /**
     * Validate min value of number
     * @author DynTech
     */
    static validateMin(min: number, formControl: FormControl): Object {
        //console.log('validateMin: ' + min + '-' + parseInt(formControl.value));
        
        if(!((parseInt(formControl.value) >= min))){
            return { validateMin: (parseInt(formControl.value) >= min) };
        }
    }

    /**
     * Validate max value of number
     * @author DynTech
     */
    static validateMax(max: number, formControl: FormControl): Object {
        //console.log('validateMin: ' + max + '-' + parseInt(formControl.value));

        if(!((parseInt(formControl.value) <= max))){
            return { validateMax: (parseInt(formControl.value) <= max) };
        }

    }
}