import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { Persona } from "../modelos/Persona";
import { AntecedentePerinatologico } from "../modelos/AntecedentePerinatologico";
import { AtencionService } from "../atencion.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Atencion } from "../atencion";

@Component({
    moduleId: module.id,
    selector: 'antecedentes-perinatologicos',
    templateUrl: 'antecedentes-perinatologicos.component.html',
    styleUrls: ['antecedentes-perinatologicos.component.scss'],


})
export class AntecedentesPerinatologicosComponent {
    @Input() public dniPaciente: Number;
    @Input() public persona: Persona;
    public hoy: Date;
    public antecedentePerinatologico: AntecedentePerinatologico;
    @Input() public tieneAntecedentePerinatologico: boolean;
    constructor(public app: AppComponent, public servicio: AtencionService, public router: Router) {
        if (app.DNIPERSONA) {
            /**
             * Si el dni es valido deberia buscar si posee algun antecedente perinatologico.
             * Si posee debe mostrarlo, pero no modificarlo, sino posee debe permitir cargar.
             * 
             */
            this.dniPaciente = app.DNIPERSONA;
            this.persona = app.OBJETO_PERSONA;
            this.hoy = new Date();
            this.antecedentePerinatologico = new AntecedentePerinatologico();
            this.tieneAntecedentePerinatologico = false;

            this.servicio.getAtenciones(app.BASEURL, app.PERSONA).subscribe(
                res => {
                    //por cada atencion devuelta, busco si esa atencion se encuentra en algun antecedente perinatologico
                    let i = 0;
                    while (i < res.length && !this.tieneAntecedentePerinatologico) {
                        this.servicio.getAntecedentePerinatologico(app.BASEURL, res[i].codigo).subscribe(res => { this.antecedentePerinatologico = res }, error => console.log(error), () => {
                            if (this.antecedentePerinatologico.codigo) {

                                console.log('Antecedente viene con codigo:' + this.antecedentePerinatologico.codigo + ' imposible hacer carga');
                                this.tieneAntecedentePerinatologico = true;
                                console.log(this.antecedentePerinatologico);
                                servicio.getTipoPresentacion(app.BASEURL, this.antecedentePerinatologico.tipo_presentacion)
                                    .subscribe(res => this.antecedentePerinatologico.descripcion_tipo_presentacion = res.descripcion);
                                servicio.getTipoTerminacion(app.BASEURL, this.antecedentePerinatologico.tipo_terminacion)
                                    .subscribe(res => this.antecedentePerinatologico.descripcion_tipo_terminacion = res.descripcion);
                            }
                        });
                        i++;
                    }

                }
            );


        }

    }

    /**
     * Almacena el formulario de antecedentes perinatologicos
     */
    guardar() {
        console.log(this.antecedentePerinatologico);
        let codigoAtencion;
        let error = false;
        //Una vez inertado correctamente los antecedentes perinatologicos se retorna al inicio
        this.servicio.setAtencion(this.app.BASEURL, new Atencion(new Date(), 'Antecedente perinatologico', this.app.PERSONA, ""))
            .subscribe(res => codigoAtencion = res, error => console.log(error), () => {
                this.antecedentePerinatologico.atencion = codigoAtencion;
                this.servicio.setAntecedentePerinatologico(this.app.BASEURL, this.antecedentePerinatologico)
                    .subscribe(res => console.log(res),
                    error => {
                        error = true;
                        console.log('Hubo un error al insertar el antecedente perinatologico:' + error);
                    },
                    () => {
                        //Si hubo error se elimina la atencion. Si no hubo error se redirecciona
                        if (!error) {
                            alert("Registrado correctamente");
                            this.router.navigateByUrl('/buscar/' + this.dniPaciente);
                        } else {
                            
                            if (codigoAtencion) {
                                this.servicio.deleteAtencion(this.app.BASEURL, codigoAtencion);
                            }
                            alert("Hubo errores, reintente o cancele la operacion");
                        }

                    });

            }
            );
        if (!error) {

        }
    }

}