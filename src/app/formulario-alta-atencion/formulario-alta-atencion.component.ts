import { Component, Input, Output} from '@angular/core';
import {Atencion} from './../atencion';
import { Headers, Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Component({
    moduleId: module.id,
    selector: 'app-formulario-alta-atencion',
    templateUrl: 'formulario-alta-atencion.component.html',
    styleUrls: ['formulario-alta-atencion.component.scss']
})
export class FormularioAltaAtencionComponent {
  @Input() observacion: String;
  @Input() fecha_atencion: Date;
  @Input() observacion_internacion: String;
  @Input() persona: Number;


  public constructor(private http: Http, private route: ActivatedRoute) {
    this.route.params.subscribe(params => console.log(params));
  }

  public enviar(event: Event) {
    console.log(event);
    const atencion: Atencion = new Atencion(this.fecha_atencion, this.observacion, this.persona, this.observacion_internacion);
    console.log(atencion); // se debería enviar el tojson aqui?
    this.http.post('/api/atencion', atencion).toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Un error a ocurrido...', error);
    return Promise.reject(error.message || error);
  }

}
