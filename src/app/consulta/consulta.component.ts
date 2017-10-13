import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Atencion } from '../atencion';
import { AtencionService } from '../atencion.service';
import { Persona } from "../modelos/Persona";
import { NgxSmartModalService } from "ngx-smart-modal";
import { EvolucionAmbulatoria } from "../modelos/EvolucionAmbulatoria";

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
    @Input() public habilitarAnulados: boolean = false;
    @Input() public orden: string = 'No ordenado';
    @Input() public mensajeHabilitarAnuladas = 'Anuladas ocultas';
    public observacion_anulacion: string; // Valor de anulacion de observacion.

    constructor(public appconfig: AppComponent, public serviceAtencion: AtencionService, public ngxSmartModalService: NgxSmartModalService) {
        console.log('Se instancia consulta componente');
        this.atenciones = new Array;
        this.persona = new Persona();
        if (appconfig.PERSONA !== undefined) {
            console.log('Haciendo consulta a :' + appconfig.BASEURL + ' y con la persona:' + appconfig.PERSONA);
            serviceAtencion.getAtenciones(appconfig.BASEURL, appconfig.PERSONA)
                .subscribe(atenciones => this.atenciones = atenciones, error => console.log(error), () => {
                    //Se filtran las atenciones, para mostrar solo las validas
                    this.atenciones = this.atenciones.filter(a => a.observacion == 'Evolucion Ambulatoria' && a.anulada == false);

                    this.ordenar();
                });

            serviceAtencion.getDatosPersona(appconfig.BASEURL, appconfig.PERSONA)
                .subscribe(persona => this.persona = persona);
        }

    }

    habilitarAnuladas() {
        if (this.habilitarAnulados) {
            this.serviceAtencion.getAtenciones(this.appconfig.BASEURL, this.appconfig.PERSONA)
                .subscribe(atenciones => this.atenciones = atenciones, error => console.log(error), () => {
                    this.atenciones = this.atenciones.filter(a => a.observacion == 'Evolucion Ambulatoria');
                    this.ordenar();
                    this.mensajeHabilitarAnuladas = 'Anuladas visibles';
                });
        } else {
            this.serviceAtencion.getAtenciones(this.appconfig.BASEURL, this.appconfig.PERSONA)
                .subscribe(atenciones => this.atenciones = atenciones, error => console.log(error), () => {
                    this.atenciones = this.atenciones.filter(a => a.observacion == 'Evolucion Ambulatoria' && a.anulada == false);
                    this.ordenar();
                    this.mensajeHabilitarAnuladas = 'Anuladas ocultas';
                });
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


    /**
     * Guardar observacion de anulacion
     */
    guardar(atencion: Atencion, obs: string) {
        this.ngxSmartModalService.closeLatestModal();
        atencion.observacion_anulacion = obs;
        this.observacion_anulacion = ''; //Limpiando el  modelo
        //enviando la nueva modificacion
        this.serviceAtencion.updateAtencion(this.appconfig.BASEURL, atencion).subscribe(res => atencion = res, error => alert('No se pudo actualizar la atencion...'), () => {
            //Si finalizo la actualizacion, se saca de la colección.
            this.atenciones = this.atenciones.filter(a => a.codigo !== atencion.codigo);
        });
    }

    public log(msg: string) {
        console.log(msg);
    }
    /**
     * Metodo que se encarga de solicitar los datos de la atencion ambulatoria, dado una atencion
     * @param atencion 
     */
    agregarDatosEvolucionAmbulatoria(atencion: Atencion) {
        let evolucion: EvolucionAmbulatoria;
        this.serviceAtencion.getEvolucionAmbulatoria(this.appconfig.BASEURL, atencion.codigo)
            .subscribe(res => evolucion = res, error => console.log(error), () => {
                this.ngxSmartModalService.setModalData(evolucion, 'verAtencionModal');
            });

    }
}
