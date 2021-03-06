/**
 * Modelo de datos antecedentes perinatologicos
 */
export class AntecedentePerinatologico {
  public codigo: Number;
  public atencion: Number;
  public controles_adecuados_embarazo: boolean =false;
  public edad_gestacional: Number;
  public grupo_y_factor: String;
  public internacion: boolean;
  public lugar_de_parto: String='';
  public motivo_terminacion: String='';
  public nacimiento_multiple: boolean=false;
  public otoemisiones_acusticas: boolean=false;
  public otoemisiones_acusticas_resultado: boolean=false;
  public perimetro_cefalico: Number;
  public peso: Number;
  public pesquisa_enf_congenitas_metabolicas: boolean;
  public pesquisa_enf_congenitas_metabolicas_resultado: boolean;
  public talla: Number;
  public test_apgar: Number;
  public test_apgar2: Number;
  public tipo_presentacion: Number;
  public tipo_terminacion: Number;

  public descripcion_tipo_presentacion: String = '';
  public descripcion_tipo_terminacion: String = '';

  constructor() {
  }

}
