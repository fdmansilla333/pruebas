/**
 * Modelo de datos Persona
 */
import { Localidad } from './Localidad';
import { Parentesco } from './Parentesco';
import { TipoDocumento } from './TipoDocumento';
import { ObraSocial } from './ObraSocial';
import { Pais } from './Pais';
import { Afiliado } from './Afiliado';

export class Persona {
  nombre: String = '';
  numero_documento: Number = 0;
  codigo: Number = 0;
  cuit_cuil: Number = 0;
  dpersonal_calle: String = '';
  dpersonal_codigo_pos: String = '';
  dpersonal_email: String = '';
  dpersonal_numero: String = '';
  sexo: String = '';
  fecha_nacimiento: Date;
  localidad_nacimiento: Number;
  nacionalidad: Number;
  obra_social: Number;
  fecha_ultima_vigencia: Date;
  parentesco: Number;
  dpersonal_localidad: Number;
  dpersonal_telefono: String;
  dpersonal_telefono_codigo_area: Number;
  dpersonal_telefono_movil_codigo_area: Number;
  dpersonal_telefono_movil_numero: Number;
  tipo_documento: Number;
  datos_localidad: Localidad;
  datos_parentesco: Parentesco;
  datos_tipoDocumento: TipoDocumento;
  datos_obra_social: ObraSocial;
  datos_nacionalidad: Pais;
  afiliado: Afiliado;

  constructor(

  ) { }


}
