import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanFilterPipe'
})

@Injectable()
export class BooleanFilterPipe implements PipeTransform {
  transform(field: boolean): string {
    if (field) {
      return "Si";
    } else {
      return "No";
    }
  }

}