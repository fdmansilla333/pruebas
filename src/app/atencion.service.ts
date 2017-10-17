import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Atencion } from './atencion';
import { Persona } from './modelos/Persona';
import { Afiliado } from './modelos/Afiliado';
import { Observable } from "rxjs/Observable";
import { Localidad } from "./modelos/Localidad";
import { ObraSocial } from "./modelos/ObraSocial";
import { Pais } from "./modelos/Pais";
import { Parentesco } from "./modelos/Parentesco";
import { TipoDocumento } from "./modelos/TipoDocumento";
import { Tipo_presentacion } from './modelos/Tipo_presentacion';
import { Tipo_terminacion } from './modelos/Tipo_terminacion';
import { HttpClient } from "@angular/common/http";
import { EvolucionAmbulatoria } from "./modelos/EvolucionAmbulatoria";
import { AntecedentePerinatologico } from "./modelos/AntecedentePerinatologico";
import { Diagnostico } from "./modelos/Diagnostico";

/**
 * Clase Servicio de atencion
 */
@Injectable()
export class AtencionService {

  private atencionURL: string;
  private atencion: Promise<[Atencion]>;
  public codigoPersonaConsultado: Number;
  constructor(private http: Http, private http2: HttpClient) { }

  /**
   * Devuelve las atenciones
   */
  getAtencion(): Promise<Atencion[]> {
    return this.http.get(this.atencionURL)
      .toPromise()
      .then(response => response.json() as Atencion[])
      .catch(this.handleError);
  }
/**
 * Devuelve el codigo de la persona a partir del codigo de seros te cuida
 * @param URL 
 * @param codigoseros 
 */
  getPersona(URL: string, codigoseros: Number): any {
    let persona: Number;
    let serosTeCuidaPersona;
    return this.http.get(URL + '/seros_te_cuida_persona/' + codigoseros)
      .map(res => res.json());
  }

  /**
   * Devuelve las atenciones que posee una persona
   * @param URL 
   * @param persona codigo de la relacion persona
   */
  getAtenciones(URL: string, persona: Number): Observable<Atencion[]> {
    return this.http.get(URL + '/atencion?persona=' + persona)
      .map(res => res.json());
  }

  /**
   * Devuelve los datos de una persona
   * @param URL 
   * @param persona codigo de la persona en la relacion Public.Persona
   */
  getDatosPersona(URL: string, persona: Number): Observable<Persona> {
    if (persona == undefined) {
      return null; // TODO ver de asignarlo a otra variable
    }
    return this.http.get(URL + '/persona/' + persona)
      .map(res => res.json());
  }

  /**
   * Devuelve los datos de una persona a traves del DNI
   * @param URL 
   * @param dni numero de documento
   */
  getDatosPersonaPorDni(URL: string, dni: Number): Observable<Persona> {
    return this.http.get(URL + '/persona?dni=' + dni)
      .map(res => res.json());
  }

  /**
   * Devuelve los datos del afiliado a traves del DNI
   * @param URL 
   * @param dni 
   */
  getDatosAfiliado(URL: string, dni: Number): Observable<Afiliado> {
    return this.http.get(URL + '/afiliado?dni=' + dni)
      .map(res => res.json());

  }

  /**
   * Devuelve la localidad, a traves del codigo
   * @param URL 
   * @param codigo codigo de la relacion Localidad
   */
  getLocalidad(URL: string, codigo: Number): Observable<Localidad> {
    return this.http.get(URL + '/localidad/' + codigo)
      .map(res => res.json());
  }

  /**
   * Devuelve la obra social
   * @param URL 
   * @param codigo codigo identificatorio de la relacion obra social
   */
  getObraSocial(URL: string, codigo: Number): Observable<ObraSocial> {
    return this.http.get(URL + '/obra_social/' + codigo)
      .map(res => res.json());
  }

  /**
   * Devuelve el Pais a traves del codigo
   * @param URL 
   * @param codigo codigo identificatorio del pais
   */
    getPais(URL: string, codigo: Number): Observable<Pais> {
    return this.http.get(URL + '/pais/' + codigo)
      .map(res => res.json());
  }

  /**
   * Devuelve el parentesco a traves del codigo
   * @param URL 
   * @param codigo 
   */
  getParentesco(URL: string, codigo: Number): Observable<Parentesco> {
    return this.http.get(URL + '/parentesco/' + codigo)
      .map(res => res.json());
  }
/**
 * devuelve el tipo de documento a traves del codigo
 * @param URL 
 * @param codigo 
 */
  getTipoDocumento(URL: string, codigo: Number): Observable<TipoDocumento> {
    return this.http.get(URL + '/tipo_documento/' + codigo)
      .map(res => res.json());
  }

  /**
   * Devuelve el afiliado a traves del DNI
   * @param URL 
   * @param dni numero de documento
   */
  getAfiliado(URL: string, dni: Number): Observable<Afiliado> {
    return this.http.get(URL + '/afiliado?dni=' + dni)
      .map(res => res.json());
  }

  /**
   * Metodo para atrapar errores lanzandos a la hora de hacer peticiones
   * Esta funcion se utiliza en las promesas.
   * @param error 
   */
  private handleError(error: any): Promise<any> {
    console.error('Un error a ocurrido...', error);
    return Promise.reject(error.message || error);
  }
  /**
   * Se establece el codigo de la persona.
   * @param codigo 
   */
  setCodigoPersona(codigo: Number) {
    this.codigoPersonaConsultado = codigo;
  }

  /**
   * Almacena una nueva atencion a traves del método POST
   * @param URL 
   * @param atencion instancia de Atencion. Es necesario este modelo.
   */
  setAtencion(URL: string, atencion: Atencion): Observable<any> {

    const cabecera = new HttpHeaders().set('Accept', 'text/plain');
    return this.http2.post(URL + '/atencion', atencion, {
      headers: cabecera
    })

  }
  
  /**
   * Almacena una nueva Evolucion Ambulatoria a traves del metodo POST
   * @param URL 
   * @param evolucionAmbulatoria 
   */
  setEvolucionAmbulatoria(URL: string, evolucionAmbulatoria: EvolucionAmbulatoria) {
    return this.http.post(URL + '/evolucionAmbulatoria', evolucionAmbulatoria);
  }

  /**
   * Elimina una atencion a traves del metodo DELETE
   * @param URL 
   * @param codigo 
   */
  deleteAtencion(URL: string, codigo: Number) {
    return this.http.delete(URL + '/atencion/' + codigo);
  }

  /**
   * Devuelve el/los antecedentes perinatologicos que posee una atencion (lista)
   * @param URL 
   * @param codigoAtencion codigo de la atencion
   */
  getAntecedentePerinatologico(URL: string, codigoAtencion: Number): Observable<AntecedentePerinatologico> {
    return this.http.get(URL + '/antecedentePerinatologico/' + codigoAtencion).map(res => res.json());
    ;
  }

  /**
   * Devuelve el tipo de presentacion en Antecedentes Perinatologicos
   * @param URL 
   * @param codigo identificatorio de la relacion tipo de presentacion
   */
  getTipoPresentacion(URL: string, codigo): Observable<Tipo_presentacion> {
    return this.http.get(URL + '/tipo_presentacion/' + codigo)
      .map(res => res.json());
  }

  /**
   * Devuelve el tipo de terminacion en Antecedentes Perinatologicos
   * @param URL 
   * @param codigo identificatorio de la relacion tipo de terminacion
   */
  getTipoTerminacion(URL: string, codigo): Observable<Tipo_presentacion> {
    return this.http.get(URL + '/tipo_terminacion/' + codigo)
      .map(res => res.json());
  }

  /**
   * Almacena los antecedentes perinatologicos
   * @param URL 
   * @param antecedentePerinatologico modelo a almacenar
   */
  setAntecedentePerinatologico(URL: string, antecedentePerinatologico: AntecedentePerinatologico) {
    return this.http.post(URL + '/antecedentePerinatologico', antecedentePerinatologico);
  }

  /**
   * Devuelve los diagnosticos CIE10 almacenados en la relacion Diagnosticos
   * @param URL 
   */
  getDiagnosticos(URL: string): Observable<Diagnostico[]> {
    return this.http.get(URL + '/diagnosticos')
      .map(res => res.json());
  }

  /**
   *Actualiza una atencion con informacion de motivos de anulacion
   * @param URL 
   * @param atencion modelo de datos, con atributo observacionAnulado 
   */
  updateAtencion(URL: string, atencion: Atencion): Observable<Atencion> {
    return this.http.put(URL + '/atencion', atencion)
      .map(res => res.json());
  }

/**
 * Devuelve la Evolucion ambulatoria relacionado a una atencion
 * @param URL 
 * @param codigoAtencion identificatorio de la atencion
 */
  getEvolucionAmbulatoria(URL: string, codigoAtencion: Number): Observable<EvolucionAmbulatoria> {
    return this.http.get(URL + '/evolucionAmbulatoria/' + codigoAtencion).
      map(res => res.json());
  }

}
