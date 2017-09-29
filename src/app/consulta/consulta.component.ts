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

    constructor(public appconfig: AppComponent, public serviceAtencion: AtencionService) {
        console.log('Se instancia consulta componente');
        this.atenciones = new Array;
        this.persona = new Persona();
        if (appconfig.PERSONA !== undefined) {
            console.log('Haciendo consulta a :' + appconfig.BASEURL + ' y con la persona:' + appconfig.PERSONA);
            serviceAtencion.getAtenciones(appconfig.BASEURL, appconfig.PERSONA)
                .subscribe(atenciones => this.atenciones = atenciones);
            serviceAtencion.getDatosPersona(appconfig.BASEURL, appconfig.PERSONA)
                .subscribe(persona => this.persona = persona);
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
        ,error=> console.log(error)
        ,() => {
            //Saco de la coleccion de atenciones la atencion eliminada.
            this.atenciones = this.atenciones.filter(a => a !== atencion);
            alert("La atención a sido anulada");
        });
      }
}
