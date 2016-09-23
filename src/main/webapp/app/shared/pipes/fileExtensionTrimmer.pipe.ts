import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimExtension'
})

export class FileExtensionTrimmer implements PipeTransform {
    transform(value: any, args: any[]): any {
        return value.split('.')[0];
    }
}