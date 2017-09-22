import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TipoAfeccionPersonal} from '../modelos/TipoAfeccionPersonal';
import { Atencion } from '../../app/atencion';
import { AntecedentePersonal } from '../modelos/AntecedentePersonal';
import {AppComponent} from '../app.component';

@Injectable()
export class TipoAfeccionesPersonalService {

  // TODO @Damián hacer el path context para colocar rutas relativas
  private URLBASE = 'http://localhost:8080/SerosTeCuidaMaven/api/';
  constructor(private http: Http, appconf: AppComponent) { 
    if (appconf.BASEURL){
    this.URLBASE = appconf.BASEURL;
    }
  }

  /*Devuelve todas las tipos de affecciones que existen */
  getTiposAfeccionesPersonales(): any {
    return this.http.get(this.URLBASE + 'tipos_afecciones_personales')
      // .do(x => console.log(x))
      .map(res => res.json());
  }

   private handleError(error: any): Promise<any> {
    console.error('[tipo_afecciones_antecedentes_service]Ha ocurrido un error:', error);
    return Promise.reject(error.message || error);
  }

}
