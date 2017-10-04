import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {AppComponent} from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TipoAntecedenteSiniestro } from "../modelos/tipoAntecedenteSiniestro";
import { Observable } from "rxjs/Observable";


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

  getTiposAntecedenesSiniestros(): any {
    return this.http.get(this.appconfig.BASEURL + '/antecedente_tipo_siniestros')
    .map(res => res.json());
  }

  setTipoAntecedenteSiniestro(tipoAntecedenteSiniestro: TipoAntecedenteSiniestro): Observable < TipoAntecedenteSiniestro> {
    return this.http.post(this.appconfig.BASEURL + '/antecedente_tipo_siniestros', tipoAntecedenteSiniestro)
    .map(res => res.json());
  }
}
