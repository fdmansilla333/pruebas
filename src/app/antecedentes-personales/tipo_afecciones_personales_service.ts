import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { TipoAfeccionPersonal} from '../modelos/TipoAfeccionPersonal';
import { Atencion } from '../../app/atencion';
import { AntecedentePersonal } from '../modelos/AntecedentePersonal';
import {AppComponent} from '../app.component';
import { Observable } from "rxjs/Observable";

@Injectable()
export class TipoAfeccionesPersonalService {


  constructor(private http: Http, public appconf: AppComponent) { 

  }

  /*Devuelve todas las tipos de affecciones que existen */
  getTiposAfeccionesPersonales(): any {
    return this.http.get(this.appconf.BASEURL + '/tipos_afecciones_personales')
      // .do(x => console.log(x))
      .map(res => res.json());
  }

   private handleError(error: any): Promise<any> {
    console.error('[tipo_afecciones_antecedentes_service]Ha ocurrido un error:', error);
    return Promise.reject(error.message || error);
  }

  public getTipoAfeccionesQuePoseePersona(persona: Number): Observable <TipoAfeccionPersonal[]> {
    
        return this.http.get(this.appconf.BASEURL + '/tipos_afecciones_personales/' + persona)
           //.do(x => console.log(x))
          .map(res => res.json());
      }
    
      public setTipoAfeccionPersonal(codigoAtencion: Number, tipoAfeccionPersonal: TipoAfeccionPersonal){
        tipoAfeccionPersonal.atencion = codigoAtencion;
        return this.http.post(this.appconf.BASEURL + '/antecedentes_personal',tipoAfeccionPersonal);
    
      }
    
      public putTipoAfeccionPersonal(tipoAfeccionPersonal: TipoAfeccionPersonal){
        
        return this.http.put(this.appconf.BASEURL + '/antecedentes_personal/', tipoAfeccionPersonal);
    
      }

}
