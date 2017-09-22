import {TipoHabito} from './TipoHabito';
export class Habitos {
  codigo: Number;
  tipo_habito: Number;
  atencion: Number;
  observacion: String;
  cantidad: Number;
  tipo_habito_dato: TipoHabito;
  constructor(codigo: Number, habito: Number, atencion: Number, observacion: String, cantidad: Number) { }
}
