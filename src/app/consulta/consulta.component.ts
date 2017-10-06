import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Atencion } from '../atencion';
import { AtencionService } from '../atencion.service';
import { Persona } from "../modelos/Persona";
@Component({
    moduleId: module.id,
    selector: 'app-consulta',
    templateUrl: 'consulta.component.html',
    styleUrls: ['consulta.component.scss'],
    providers: [AtencionService],
})
export class ConsultaComponent {
    @Input() atenciones: Atencion[];
    @Input() persona: Persona;
    @Input() public ordenarASC: boolean = false;
    @Input() public orden: string = 'No ordenado';

    constructor(public appconfig: AppComponent, public serviceAtencion: AtencionService) {
        console.log('Se instancia consulta componente');
        this.atenciones = new Array;
        this.persona = new Persona();
        if (appconfig.PERSONA !== undefined) {
            console.log('Haciendo consulta a :' + appconfig.BASEURL + ' y con la persona:' + appconfig.PERSONA);
            serviceAtencion.getAtenciones(appconfig.BASEURL, appconfig.PERSONA)
                .subscribe(atenciones => this.atenciones = atenciones, error => console.log(error), () => {
                    this.ordenar();
                });

            serviceAtencion.getDatosPersona(appconfig.BASEURL, appconfig.PERSONA)
                .subscribe(persona => this.persona = persona);
        }

    }

    ordenar() {
        if (this.ordenarASC) { //orden ascendente
            //Se ordena por fecha
            //return negative if the first item is smaller; positive if it it's larger, or zero if they're equal.
            this.atenciones.sort((a1, a2) => {
                if (a1.fecha_atencion < a2.fecha_atencion) {
                    return -1;
                } else {
                    if (a1.fecha_atencion > a2.fecha_atencion) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
            this.orden = 'Ascendente'
        } else {
            console.log('Reverse');
            this.atenciones = this.atenciones.reverse();
            this.orden = 'Descendente';
        }
    }

    getPersona(): boolean {
        return this.persona.nombre !== undefined && this.persona.codigo != 0;
    }

    getCantidadAtenciones(): Number {
        return this.atenciones.length;
    }

    delete(atencion: Atencion): void {
        this.serviceAtencion.deleteAtencion(this.appconfig.BASEURL, atencion.codigo).subscribe(res => console.log(res)
            , error => console.log(error)
            , () => {
                //Saco de la coleccion de atenciones la atencion eliminada.
                this.atenciones = this.atenciones.filter(a => a !== atencion);
                alert("La atención a sido anulada");
            });
    }
}
