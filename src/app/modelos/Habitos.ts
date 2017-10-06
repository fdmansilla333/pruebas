import {TipoHabito} from './TipoHabito';
export class Habitos {
  codigo: Number;
  tipo_habito: Number;
  atencion: Number;
  observacion: String;
  cantidad: Number;
  tipo_habito_dato;
  constructor(codigo: Number, habito: Number, atencion: Number, observacion: String, cantidad: Number, datosTipoHabito: TipoHabito) {
    this.atencion = atencion;
    this.cantidad = cantidad;
    this.tipo_habito = habito;
    this.observacion = observacion;
    this.tipo_habito_dato = datosTipoHabito;
   }
}
