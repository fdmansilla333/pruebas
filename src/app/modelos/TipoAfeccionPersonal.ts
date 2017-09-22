export class TipoAfeccionPersonal {
  public codigo: Number;
  public nombre: String;
  public descripcion: String;

  constructor(codigo: Number, nombre: String, descripcion: String) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

}
