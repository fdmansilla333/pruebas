import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string, canMinima: Number): any[] {
    if (!items) return [];
    if (value.length < canMinima) return [];
    return items.filter(it => {
      
      return it[field].indexOf(value.toUpperCase()) ==0;
    }
    ); /// == value
  }

}