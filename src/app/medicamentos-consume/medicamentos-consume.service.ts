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

/**
 * Servicio sobre MedicamentoConsume BD
 */
@Injectable()
export class MedicamentosConsumeService {

  /**
   * Constructor del servicio
   * @param http 
   * @param appconfig 
   */
  constructor(private http: Http, public appconfig: AppComponent) {

  }

  
  /**Devuelve todas las tipos de afecciones que existen
   * 
   * @param persona codigo identificatorio de la persona
   */
  getMedicamentosConsume(persona: Number): any {
    return this.http.get(this.appconfig.BASEURL + '/medicamento_consume/' + persona)
      .map(res => res.json());
  }

  /**
   * Devuelve los medicamentos que existen (relacion producto)
   */
  getMedicamentos(): Observable<Producto[]> {
    return this.http.get(this.appconfig.BASEURL + '/productos')
      .map(res => res.json());
  }

  /**
   * Almacena un nuevo medicamento que consume un paciente
   * @param medicamento instancia del modelo de datos Medicamento_consume
   */
  setMedicamentosConsume(medicamento: MedicamentoConsume): Observable <MedicamentoConsume> {
  return this.http.post(this.appconfig.BASEURL + '/medicamento_consume', medicamento)
  .map(res => res.json());
  }

  /**
   * Devuelve un producto a partir del codigo
   * @param codigo identificatorio de la relacion Producto
   */
  getProductoPorCodigo(codigo: Number): Observable <Producto>{
    return this.http.get(this.appconfig.BASEURL + '/producto/' + codigo)
    .map(res => res.json());

  }

}
