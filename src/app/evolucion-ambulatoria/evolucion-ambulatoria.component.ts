import { Component, Input } from '@angular/core';
import { AppComponent } from "../app.component";
import { Persona } from "../modelos/Persona";
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { EvolucionAmbulatoria } from "../modelos/EvolucionAmbulatoria";
import { NgModel } from '@angular/forms';
import { OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Atencion } from "../atencion";
import { AtencionService } from "../atencion.service";
import { Router } from "@angular/router";
import { Diagnostico } from "../modelos/Diagnostico";
import { Observable } from "rxjs/Observable";




@Component({
    moduleId: module.id,
    selector: 'evolucion-ambulatoria',
    templateUrl: 'evolucion-ambulatoria.component.html',
    styleUrls: ['evolucion-ambulatoria.component.scss']
})
export class EvolucionAmbulatoriaComponent implements OnChanges {

    @Input() public dniPaciente: Number;
    @Input() public persona: Persona;
    public hoy: Date;
    public evolucionAmbulatoria: EvolucionAmbulatoria;
    public peso: Number = 0;
    public diagnosticos: Diagnostico[];
    public choices = [];
    public seleccionado: any;
    public myData: any;
    public fuente = [];

    constructor(public app: AppComponent, public servicio: AtencionService, public router: Router) {
        if (app.DNIPERSONA) {
            this.dniPaciente = app.DNIPERSONA;
            //console.log(app.OBJETO_PERSONA);
            this.persona = app.OBJETO_PERSONA;
            this.hoy = new Date();
            this.evolucionAmbulatoria = new EvolucionAmbulatoria(this.persona, this.hoy);
            this.diagnosticos = new Array;
            this.servicio.getDiagnosticos(this.app.BASEURL)
                .subscribe(res => this.diagnosticos = res, error => console.log(error), () => {
                    this.diagnosticos.map(d => {
                        this.fuente.push(d.codigo + " " + d.descripcion);
                        /*let item =  {
                            'name': d.descripcion,
                            'label': d.descripcion,
                            'options': [
                              {'key': d.id, 'label': d.codigo}
                              
                            ]
                          };
                          
                        this.choices.push(item);
                        */
                    });
                });


        }
    }

    ngOnChanges(changes: SimpleChanges): void {
    }


    onKey(value: string) {
    }

    actualizarIMC(peso: any, talla: any) {
        if (peso && talla) {
            this.evolucionAmbulatoria.peso = peso;
            this.evolucionAmbulatoria.talla = talla;
            this.evolucionAmbulatoria.calcularIMC();
        }

    }

    guardar(f: NgForm) {

        let codigoAtencionDevuelto;
        let atencion: Atencion = new Atencion(new Date, 'Evolucion Ambulatoria', this.persona.codigo, 'Aten');
        this.servicio.setAtencion(this.app.BASEURL, atencion).subscribe(resultado => { console.log(resultado); codigoAtencionDevuelto = resultado }
            , error => console.log(error),
            () => {
                if (codigoAtencionDevuelto) { // si tengo un codigo valido de inserción, inserto la atencion ambulatoria
                    this.evolucionAmbulatoria.atencion = codigoAtencionDevuelto;
                    console.log(this.evolucionAmbulatoria);
                    this.servicio.setEvolucionAmbulatoria(this.app.BASEURL, this.evolucionAmbulatoria)
                        .subscribe(resultado => console.log(resultado)
                        , error => {
                            console.log(error);
                            //TODO Damian Falta llamar a eliminar la atencion con el codigo proporcionado
                            console.log('Eliminando atencion:' + this.evolucionAmbulatoria.atencion);
                            this.servicio.deleteAtencion(this.app.BASEURL, this.evolucionAmbulatoria.atencion)
                            .subscribe(x => console.log(x));
                        alert("hubo problemas al procesar la evolución ambulatoria");
                        });
                } else {
                    alert("No se pudo generar la atención");
                }

            });
        this.router.navigateByUrl('/buscar/' + this.dniPaciente);

    }
    mostrar(): boolean {
        return this.evolucionAmbulatoria.otras;
    }

   //configuracion = { remove: 'Remove facet', cancel: 'cancelar', prompt: 'Ingrese los diagnosticos por código o por descripcion', text: 'Ingresar diagnosticos' };
    
  /*

    searchUpdated(terms) {
        console.log(terms);
    };

    textSearch(customTerm) {
        console.log(customTerm);
    };
    */

}
