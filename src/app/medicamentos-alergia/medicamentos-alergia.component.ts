import { Component, Input } from '@angular/core';
import { MedicamentoAlergia } from './../modelos/MedicamentoAlergia';
import { MedicamentoAlergiaService } from './medicamentos-alergia.service';
import { AppComponent } from '../app.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Droga } from "../modelos/Droga";
import { AtencionService } from '../atencion.service';
import { Atencion } from "../atencion";

@Component({
  moduleId: module.id,
  selector: 'app-medicamentos-alergia',
  templateUrl: 'medicamentos-alergia.component.html',
  styleUrls: ['medicamentos-alergia.component.scss'],
  providers: [MedicamentoAlergiaService, AtencionService],
})
export class MedicamentosAlergiaComponent {
  @Input() medicamentosAlergia: MedicamentoAlergia[];
  public descripcion: string = "";
  public drogas: Droga[];
  public codigoDrogaSeleccionado: number;
  public atencion: any;

  constructor(public maService: MedicamentoAlergiaService, public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService, public atencionService: AtencionService) {
    this.medicamentosAlergia = new Array<MedicamentoAlergia>();
    this.drogas = new Array<Droga>();

    maService.getMedicamentosAlergia(appconfig.PERSONA)
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

    maService.getDrogas()
      .subscribe(res => this.drogas = res); //TODO ver retardo

    //TODO subir al app conf obtener la atencion...
    if (this.appconfig.codigoAtencion == undefined) { //TODO verificar que los post no se realicen con path undefined 
      console.log('Pidiendo...');
      //se debe crear una atencion
      this.atencionService.setAtencion(this.appconfig.BASEURL, new Atencion(new Date(), 'Medicamentos alergia', this.appconfig.PERSONA, ''))
        .subscribe(res => {console.log(this.atencion);this.atencion = res;});
      this.appconfig.codigoAtencion = this.atencion;
      //TODO chequear....
    } else {
      this.atencion = this.appconfig.codigoAtencion;
    }

    console.log('Usando atencion:' + this.atencion);
  }

  getCantidadMedicamentosAlergia(): Number {
    return this.medicamentosAlergia.length;
  }

  public log(msg: string) {
    console.log(msg);
  }

  mostrar() {
    this.ngxSmartModalService.closeLatestModal();
  }

  actualizar() {
    //Sacar los elementos de medicamentos alergioa para actualizar el modelo
    this.medicamentosAlergia.map(e => this.medicamentosAlergia.pop());

    this.maService.getMedicamentosAlergia(this.appconfig.PERSONA)
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
            this.maService.getDroga(medicamento.droga)
              .subscribe(droga => medicamento.drogaDescripcion = droga.descripcion);
          }
        });
      });

  }
  guardar() {
    this.ngxSmartModalService.closeLatestModal();

    if (this.atencion) { //Si no poseo atencion no puedo dar de alta medicacion alergia
      let mAlergia = new MedicamentoAlergia(0, this.atencion, this.descripcion, this.codigoDrogaSeleccionado, 0);
      let errorMedicamentoAlergia = false;

      console.log(mAlergia);
      this.maService.setAlergiaDroga(mAlergia).
        subscribe(res => console.log(res), error => errorMedicamentoAlergia = true, () => {
          if (!errorMedicamentoAlergia) {
            this.actualizar();
          }
        });
    }
  }
}
