import { Component, OnInit } from '@angular/core';

import { DTViewCmpIf } from '../dtShared/dt.viewCmpIF';
import { DTService } from '../dtShared/dt.service';

import { CacheTestService } from './cacheTest.service';

@Component({
    moduleId: module.id,
    templateUrl: 'cacheTest.cmp.html'
})
export class CacheTestCmp implements OnInit, DTViewCmpIf {
    testResult: any;
    testResultCached: any;
    initialCacheCleared: boolean;

    bCacheCleared: boolean;

    loadingState: boolean;

    /*--------- Constructor ---------*/
    constructor(
        private _dtService: DTService,
        private _cacheTestService: CacheTestService
    ) { }

    /*--------- App logic ---------*/

    /**
     * REST - Testing cache 
     * @author DynTech
     */
    testCacheRest(bCached: boolean) {
        this._dtService.setRestMessageContent('CacheTestCmp', 'testCacheRest()');
        this.loadingState = true;
        this._cacheTestService.testCache().subscribe(result => {
            this.bCacheCleared = false;
            this.loadingState = false;

            if (bCached) {
                this.testResultCached.executionDate = new Date();
                this.testResultCached.dataSize = JSON.stringify(result.ErrorLogs).length;
                this.testResultCached.executionTime = result.executeTime;
            } else {
                this.testResult.executionDate = new Date();
                this.testResult.dataSize = JSON.stringify(result.ErrorLogs).length;
                this.testResult.executionTime = result.executeTime;
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
        this._cacheTestService.clearCache().subscribe(result => {
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
        this.__setInitPageTitle('Cache Test');

        this.clearCacheRest();
    }

    /*--------- Interface imported --------*/

    __setInitPageTitle(title: string) {
        this._dtService.setPageTitle(title);
    }
}