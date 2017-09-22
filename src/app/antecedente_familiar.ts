export class AntecedenteFamiliar {
  public observacion: string;
  public atencion: number;
  public tipo_afeccion_familiar: number;
  public nombre_afeccion: string;
  public descripcion_afeccion: string;


  constructor(tipo_afeccion_familiar, observacion, atencion) {
    if (atencion) {
      this.atencion = atencion;
    } else {
      this.atencion = null;
    }
    if (observacion) {
      this.observacion = observacion;
    } else {
      this.observacion = 'Ingresar una observacion';
    }
    if (tipo_afeccion_familiar) {
      this.tipo_afeccion_familiar = tipo_afeccion_familiar;

    } else {
      this.tipo_afeccion_familiar = null;
    }

  }

}
