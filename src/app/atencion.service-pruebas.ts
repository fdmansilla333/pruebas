import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Atencion } from './atencion';


@Injectable()
export class AtencionService {

  private atencionURL = 'http://localhost:3000/atenciones';
  private atencion: Promise<[Atencion]>;
  constructor(private http: Http) { }

  getAtencion(): Promise<Atencion[]> {

    console.log('get atencion en atencion service');

    return this.http.get(this.atencionURL)
      .toPromise()
      .then(response => response.json() as Atencion[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('Un error a ocurrido...', error);
    return Promise.reject(error.message || error);
  }

}
