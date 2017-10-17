/**
 * Modelo de datos siniestro
 */
export class Siniestro {
  public codigo: Number;
  public motivo: String;
  public fecha: Date;
  public observacion: String;
  public tipoSiniestro: Number;
  public nombreTipoSiniestro: String;

  constructor(codigo: Number, nombre: String) {
  }

}
