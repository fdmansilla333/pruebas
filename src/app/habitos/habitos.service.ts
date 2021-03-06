import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Atencion } from '../../app/atencion';
import { AppComponent } from '../app.component';
import { Observable } from "rxjs/Observable";
import { Habitos } from '../modelos/Habitos';
import { TipoHabito } from "../modelos/TipoHabito";

/**
 * Servicio que administra las peticiones a la relacion Habitos 
 */
@Injectable()
export class HabitosService {

  constructor(private http: Http, public appconfig: AppComponent) {

  }
/**
 *Devuelve todas las tipos de afecciones que existen
 * @param persona 
 */
  getHabitos(persona: Number): Observable<Habitos[]> {
    return this.http.get(this.appconfig.BASEURL + '/habitos/' + persona)
      .map(res => res.json());
  }

  /**
   * Devuelve el habito a traves del codigo, tipo habito
   * @param codigoTipoHabito 
   */
  getTipoHabitos(codigoTipoHabito: Number): Observable<TipoHabito> {
    if (codigoTipoHabito !== null) {
      return this.http.get(this.appconfig.BASEURL + '/tipo_habito/' + codigoTipoHabito)
        .do(x => console.log(x))
        .map(res => res.json());
    }else{
      return null;
    }
  }
  /**
   * Devuelve todos los tipos de habitos
   */
  getTiposHabitos(): Observable<TipoHabito[]> {
    return this.http.get(this.appconfig.BASEURL + '/tipo_habitos')
      .map(res => res.json());
  }

  /**
   * Almacena un habito
   * @param h 
   */
  setHabito(h: Habitos): Observable<Habitos> {
    return this.http.post(this.appconfig.BASEURL + '/habito', h).map(res => res.json());
  }

}
