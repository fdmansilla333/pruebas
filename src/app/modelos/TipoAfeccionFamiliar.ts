export class TipoAfeccionFamiliar {
  public codigo: Number;
  public nombre: String;
  public descripcion: String;

  constructor(codigo: Number, nombre: String, descripcion: String) {
    //TODO @Damian controlar la carga en el constructor
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

}
