import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Atencion } from '../../app/atencion';
import {AppComponent} from '../app.component';


@Injectable()
export class MedicamentoAlergiaService {

  // TODO @Damián hacer el path context para colocar rutas relativas
  private URLBASE = 'http://localhost:8080/SerosTeCuidaMaven/api/';
  constructor(private http: Http, appconfig: AppComponent) { 
    if (appconfig.BASEURL){
      this.URLBASE = appconfig.BASEURL;
    }
  }

  /*Devuelve todas las tipos de afecciones que existen */
  getMedicamentosAlergia(persona: Number): any {
    return this.http.get(this.URLBASE + 'medicamentos_alergia/' + persona)
      .do(x => console.log(x))
      .map(res => res.json());
  }
  getDroga(codigoDroga: Number): any {
    return this.http.get(this.URLBASE + 'droga/' + codigoDroga)
    .do(x => console.log(x))
    .map(res => res.json());
  }

   private handleError(error: any): Promise<any> {
    console.error('[tipo_afecciones_antecedentes_service]Ha ocurrido un error:', error);
    return Promise.reject(error.message || error);
  }

}
