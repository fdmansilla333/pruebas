import { Component, Input } from '@angular/core';
import { MedicamentoAlergia } from './../modelos/MedicamentoAlergia';
import { MedicamentoAlergiaService } from './medicamentos-alergia.service';
import {AppComponent} from '../app.component';
@Component({
  moduleId: module.id,
  selector: 'app-medicamentos-alergia',
  templateUrl: 'medicamentos-alergia.component.html',
  styleUrls: ['medicamentos-alergia.component.scss'],
  providers: [MedicamentoAlergiaService],
})
export class MedicamentosAlergiaComponent {
  @Input() medicamentosAlergia: MedicamentoAlergia[];

  constructor(maService: MedicamentoAlergiaService, appconfig:AppComponent) {
    this.medicamentosAlergia = new Array<MedicamentoAlergia>();
    maService.getMedicamentosAlergia(appconfig.PERSONA) // TODO ver como conseguir este parámetro
      .subscribe(objeto => {
        objeto.map(medicamento => {
          medicamento.forEach(med => {
            this.medicamentosAlergia.push(med);
          });
        });
      },
      error => { console.log(error); },
      () => {
        // Una vez finalizada la petición http get genero una nueva completando los detalles
        this.medicamentosAlergia.forEach(medicamento => {
          if (medicamento.droga !== null) {
            maService.getDroga(medicamento.droga)
              .subscribe(droga => medicamento.drogaDescripcion = droga.descripcion);
          }
        });
      });

    console.log(this.medicamentosAlergia);
  }

  getCantidadMedicamentosAlergia(): Number {
    return this.medicamentosAlergia.length;
  }
}
