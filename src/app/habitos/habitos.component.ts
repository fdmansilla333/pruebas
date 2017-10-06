import { Component, Input } from '@angular/core';
import { HabitosService } from './habitos.service';
import { Habitos } from '../modelos/Habitos';
import { AsyncPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { NgxSmartModalService } from "ngx-smart-modal";
import { NgForm } from "@angular/forms/src/forms";
import { TipoHabito } from "../modelos/TipoHabito";
import { AtencionService } from '../atencion.service';
import { Atencion } from "../atencion";

@Component({
  moduleId: module.id,
  selector: 'app-habitos',
  templateUrl: 'habitos.component.html',
  styleUrls: ['habitos.component.scss'],
  providers: [HabitosService, AtencionService],
})
export class HabitosComponent {
  @Input() habitos: Habitos[];
  public codigoHabitoSeleccionado: number;
  public observacion: string;
  public tipoHabitosDisponibles: TipoHabito[];
  public atencion: any;
  public cantidad: number;

  constructor(public atencionService: AtencionService, public habitoService: HabitosService, public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService) {

    this.tipoHabitosDisponibles = new Array<TipoHabito>();
    habitoService.getTiposHabitos().subscribe(res => this.tipoHabitosDisponibles = res);

    this.habitos = new Array<Habitos>();
    /*
    habitoService.getHabitos(appconfig.PERSONA)
      .subscribe(habitos => habitos.map(habito => {
        if (habito.tipo_habito !== null) {
          habitoService.getTipoHabitos(habito.tipo_habito)
            .subscribe(tipoHabito => {
              console.log('Tipo de habito:' + tipoHabito);
              habito.tipo_habito = new TipoHabito(1,'',''); // TODO ver de desacoplar
              habito.tipo_habito_dato = tipoHabito});
        }
        this.habitos.push(habito);
      }));
      */
   /*
      habitoService.getHabitos(appconfig.PERSONA)
      .subscribe(habitos => this.habitos = habitos, error=> console.log(error), () =>{
        //una vez que finalice hay que recorrer los habitos y solicitar los tipo de habitos.
        this.habitos.map(h => habitoService.getTipoHabitos(h.tipo_habito).subscribe(res => res))
      });
*/

    console.log(this.habitos);


    //TODO subir al app conf obtener la atencion...
    if (this.appconfig.codigoAtencion == undefined) { //TODO verificar que los post no se realicen con path undefined 
      console.log('Pidiendo...');
      //se debe crear una atencion
      this.atencionService.setAtencion(this.appconfig.BASEURL, new Atencion(new Date(), 'Habito', this.appconfig.PERSONA, ''))
        .subscribe(res => { console.log(this.atencion); this.atencion = res; });
      this.appconfig.codigoAtencion = this.atencion;
      //TODO chequear....
    } else {
      this.atencion = this.appconfig.codigoAtencion;
    }
    console.log('Usando atencion:' + this.atencion);

  }

  getCantidadHabitos(): Number {
    return this.habitos.length;
  }

  agregarHabito(f: NgForm) {
    if (f.valid) {
      console.log(f.value);
    }
  }

  public log(msg: string) {
    console.log(msg);
    console.log(this.tipoHabitosDisponibles);
  }

  mostrar() {
    this.ngxSmartModalService.closeLatestModal();
  }

  actualizar() {
    this.habitos.map(m => this.habitos.pop());
    this.habitoService.getHabitos(this.appconfig.PERSONA)
      .subscribe(habitos => habitos.map(habito => {
        if (habito.tipo_habito !== null) {
          this.habitoService.getTipoHabitos(habito.tipo_habito)
            .subscribe(tipoHabito => habito.tipo_habito_dato = tipoHabito);
        }
        this.habitos.push(habito);
      }));
  }

  guardar() {
    this.ngxSmartModalService.closeLatestModal();
    if (this.atencion) {
      let h = new Habitos(null, this.codigoHabitoSeleccionado, this.atencion, this.observacion, this.cantidad, new TipoHabito(null,null,null));
      console.log(h);
      this.habitoService.setHabito(h).subscribe(res => console.log(res), error => console.log(error), () => {
        this.actualizar();
      })
    } else {
      console.log('No se posee atencion asociada');
    }

  }

}
