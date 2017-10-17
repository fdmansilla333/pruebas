import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {AppComponent} from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TipoAntecedenteSiniestro } from "../modelos/tipoAntecedenteSiniestro";
import { Observable } from "rxjs/Observable";

/**
 * Servicio que se encarga de los siniestros [Accidentes, Operaciones, Internaciones] de un determinado paciente
 */
@Injectable()
export class SiniestrosAccidentesService {

  constructor(private http: Http, public appconfig: AppComponent) { 
   
  }

  /*Devuelve todas las tipos de afecciones que existen */
  getAccidentes(): any {
    return this.http.get(this.appconfig.BASEURL + '/siniestros')
      .map(res => res.json());
  }

  /**
   * Devuelve los accidentes que posee una persona
   * @param persona codigo identificatorio de la relacion persona
   */
  getAccidentesPorPersona(persona: Number): any {
    return this.http.get(this.appconfig.BASEURL + '/siniestros/' + persona)
    .map(res => res.json());
  }

  /**
   * Devuelve los tipos de siniestro [accidentes, operaciones,internaciones, etc ] a traves de un codigo
   * @param codigoTipoAccidente 
   */
  getTipoAccidentes(codigoTipoAccidente: Number): any {
    return this.http.get(this.appconfig.BASEURL + '/antecedente_tipo_siniestro/' + codigoTipoAccidente)
    .map(res => res.json());
  }

  /**
   * Devuelve todos los tipos de antecedentes siniestros que existen en la relacion antecedentes_siniestros
   */
  getTiposAntecedenesSiniestros(): any {
    return this.http.get(this.appconfig.BASEURL + '/antecedente_tipo_siniestros')
    .map(res => res.json());
  }

/**
 *Almacena un nuevo siniestro [operacion, accidente, internacion]
 * @param tipoAntecedenteSiniestro 
 */
  setTipoAntecedenteSiniestro(tipoAntecedenteSiniestro: TipoAntecedenteSiniestro): Observable < TipoAntecedenteSiniestro> {
    return this.http.post(this.appconfig.BASEURL + '/antecedente_tipo_siniestros', tipoAntecedenteSiniestro)
    .map(res => res.json());
  }
}
