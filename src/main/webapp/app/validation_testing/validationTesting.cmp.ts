import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ValidationTestingService, } from './validationTesting.service';

import { AppService } from '../shared/services/app.service';

@Component({
    moduleId: module.id,
    templateUrl: 'validationTesting.cmp.html',
    encapsulation: ViewEncapsulation.None
})
export class ValidationTestingCmp implements OnInit {
    public form: FormGroup;
    public fields: any;
    public isError: boolean;

    /*--------- Constructor --------*/
    constructor(
        private formBuilder: FormBuilder,
        private validationService: ValidationTestingService,
        private _appService: AppService
    ) { }
    
    /*--------- App logic --------*/
    submit(form: FormGroup) {
        let obj = {
            formName: "ImeForme",
            fields: form.value
        }
        this.validationService.testException(obj).toPromise().then(
            (res) => {
                this.fields = [];
            }
        ).catch(
            (err) => {
                let data = err.json();
                this.fields = data.fields;
            }
            );
    }

    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Variable initialization
        this.fields = [];
        
        // Methods execution
        this.form = this.formBuilder.group({
            firstName: ["M", [Validators.required]],
            age: [1, [Validators.required]]
        });

        this._appService.pageLoaded('Validation testing');
    }
}