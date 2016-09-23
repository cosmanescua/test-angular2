import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'keysPipe'
})
export class KeysPipe implements PipeTransform {
    transform(value, columnHeaders: any[]) : any[] {
        let keys = [];
        for (let key in value) {
            INNERLOOP: for(let header in columnHeaders) {
                if(columnHeaders[header].key==key) {
                    keys.push({key: key, value: value[key]});
                    break INNERLOOP;
                }
            }
        }
        return keys;
    }
}