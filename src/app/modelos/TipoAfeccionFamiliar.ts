/**
 * Modelo de datos tipo afeccion familiar
 */
export class TipoAfeccionFamiliar {
  public atencion: Number;
  public codigo: Number; //se refiere al codigo de la afeccion y no del antecedente
  public nombre: String;
  public descripcion: String;
  public activado: boolean;
  public posee: boolean=false;
  public observacion: String;

  codigoAntecedenteFamiliar: any;

  constructor(codigo: Number, nombre: String, descripcion: String) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

}
