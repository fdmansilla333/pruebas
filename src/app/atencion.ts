export class Atencion {
  public codigo: Number;
  public persona: Number;
  public observacion: String;
  public fecha_atencion: Date;
  public observacion_internacion: String;

  constructor(fecha_atencion: Date, observacion: String, persona: Number, observacion_internacion: String ) {
    this.codigo = null;
    if (fecha_atencion != null) {
      this.fecha_atencion = fecha_atencion;

    } else {
      this.fecha_atencion = new Date();
    }
    if (observacion != null) {
      this.observacion = observacion;
    } else {
      this.observacion = 'Completar observación';
    }
    if (persona != null) {
      this.persona = persona;
    } else {
      this.persona = null;
    }
    if (observacion_internacion != null) {
      this.observacion_internacion = observacion_internacion;
    }else {
      this.observacion_internacion = 'No se encuentra definido';
    }
  }
}
