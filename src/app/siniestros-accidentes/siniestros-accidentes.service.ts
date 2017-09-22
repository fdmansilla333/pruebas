import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {AppComponent} from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class SiniestrosAccidentesService {

  // TODO @Damián hacer el path context para colocar rutas relativas
  private URLBASE = 'http://localhost:8080/SerosTeCuidaMaven/api/';
  constructor(private http: Http, appconfig: AppComponent) { 
    if (appconfig.BASEURL){
      this.URLBASE = appconfig.BASEURL;
    }
  }

  /*Devuelve todas las tipos de affecciones que existen */
  getAccidentes(): any {
    return this.http.get(this.URLBASE + 'siniestros')
      // .do(x => console.log(x))
      .map(res => res.json());
  }

  getAccidentesPorPersona(persona: Number): any {
    return this.http.get(this.URLBASE + 'siniestros/' + persona)
    // .do(x => console.log(x))
    .map(res => res.json());
  }

  getTipoAccidentes(codigoTipoAccidente: Number): any {
    return this.http.get(this.URLBASE + 'antecedente_tipo_siniestro/' + codigoTipoAccidente)
    // .do(x => console.log(x))
    .map(res => res.json());
  }
}
