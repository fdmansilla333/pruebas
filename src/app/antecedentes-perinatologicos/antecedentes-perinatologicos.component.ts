import { Component, Input} from '@angular/core';
import {AppComponent} from '../app.component';

@Component({
    moduleId: module.id,
    selector: 'antecedentes-perinatologicos',
    templateUrl: 'antecedentes-perinatologicos.component.html',
    styleUrls: ['antecedentes-perinatologicos.component.scss'],
    
    
})
export class AntecedentesPerinatologicosComponent {
@Input() public dniPaciente: Number;

    constructor(app: AppComponent){
        console.log('DNI:' + app.DNIPERSONA);
        if(app.DNIPERSONA){ //Esto deberia ser siempre verdadero, dado que solo se activa cuando se busca un paciente
            console.log('Devolviendo DNI desde componente antecedente perinatologico');
            this.dniPaciente = app.DNIPERSONA;
        }
    }

}
