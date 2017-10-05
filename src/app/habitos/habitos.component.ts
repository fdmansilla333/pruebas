import { Component, Input } from '@angular/core';
import { HabitosService } from './habitos.service';
import { Habitos } from '../modelos/Habitos';
import { AsyncPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { NgxSmartModalService } from "ngx-smart-modal";
import { NgForm } from "@angular/forms/src/forms";
import { TipoHabito } from "../modelos/TipoHabito";
@Component({
  moduleId: module.id,
  selector: 'app-habitos',
  templateUrl: 'habitos.component.html',
  styleUrls: ['habitos.component.scss'],
  providers: [HabitosService],
})
export class HabitosComponent {
  @Input() habitos: Habitos[];
  public codigoHabitoSeleccionado: number;
  public descripcion: string;
  public tipoHabitosDisponibles: TipoHabito[];

  constructor(habitoService: HabitosService, appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService) {

    //Inicio de prueba de carga de datos
    this.tipoHabitosDisponibles = new Array<TipoHabito>();

    this.tipoHabitosDisponibles.push(new TipoHabito(1,"Fuma", "Algo ams"));
    this.tipoHabitosDisponibles.push(new TipoHabito(2,"Alcohol", "Algo ams"));
    this.tipoHabitosDisponibles.push(new TipoHabito(3,"Actividad fisica", "Algo ams"));
    //Fin de prueba de carga de datos

    this.habitos = new Array<Habitos>();
    habitoService.getHabitos(appconfig.PERSONA)
      .subscribe(habitos => habitos.map(habito => {
        if (habito.tipo_habito !== null) {
          habitoService.getTipoHabitos(habito.tipo_habito)
            .subscribe(tipoHabito => habito.tipo_habito_dato = tipoHabito);
        }
        this.habitos.push(habito);
      }));
    console.log(this.habitos);

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

  guardar(){
    this.ngxSmartModalService.closeLatestModal();
    console.log(this.codigoHabitoSeleccionado);
    console.log(this.descripcion);
    //TODO actualizar lista de los antecedentes de siniestros.

    //TODO una vez guardado limpiar el modelo...
  }

}
