import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';

import { CacheTestService } from './cacheTest.service';

import { AppService } from '../shared/services/app.service';

@Component({
    moduleId: module.id,
    templateUrl: 'cacheTest.cmp.html',

    encapsulation: ViewEncapsulation.None
})
export class CacheTestCmp implements OnInit {
    testResult: any;
    testResultCached: any;
    initialCacheCleared: boolean;

    bCacheCleared: boolean;

    loadingState: boolean;

    /*--------- Constructor ---------*/
    constructor(
        private _dtService: DTService,
        private _cacheTestService: CacheTestService,
        private _appService: AppService
    ) { }

    /*--------- App logic ---------*/

    /**
     * REST - Testing cache 
     * @author DynTech
     */
    testCacheRest(bCached: boolean) {
        this._dtService.setRestMessageContent('CacheTestCmp', 'testCacheRest()');
        this.loadingState = true;
        this._cacheTestService.testCache().toPromise().then(res => {
            this.bCacheCleared = false;
            this.loadingState = false;

            if (bCached) {
                this.testResultCached.executionDate = new Date();
                this.testResultCached.dataSize = JSON.stringify(res.ErrorLogs).length;
                this.testResultCached.executionTime = res.executeTime;
            } else {
                this.testResult.executionDate = new Date();
                this.testResult.dataSize = JSON.stringify(res.ErrorLogs).length;
                this.testResult.executionTime = res.executeTime;
            }
        }, error => {
            this.loadingState = false;
        });
    }

    /**
     * REST - Clearing cache 
     * @author DynTech
     */
    clearCacheRest() {
        this._dtService.setRestMessageContent('CacheTestCmp', 'clearCacheRest()');
        this.loadingState = true;
        this._cacheTestService.clearCache().toPromise().then(res => {
            this.bCacheCleared = true;
            this.loadingState = false;

            this.initialCacheCleared = true;

            this.resetResult(true);
            this.resetResult(false);
        }, error => {
            this.loadingState = false;
        })
    }

    /*--------- Utility ---------*/
    /**
     * Reset results of the test depending on parameter value 
     * @author DynTech
     */
    resetResult(bCached: boolean) {
        if (bCached) {
            this.testResult = {
                executionDate: 0,
                dataSize: 0,
                executionTime: 0
            }
        } else {
            this.testResultCached = {
                executionDate: 0,
                dataSize: 0,
                executionTime: 0
            }
        }
    }
    /*--------- NG On Init ---------*/
    ngOnInit() {
        // Variables initialization
        this.testResult = {
            executionDate: 0,
            dataSize: 0,
            executionTime: 0
        }

        this.testResultCached = {
            executionDate: 0,
            dataSize: 0,
            executionTime: 0
        }

        this.loadingState = false;

        this.bCacheCleared = true;
        this.initialCacheCleared = false;

        // Construct methods
        this.clearCacheRest();
        this._appService.pageLoaded('Cache test');
    }
}