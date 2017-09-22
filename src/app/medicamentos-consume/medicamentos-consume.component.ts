import { Component, Input } from '@angular/core';
import { MedicamentoConsume } from '../modelos/MedicamentoConsume';
import { MedicamentosConsumeService } from './medicamentos-consume.service';
import {AppComponent} from '../app.component';
@Component({
  moduleId: module.id,
  selector: 'app-medicamentos-consume',
  templateUrl: 'medicamentos-consume.component.html',
  styleUrls: ['medicamentos-consume.component.scss'],
  providers: [MedicamentosConsumeService],
})
export class MedicamentosConsumeComponent {
  @Input() medicamentosConsume: MedicamentoConsume[];

  constructor(mcService: MedicamentosConsumeService, appconfig: AppComponent) {
    this.medicamentosConsume = new Array<MedicamentoConsume>();
    mcService.getMedicamentosConsume(appconfig.PERSONA) // TODO ver como conseguir este parámetro
      .subscribe(x => x.map(y => y.map(z =>
        this.medicamentosConsume.push(z))));
        // TODO hay que ver que se devuelve un arreglo de arreglos de objetos, por eso el mapping
    console.log(this.medicamentosConsume);
  }

  getCantidadMedicamentosConsume(): Number {
    return this.medicamentosConsume.length;
  }
}
