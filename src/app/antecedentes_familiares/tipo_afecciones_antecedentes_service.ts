import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TipoAfeccionFamiliar } from '../modelos/TipoAfeccionFamiliar';
import { Atencion } from '../../app/atencion';
import { AntecedenteFamiliar } from '../modelos/AntecedenteFamiliar';
import {AppComponent} from '../app.component';

/**
 * Servicio que se encarga de las peticiones entre los tipos de antecedentes familiares BD
 */
@Injectable()
export class TipoAfeccionesAntecedentesService {


  private CODIGOSEROS;
  constructor( public compPrincipal: AppComponent,  private http: Http) {
   
    if (compPrincipal.CODIGOSEROS){
      this.CODIGOSEROS = compPrincipal.CODIGOSEROS;
    }
    
  }

  /*Devuelve todas las tipos de affecciones que existen */
  getTiposAfeccionesFamiliares(): any {
    return this.http.get(this.compPrincipal.BASEURL + '/tipos_afecciones_familiares')
       .do(x => console.log(x))
      .map(res => res.json());
  }


  private handleError(error: any): Promise<any> {
    console.error('[tipo_afecciones_antecedentes_service]Ha ocurrido un error:', error);
    return Promise.reject(error.message || error);
  }

  /**Sentencias atomicas no funcionan en cascada */
  /*Devuelve todas las atenciones que tiene una persona*/
  public getAtencionPersona(persona: Number): Promise<Atencion[]> {
    return this.http.get(this.compPrincipal.BASEURL + '/atencion?persona=' + persona)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  
  /**
   * Devuelve los antecedentes que existen por atencion 
   * @param atencion 
   */
  public getAntecedentePorAtencion(atencion: Number): Promise<AntecedenteFamiliar> {
    return this.http.get(this.compPrincipal.BASEURL + '/antecedentes_familiares?atencion=' + atencion)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Devuelve todos las tipos de afecciones familiares que existen
   * @param codigo_tipo_afeccion_familiar 
   */
  public getTipoAfeccionPorAntecedente(codigo_tipo_afeccion_familiar: Number): Promise<TipoAfeccionFamiliar> {
    return this.http.get(this.compPrincipal.BASEURL + '/tipo_afeccion_familiar/' + codigo_tipo_afeccion_familiar)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  /**
   * Devuelve todas las tipos de afecciones personales que tiene una determinado persona
   * @param persona 
   */
  public getTipoAfeccionesQuePoseePersona(persona: Number): any {

    return this.http.get(this.compPrincipal.BASEURL + '/tipos_afecciones_familiares/' + persona)
       .do(x => console.log(x))
      .map(res => res.json());
  }

  /**
   * Almacena un tipo de antecedente familiar.
   * @param codigoAtencion 
   * @param tipoAfeccionFamiliar tipo de antecedente familiar modelo
   */
  public setTipoAtencionFamiliar(codigoAtencion: Number, tipoAfeccionFamiliar: TipoAfeccionFamiliar){
    tipoAfeccionFamiliar.atencion = codigoAtencion;
    return this.http.post(this.compPrincipal.BASEURL + '/antecedentes_familiares',tipoAfeccionFamiliar);

  }

  /**
   * Actualiza un tipo de antecedente familiar
   * @param tipoAfeccionFamiliar 
   */
  public putTipoAtencionFamiliar(tipoAfeccionFamiliar: TipoAfeccionFamiliar){
    
    return this.http.put(this.compPrincipal.BASEURL + '/antecedentes_familiares/', tipoAfeccionFamiliar);

  }


}
