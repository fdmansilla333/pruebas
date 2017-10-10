import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter2'
})

@Injectable()
export class SearchFilter2Pipe implements PipeTransform {
  transform(items: any[], field: string, field2: string, value: string, canMinima: Number): any[] {
    if (!items) return [];
    if (value.length < canMinima) return [];
    return items.filter(it => {
      
      return it[field].indexOf(value.toUpperCase()) ==0 || it[field2].indexOf(value.toUpperCase())==0;
    }
    ); /// == value
  }

}