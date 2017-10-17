import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
/**
 * Filtro de busqueda
 */
@Injectable()
export class SearchFilterPipe implements PipeTransform {
  /**
   * Metodo que utiliza un pipe para filtrar a traves una coleccion de items
   * @param items coleccion de items
   * @param field nombre del campo que sirve para filtrar
   * @param value valor de filtrado
   * @param canMinima cantidad minima necesaria para comenzar el filtrado
   */
  transform(items: any[], field: string, value: string, canMinima: Number): any[] {
    if (!items) return [];
    if (value.length < canMinima) return [];
    return items.filter(it => {
      
      return it[field].indexOf(value.toUpperCase()) ==0;
    }
    ); /// == value
  }

}