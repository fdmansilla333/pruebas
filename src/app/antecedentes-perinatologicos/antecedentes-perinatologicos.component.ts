import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component';
import { Persona } from "../modelos/Persona";
import { AntecedentePerinatologico } from "../modelos/AntecedentePerinatologico";
import { AtencionService } from "../atencion.service";
import { NgForm } from "@angular/forms";

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
    constructor(app: AppComponent, public servicio: AtencionService) {
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
                                this.tieneAntecedentePerinatologico = true; //ver de hacer algo con la vista
                                console.log(this.antecedentePerinatologico);
                            }
                        });
                        i++;
                    }

                }
            );


        }

    }

    
    guardar(f:NgForm){
        console.log(this.antecedentePerinatologico);
    }
}