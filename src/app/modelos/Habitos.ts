/**
 * Modelo de datos Habito
 */
import {TipoHabito} from './TipoHabito';
export class Habitos {
  codigo: Number;
  tipo_habito: Number;
  atencion: Number;
  observacion: String;
  cantidad: Number;
  unidad: String;
  tipo_habito_dato: TipoHabito
  constructor(codigo: Number, habito: Number, atencion: Number, observacion: String, cantidad: Number, unidad: String, datosTipoHabito: TipoHabito) {
    this.atencion = atencion;
    this.cantidad = cantidad;
    this.tipo_habito = habito;
    this.observacion = observacion;
    this.unidad = unidad;
    this.tipo_habito_dato = datosTipoHabito;
   }
}
