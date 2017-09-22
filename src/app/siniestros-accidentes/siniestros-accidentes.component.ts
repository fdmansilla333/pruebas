import { Component, Input } from '@angular/core';
import { SiniestrosAccidentesService } from './siniestros-accidentes.service';
import { Siniestro } from '../modelos/Siniestro';
import {AppComponent} from '../app.component';
@Component({
  moduleId: module.id,
  selector: 'app-siniestros-accidentes',
  templateUrl: 'siniestros-accidentes.component.html',
  styleUrls: ['siniestros-accidentes.component.scss'],
  providers: [SiniestrosAccidentesService]
})
// 151489

export class SiniestrosAccidentesComponent {
  @Input() accidentes: Siniestro[];

  constructor(accidentesService: SiniestrosAccidentesService, appconfig: AppComponent) {
    this.accidentes = new Array<Siniestro>();
    accidentesService.getAccidentesPorPersona(appconfig.PERSONA)
      .subscribe(objeto => {
        objeto.map(accidente => {
          accidente.nombreTipoSiniestro = '';
          accidentesService.getTipoAccidentes(accidente.tipo_antecedente_siniestro)
            .subscribe(tipoSiniestro => accidente.nombreTipoSiniestro = tipoSiniestro.descripcion);
          this.accidentes.push(accidente);
        }
        );
      });
  }

  getCantidadAccidentes(): Number {
    return this.accidentes.length;
  }
}
