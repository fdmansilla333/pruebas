import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanFilterPipe'
})
/**
 * Metodo que sirve para filtrar un valor booleano
 */
@Injectable()
export class BooleanFilterPipe implements PipeTransform {
  /**
   * Transforma un valor booleano (true, false) a --> (Si, No)
   * @param field 
   */
  transform(field: boolean): string {
    if (field) {
      return "Si";
    } else {
      return "No";
    }
  }

}