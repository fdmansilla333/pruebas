import { Component } from '@angular/core';
import { AtencionService } from "../atencion.service";
import { AppComponent } from "../app.component";
import { Atencion } from "../atencion";
import { EvolucionAmbulatoria } from "../modelos/EvolucionAmbulatoria";

@Component({
    moduleId: module.id,
    selector: 'listar-problemas-salud',
    templateUrl: 'listar-problemas-salud.component.html',
    styleUrls: ['listar-problemas-salud.component.scss']
})
/**
 * Componente que se encarga de listar los problemas de salud
 */
export class ListarProblemasSaludComponent {

    public atenciones: Atencion[];
    public evoluciones: EvolucionAmbulatoria[];
    public dniPaciente: Number;
    
/**
 * Obtiene las atenciones no anuladas de una persona, y las evoluciones ambulatorias
 * @param atencionService 
 * @param app 
 */
    constructor(public atencionService: AtencionService, public app: AppComponent) {

        if(app.DNIPERSONA){ //Esto deberia ser siempre verdadero, dado que solo se activa cuando se busca un paciente
            console.log('Devolviendo DNI desde componente antecedentes');
            this.dniPaciente = app.DNIPERSONA;
        }

        //Buscar las atenciones que posee una persona
        this.atenciones = new Array();
        this.evoluciones = new Array();

        if (this.app.PERSONA !== undefined) {
            this.atencionService.getAtenciones(this.app.BASEURL, this.app.PERSONA)
                .subscribe(res => this.atenciones = res, error => console.log(error), () => {
                    //una vez que finalice, se busca las atenciones que poseen evoluciones ambulatorias
                    this.atenciones.forEach(a => {
                        if (a.codigo !== undefined && a.observacion === 'Evolucion Ambulatoria') this.atencionService.getEvolucionAmbulatoria(this.app.BASEURL, a.codigo)
                            .subscribe(res => this.evoluciones.push(res))
                    }
                    );

                });
        }


    }

    /**
     * Devuelve la cantidad de evoluciones ambulatorias
     * Utilizado en html (vista)
     */
    cantidadEvolucionesAmbulatorias(): Number {
        return this.evoluciones.length;
    }

}
