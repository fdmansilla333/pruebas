/**
 * Modelo de datos tipo afeccion personal
 */
export class TipoAfeccionPersonal {      
  codigoAntecedentePersonal: any;

  activado: boolean=false;

  public codigo: Number;
  public nombre: String;
  public descripcion: String;
  public atencion: Number;
  public posee: boolean = false; //sirve para identificar internamente si se encontraba marcado o desmarcado.
  public observacion: String;

  constructor(codigo: Number, nombre: String, descripcion: String) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

}
