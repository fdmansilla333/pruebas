export class AntecedenteFamiliar {
  public codigo: Number;
  public persona: Number;
  public observacion: String;
  public fecha_atencion: Date;
  public observacion_internacion: String;
  public tipo_afeccion_familiar: Number;

  // completar modelo de antecedentes familiares.
  constructor(codigo: Number, persona: Number, observacion: String, fecha_atencion: Date, observacion_internacion: String) {
    this.codigo = codigo;
    this.fecha_atencion = fecha_atencion;
    this.observacion = observacion;
    this.observacion_internacion = observacion_internacion;
  }
  getCodigoAntecedenteFamiliar() {
    return this.codigo;
  }

  getPersonaAntecedenteFamiliar() {
    return this.persona;
  }
  getObservacionAntecedenteFamiliar() {
    return this.observacion;
  }
  getFecha_atencionAntecedenteFamiliar() {
    return this.fecha_atencion;
  }
  getObservacion_internacionAntecedenteFamiliar() {
    return this.observacion_internacion;
  }
}
