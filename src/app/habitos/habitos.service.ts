import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Atencion } from '../../app/atencion';
import {AppComponent} from '../app.component';


@Injectable()
export class HabitosService {

  // TODO @Damián hacer el path context para colocar rutas relativas
  private URLBASE = 'http://localhost:8080/SerosTeCuidaMaven/api/';
  constructor(private http: Http, appconfig: AppComponent) { 
    if (appconfig.BASEURL){
      this.URLBASE = appconfig.BASEURL;
    }
  }

  /*Devuelve todas las tipos de afecciones que existen */
  getHabitos(persona: Number): any {
    return this.http.get(this.URLBASE + 'habitos/' + persona)
      .do(x => console.log(x))
      .map(res => res.json());
  }
  getTipoHabitos(codigoTipoHabito: Number): any {
    return this.http.get(this.URLBASE + 'tipo_habito/' + codigoTipoHabito)
    .do(x => console.log(x))
    .map(res => res.json());
  }

  /*
  TODO agregar un metodo para obtener los tipos de habitos existentes 
  para permitir a un paciente agregarle datos
  */

}
