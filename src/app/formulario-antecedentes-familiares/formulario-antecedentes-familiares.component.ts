import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AntecedenteFamiliar } from '../antecedente_familiar';

@Component({
  moduleId: module.id,
  selector: 'app-formulario-antecedentes-familiares',
  templateUrl: 'formulario-antecedentes-familiares.component.html',
  styleUrls: ['formulario-antecedentes-familiares.component.scss']
})
/**
 * Componente de ejemplo
 */
export class FormularioAntecedentesFamiliaresComponent {
  @Input() antecedente: AntecedenteFamiliar = new AntecedenteFamiliar(null, null, null);
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

}
