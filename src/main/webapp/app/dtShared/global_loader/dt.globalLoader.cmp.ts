import { Component, OnInit, Input} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'dt-global-loader',
    templateUrl: 'dt.globalLoader.cmp.html'
})
export class DTGlobalLoaderCmp implements OnInit {
    @Input() loaderCounter: number;
    @Input() loadingMessage: string;
    
    /*--------- Constructor --------*/
    constructor() { }
    
    /*--------- NG On Init ---------*/
    ngOnInit() { 
        this.loaderCounter = 0;
        this.loadingMessage = '';
     }
}