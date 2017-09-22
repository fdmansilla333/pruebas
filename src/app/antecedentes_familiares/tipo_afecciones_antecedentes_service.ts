import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TipoAfeccionFamiliar } from '../modelos/TipoAfeccionFamiliar';
import { Atencion } from '../../app/atencion';
import { AntecedenteFamiliar } from '../modelos/AntecedenteFamiliar';
import {AppComponent} from '../app.component';


@Injectable()
export class TipoAfeccionesAntecedentesService {

  // TODO @Damián hacer el path context para colocar rutas relativas
  private URLBASE = 'http://localhost:8080/SerosTeCuidaMaven/api/';
  private CODIGOSEROS;
  constructor( compPrincipal: AppComponent,  private http: Http) {
    
    if (compPrincipal.BASEURL){
      this.URLBASE = compPrincipal.BASEURL;
    }
    if (compPrincipal.CODIGOSEROS){
      this.CODIGOSEROS = compPrincipal.CODIGOSEROS;
    }
    console.log('URLBASE:'+ this.URLBASE + ' codigo seros:' + this.CODIGOSEROS);
  }

  /*Devuelve todas las tipos de affecciones que existen */
  getTiposAfeccionesFamiliares(): any {
    return this.http.get(this.URLBASE + 'tipos_afecciones_familiares')
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
    return this.http.get(this.URLBASE + 'atencion?persona=' + persona)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  /*Devuelve e */
  public getAntecedentePorAtencion(atencion: Number): Promise<AntecedenteFamiliar> {
    return this.http.get(this.URLBASE + 'antecedentes_familiares?atencion=' + atencion)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getTipoAfeccionPorAntecedente(codigo_tipo_afeccion_familiar: Number): Promise<TipoAfeccionFamiliar> {
    return this.http.get(this.URLBASE + 'tipo_afeccion_familiar/' + codigo_tipo_afeccion_familiar)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  public getTipoAfeccionesQuePoseePersona(persona: Number): any {

    return this.http.get(this.URLBASE + 'tipos_afecciones_familiares/' + persona)
       .do(x => console.log(x))
      .map(res => res.json());
  }


}
