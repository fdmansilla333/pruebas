import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {AppComponent} from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class SiniestrosAccidentesService {

  constructor(private http: Http, public appconfig: AppComponent) { 
   
  }

  /*Devuelve todas las tipos de affecciones que existen */
  getAccidentes(): any {
    return this.http.get(this.appconfig.BASEURL + '/siniestros')
      // .do(x => console.log(x))
      .map(res => res.json());
  }

  getAccidentesPorPersona(persona: Number): any {
    return this.http.get(this.appconfig.BASEURL + '/siniestros/' + persona)
    // .do(x => console.log(x))
    .map(res => res.json());
  }

  getTipoAccidentes(codigoTipoAccidente: Number): any {
    return this.http.get(this.appconfig.BASEURL + '/antecedente_tipo_siniestro/' + codigoTipoAccidente)
    // .do(x => console.log(x))
    .map(res => res.json());
  }
}
