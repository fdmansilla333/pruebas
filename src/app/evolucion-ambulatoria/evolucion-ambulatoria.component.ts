import { Component, Input } from '@angular/core';
import { AppComponent } from "../app.component";

@Component({
    moduleId: module.id,
    selector: 'evolucion-ambulatoria',
    templateUrl: 'evolucion-ambulatoria.component.html',
    styleUrls: ['evolucion-ambulatoria.component.scss']
})
export class EvolucionAmbulatoriaComponent {
@Input() public dniPaciente: Number;
    
        constructor(app: AppComponent){
            console.log('DNI:' + app.DNIPERSONA);
            if(app.DNIPERSONA){
                this.dniPaciente = app.DNIPERSONA;
            }
        }

}
