/**
 * Modelo de datos medicamento alergia
 */
export class MedicamentoAlergia {
  public codigo: Number;
  public atencion: Number; 
  public descripcion: String; 
  public droga: Number;
public drogaDescripcion: Number;
  constructor(
     codigo: Number, 
     atencion: Number, 
     descripcion: String, 
     droga: Number, 
     drogaDescripcion: Number) {

      this.codigo = codigo;
      this.atencion = atencion;
      this.descripcion = descripcion;
      this.droga = droga;
      this.drogaDescripcion = drogaDescripcion;
     }
}
