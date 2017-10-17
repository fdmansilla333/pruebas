import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter2'
})
/**
 * Filtro para busquedas
 */
@Injectable()
export class SearchFilter2Pipe implements PipeTransform {
  /**
   * Metodo que utiliza un pipe para filtrar a traves una coleccion de items
   * @param items coleccion de datos
   * @param field campo que sirve para filtrar (source)
   * @param field2 Segundo campo que sirve para filtrar  (source2)
   * @param value valor a filtrar sobre los campos
   * @param canMinima valor entero minimo necesario para empezar a filtrar
   */
  transform(items: any[], field: string, field2: string, value: string, canMinima: Number): any[] {
    if (!items) return [];
    if (value.length < canMinima) return [];
    return items.filter(it => {
      
      return it[field].indexOf(value.toUpperCase()) ==0 || it[field2].indexOf(value.toUpperCase())==0;
    }
    ); 
  }

}