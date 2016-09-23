import { Component, Inject, EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    private defaultAppTitle: string;

    titleChanged = new EventEmitter();

    constructor(){
        this.defaultAppTitle = 'KFuture | ';
    }

    /**
     * Get default app title prefix
     * @author DynTech
     */
    getDefaultAppTitle(): string {
        return this.defaultAppTitle;
    }
    
    /**
     * Set default app title prefix
     * @author DynTech
     */
    setDefaultAppTitle(title: string): void {
        this.defaultAppTitle = title;
    }


    langChange(lang: string): void {
        console.log('service exe');
        
        this.titleChanged.emit(lang);
    }
}