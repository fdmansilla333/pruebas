import { Component, Input} from '@angular/core';
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
    
        constructor(public app: AppComponent, public servicio: AtencionService){
            if(app.DNIPERSONA){
                this.dniPaciente = app.DNIPERSONA;
                //console.log(app.OBJETO_PERSONA);
                this.persona = app.OBJETO_PERSONA;
                this.hoy = new Date();
                this.evolucionAmbulatoria = new EvolucionAmbulatoria(this.persona, this.hoy);
            }
        }

        ngOnChanges(changes: SimpleChanges): void {
            console.log('Cambios detectados');
        }



        onKey(value: string) {
           console.log(value);
          }

          actualizarIMC(peso:any, talla:any) {
              if (peso && talla){
              this.evolucionAmbulatoria.peso = peso;
              this.evolucionAmbulatoria.talla = talla;
              this.evolucionAmbulatoria.calcularIMC();
              }
              
          }

          guardar(f: NgForm){
             // console.log('Se deberia enviar lo sgte:');
              //console.log(f.value);
              //console.log('Comparar con...');
              //console.log(this.evolucionAmbulatoria);

              //console.log('Enviando una nueva atencion:');
              let atencion:Atencion = new Atencion(new Date, 'observacion de prueba', this.persona.codigo, 'internacion');
              console.log(atencion);

              this.servicio.setAtencion(this.app.BASEURL, atencion).subscribe(resultado => console.log(resultado), error=>console.log(error));

              

          }
          mostrar(): boolean{
              return this.evolucionAmbulatoria.otras;
          }

}
