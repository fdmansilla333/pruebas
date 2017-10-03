import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Atencion } from '../../app/atencion';
import {AppComponent} from '../app.component';


@Injectable()
export class MedicamentoAlergiaService {

  constructor(private http: Http, public appconfig: AppComponent) { 
    
  }

  /*Devuelve todas las tipos de afecciones que existen */
  getMedicamentosAlergia(persona: Number): any {
    return this.http.get(this.appconfig.BASEURL+ '/medicamentos_alergia/' + persona)
      .do(x => console.log(x))
      .map(res => res.json());
  }
  getDroga(codigoDroga: Number): any {
    return this.http.get(this.appconfig.BASEURL + '/droga/' + codigoDroga)
    .do(x => console.log(x))
    .map(res => res.json());
  }

   private handleError(error: any): Promise<any> {
    console.error('[tipo_afecciones_antecedentes_service]Ha ocurrido un error:', error);
    return Promise.reject(error.message || error);
  }

}
