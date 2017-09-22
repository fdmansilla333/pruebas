import { Component, Input } from '@angular/core';
import { HabitosService } from './habitos.service';
import { Habitos } from '../modelos/Habitos';
import { AsyncPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { NgxSmartModalService } from "ngx-smart-modal";
import { NgForm } from "@angular/forms/src/forms";
@Component({
  moduleId: module.id,
  selector: 'app-habitos',
  templateUrl: 'habitos.component.html',
  styleUrls: ['habitos.component.scss'],
  providers: [HabitosService],
})
export class HabitosComponent {
  @Input() habitos: Habitos[];

  constructor(habitoService: HabitosService, appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService) {

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

}
