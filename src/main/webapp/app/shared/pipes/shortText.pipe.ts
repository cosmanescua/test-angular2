import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortText'
})

export class ShortTextPipe implements PipeTransform {
    transform(value: any, sliceNumber: number, sufix: string): any {

        return value.slice(0, sliceNumber) + sufix;
    }
}