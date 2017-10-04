export class TipoAntecedenteSiniestro {
  public codigo: Number;
  public descripcion: String;
  public fecha: Date;
  public motivo: string;
  public atencion: Number;
  public tipo_antecedente_siniestro : Number;

  constructor(fecha, motivo, atencion, tipo_siniestro) {
    this.fecha = fecha;
    this.motivo = motivo;
    this.atencion = atencion;
    this.tipo_antecedente_siniestro = tipo_siniestro;
  }

}
