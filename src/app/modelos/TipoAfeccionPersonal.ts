export class TipoAfeccionPersonal {    
  activado: boolean=false;

  public codigo: Number;
  public nombre: String;
  public descripcion: String;
  public atencion: Number;

  constructor(codigo: Number, nombre: String, descripcion: String) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

}
