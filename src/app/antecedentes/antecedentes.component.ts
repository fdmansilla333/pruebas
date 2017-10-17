import { Component, Input } from '@angular/core';
import { AppComponent } from "../app.component";

@Component({
    moduleId: module.id,
    selector: 'app-antecedentes',
    templateUrl: 'antecedentes.component.html',
    styleUrls: ['antecedentes.component.scss']
})
/**
 * Componente que agrupa los antecedentes familiares y personales,
 * los habitos
 * los accidentes, internaciones y operaciones
 * las alergias y
 * los medicamentos que consume.
 */
export class AntecedentesComponent {
    @Input() public dniPaciente: Number;
    
        constructor(app: AppComponent){
            console.log('DNI:' + app.DNIPERSONA);
            if(app.DNIPERSONA){ //Esto deberia ser siempre verdadero, dado que solo se activa cuando se busca un paciente
                console.log('Devolviendo DNI desde componente antecedentes');
                this.dniPaciente = app.DNIPERSONA;
            }
        }

}
