import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Atencion } from '../atencion';

@Component({
    moduleId: module.id,
    selector: 'app-formulario-atencion',
    styleUrls: ['formulario-atencion.component.scss', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
    templateUrl: 'formulario-atencion.component.html',

})
/**
 * Componente de ejemplo
 */
export class FormularioAtencionComponent {

  @Input() atencion: Atencion = new Atencion(null, null, null, null);
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

}
