import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Atencion } from '../../app/atencion';
import {AppComponent} from '../app.component';

@Injectable()
export class MedicamentosConsumeService {

  constructor(private http: Http, public appconfig: AppComponent) {
    
   }

  /*Devuelve todas las tipos de afecciones que existen */
  getMedicamentosConsume(persona: Number): any {
    return this.http.get(this.appconfig.BASEURL + '/medicamento_consume/' + persona)
      // .do(x => console.log(x))
      .map(res => res.json());
  }

}
