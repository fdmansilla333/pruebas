import { Component, Input } from '@angular/core';
import { MedicamentoConsume } from '../modelos/MedicamentoConsume';
import { MedicamentosConsumeService } from './medicamentos-consume.service';
import { AppComponent } from '../app.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Producto } from "../modelos/Producto";
//import {SearchFilterPipe} from './medicamentos.filter';

@Component({
  moduleId: module.id,
  selector: 'app-medicamentos-consume',
  templateUrl: 'medicamentos-consume.component.html',
  styleUrls: ['medicamentos-consume.component.scss'],
  providers: [MedicamentosConsumeService],
})
export class MedicamentosConsumeComponent {
  @Input() medicamentosConsume: MedicamentoConsume[];

  public medicamentos: Producto[];
  public seleccionado: Number;
  public descripcion: String;
  public busqueda: string;


  constructor(mcService: MedicamentosConsumeService, public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService) {
    this.medicamentosConsume = new Array<MedicamentoConsume>();

    this.medicamentos = new Array<Producto>();

    mcService.getMedicamentos()
      .subscribe(res => this.medicamentos = res);

    mcService.getMedicamentosConsume(appconfig.PERSONA) // TODO ver como conseguir este parámetro
      .subscribe(x => x.map(y => y.map(z =>
        this.medicamentosConsume.push(z))));
  }

  getCantidadMedicamentosConsume(): Number {
    return this.medicamentosConsume.length;
  }

  getResultadosMedicamentos(): Number {
    return this.medicamentos.length;
  }


  public log(msg: string) {
    console.log(msg);
    console.log(this.medicamentos);

  }

  mostrar() {
    this.ngxSmartModalService.closeLatestModal();
  }

  guardar() {
    this.ngxSmartModalService.closeLatestModal();
    //TODO actualizar lista de los antecedentes de siniestros.

    //TODO una vez guardado limpiar el modelo...
    console.log(this.busqueda);
    console.log(this.seleccionado);
    console.log(this.descripcion);
  }
}
