import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Atencion } from '../../app/atencion';
import { AppComponent } from '../app.component';
import { Observable } from "rxjs/Observable";
import { Producto } from "../modelos/Producto";
import { MedicamentoConsume } from "../modelos/MedicamentoConsume";

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

  getMedicamentos(): Observable<Producto[]> {
    return this.http.get(this.appconfig.BASEURL + '/productos')
      .map(res => res.json());
  }

  setMedicamentosConsume(medicamento: MedicamentoConsume): Observable <MedicamentoConsume> {
  return this.http.post(this.appconfig.BASEURL + '/medicamento_consume', medicamento)
  .map(res => res.json());
  }

  getProductoPorCodigo(codigo: Number): Observable <Producto>{
    return this.http.get(this.appconfig.BASEURL + '/producto/' + codigo)
    .map(res => res.json());

  }

}
