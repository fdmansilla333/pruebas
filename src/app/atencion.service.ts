import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import {Headers} from '@angular/http';



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
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AtencionService {

  private atencionURL: string;
  private atencion: Promise<[Atencion]>;
  public codigoPersonaConsultado: Number;
  constructor(private http: Http, private http2: HttpClient) { }

  getAtencion(): Promise<Atencion[]> {

    return this.http.get(this.atencionURL)
      .toPromise()
      .then(response => response.json() as Atencion[])
      .catch(this.handleError);
  }

  getPersona(URL: string, codigoseros: Number): any {
    let persona: Number;
    let serosTeCuidaPersona;
    return this.http.get(URL + 'seros_te_cuida_persona/' + codigoseros)
      .map(res => res.json());
  }

  getAtenciones(URL: string, persona: Number): Observable<Atencion[]> {
    return this.http.get(URL + 'atencion?persona=' + persona)
      .do(x => console.log(x))
      .map(res => res.json());
  }

  getDatosPersona(URL: string, persona: Number): Observable<Persona> {
    if (persona == undefined){
      return null; // TODO ver de asignarlo a otra variable
    }
    return this.http.get(URL + 'persona/' + persona)
      .map(res => res.json());
  }

  getDatosPersonaPorDni(URL: string, dni: Number): Observable<Persona> {
    return this.http.get(URL + 'persona?dni=' + dni)
      .map(res => res.json());
  }

  getDatosAfiliado(URL: string, dni: Number): Observable<Afiliado> {
    return this.http.get(URL + 'afiliado?dni=' + dni)
      .map(res => res.json());

  }

  getLocalidad(URL: string, codigo: Number): Observable<Localidad> {
    return this.http.get(URL + 'localidad/' + codigo)
      .map(res => res.json());
  }

  getObraSocial(URL: string, codigo: Number): Observable<ObraSocial> {
    return this.http.get(URL + 'obra_social/' + codigo)
      .map(res => res.json());
  }

  getPais(URL: string, codigo: Number): Observable<Pais> {
    return this.http.get(URL + 'pais/' + codigo)
      .map(res => res.json());
  }

  getParentesco(URL: string, codigo: Number): Observable<Parentesco> {
    return this.http.get(URL + 'parentesco/' + codigo)
      .map(res => res.json());
  }

  getTipoDocumento(URL: string, codigo: Number): Observable<TipoDocumento> {
    return this.http.get(URL + 'tipo_documento/' + codigo)
      .map(res => res.json());
  }

  getAfiliado(URL: string, dni: Number): Observable<Afiliado> {
    return this.http.get(URL + 'afiliado?dni=' + dni)
      .map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('Un error a ocurrido...', error);
    return Promise.reject(error.message || error);
  }

  setCodigoPersona(codigo:Number){
    console.log('Cambiando codigo a:' + codigo);
    this.codigoPersonaConsultado = codigo;
  }

  setAtencion(URL: string, atencion: Atencion){
    
  
    //let headers = new Headers({ 'Access-Control-Allow-Origin': '*' });
    //headers.append('Access-Control-Allow-Origin', '*');    
    //headers.append('Access-Control-Allow-Credentials', 'true');    
    //headers.append('Content-Type','application/json ' );
    //headers.append('Accept','text/plain');
    
    
    //headers.append('Accept','Accept');
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Access-Control-Allow-Credentials', 'true');
    //headers.append('Content-Type','application/json ');
    
    const cabecera = new HttpHeaders().set('Accept','text/plain');
    //cabecera.set('Accept', 'text/plain');
    //cabecera.set('Access-Control-Allow-Origin', '*');
    //cabecera.set('Access-Control-Allow-Credentials', 'true');
    //cabecera.set('Content-Type','application/json');
    return this.http2.post(URL + 'atencion', atencion, {
      headers: cabecera
    });

  }


}
