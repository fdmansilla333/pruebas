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
import { Producto } from "../modelos/Producto";
import { MedicamentosConsumeService } from "../medicamentos-consume/medicamentos-consume.service";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
// Agregado para la compatibilidad de los DATES
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';




@Component({
    moduleId: module.id,
    selector: 'evolucion-ambulatoria',
    templateUrl: 'evolucion-ambulatoria.component.html',
    styleUrls: ['evolucion-ambulatoria.component.scss'],
    providers: [MedicamentosConsumeService]
})
/**
 * componente que gestiona la evolucion ambulatoria de un paciente
 */
export class EvolucionAmbulatoriaComponent implements OnChanges {

    @Input() public dniPaciente: Number;
    @Input() public persona: Persona;
    //public hoy: Date;
    public evolucionAmbulatoria: EvolucionAmbulatoria;
    public peso: Number = 0;
    public diagnosticos: Diagnostico[];
    public choices = [];
    public seleccionado: any;
    public myData: any;
    public fuente = [];
    public medicamentos: Producto[];
    public diagnosticoSeleccionado: Diagnostico;
    public medicamentoSeleccionado: Producto;

    
    public hoy: any = { jsdate: new Date() };
  
    myOptions: INgxMyDpOptions = {
      dateFormat: 'dd/mm/yyyy', // ver https://github.com/kekeh/ngx-mydatepicker/blob/master/README.md
    };

    /**
     * Genera el formulario con los datos calculados en el modelo y obtenidos de la BD.
     * Obtiene todos los diagnosticos disponibles para el auto-complete
     * @param app 
     * @param servicio 
     * @param router 
     */
    constructor(public app: AppComponent, public mcService: MedicamentosConsumeService, public servicio: AtencionService, public router: Router, private _sanitizer: DomSanitizer) {
        if (app.DNIPERSONA) {
            this.dniPaciente = app.DNIPERSONA;
            //console.log(app.OBJETO_PERSONA);
            this.persona = app.OBJETO_PERSONA;
            //this.hoy = new Date();
            this.evolucionAmbulatoria = new EvolucionAmbulatoria(this.persona);
            this.diagnosticos = new Array<Diagnostico>();
            this.servicio.getDiagnosticos(this.app.BASEURL)
                .subscribe(res => this.diagnosticos = res, error => console.log(error), () => {
                    /*this.diagnosticos.map(d => {
                        this.fuente.push(d.codigo +' '+ d.descripcion);
                        
                   
                    });
                    */
                    this.diagnosticos= this.diagnosticos.sort((d1, d2) => {
                        if (d1.descripcion < d2.descripcion) {
                            return -1;
                        } else {
                            if (d1.descripcion > d2.descripcion) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }
                    });

                    console.log(this.diagnosticos);
                });
            this.medicamentos = new Array<Producto>();
            mcService.getMedicamentos()
                .subscribe(res => this.medicamentos = res, error=>{}, () => {
                    console.log(this.medicamentos);
                    
                });

                

            



        }
    }

    /**
     * Metodo que se ejecuta cuando existen cambios
     * @param changes coleccion de eventos
     */
    ngOnChanges(changes: SimpleChanges): void {
    }

    onDateChanged(changes: Event): void {
        
    }

 

    /**
     * Metodo ejecutado al presionarse una tecla
     * @param value caracter escuchado
     */
    onKey(value: string) {
    }

    /**
     * Calcula el indice de masa corporal
     * @param peso 
     * @param talla 
     */
    actualizarIMC(peso: any, talla: any) {
        if (peso && talla) {
            this.evolucionAmbulatoria.peso = peso;
            this.evolucionAmbulatoria.talla = talla;
            this.evolucionAmbulatoria.calcularIMC();
        }

    }

    /**
     * Si no existen problemas de validacion, almacena el formulario evolucion ambulatoria
     * genera una nueva atencion, si no existe.
     * @param f formulario
     */
    guardar(f: NgForm) {

        let codigoAtencionDevuelto;
        let atencion: Atencion = new Atencion(new Date, 'Evolucion Ambulatoria', this.persona.codigo, 'Aten');
        this.servicio.setAtencion(this.app.BASEURL, atencion).subscribe(resultado => { console.log(resultado); codigoAtencionDevuelto = resultado }
            , error => console.log(error),
            () => {
                if (codigoAtencionDevuelto) { // si tengo un codigo valido de inserción, inserto la atencion ambulatoria
                    this.evolucionAmbulatoria.atencion = codigoAtencionDevuelto;
                    this.evolucionAmbulatoria.diagn_problema_salud = this.diagnosticoSeleccionado.descripcion;
                    this.evolucionAmbulatoria.indicacion_medicacion = this.medicamentoSeleccionado.nombre + ' ' + this.medicamentoSeleccionado.presentacion;
                    this.evolucionAmbulatoria.fecha = this.hoy.jsdate; // El objeto es un contenedor de date
                    console.log(this.evolucionAmbulatoria);
                    this.servicio.setEvolucionAmbulatoria(this.app.BASEURL, this.evolucionAmbulatoria)
                        .subscribe(resultado => console.log(resultado)
                        , error => {
                            console.log(error);
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
    /**
     * Utilizado para el modal
     */
    mostrar(): boolean {
        return this.evolucionAmbulatoria.otras;
    }

    autocompleListFormatter = (data: any): SafeHtml => {
        let html = `<span>${data.nombre} - ${data.presentacion}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

    autocompleListFormatterDiagnosticos = (data: any): SafeHtml => {
        let html = `<span>${data.codigo} - ${data.descripcion}</span>`;
        return this._sanitizer.bypassSecurityTrustHtml(html);
    }

}
