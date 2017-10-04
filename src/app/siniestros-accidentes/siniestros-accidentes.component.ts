import { Component, Input } from '@angular/core';
import { SiniestrosAccidentesService } from './siniestros-accidentes.service';
import { Siniestro } from '../modelos/Siniestro';
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';
import { TipoAntecedenteSiniestro } from "../modelos/tipoAntecedenteSiniestro";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm } from "@angular/forms";
import {AtencionService} from '../atencion.service';
import { Atencion } from "../atencion";

@Component({
  moduleId: module.id,
  selector: 'app-siniestros-accidentes',
  templateUrl: 'siniestros-accidentes.component.html',
  styleUrls: ['siniestros-accidentes.component.scss'],
  providers: [SiniestrosAccidentesService, AtencionService]
})

export class SiniestrosAccidentesComponent {
  @Input() accidentes: Siniestro[];
  public hoy: Date;
  public motivo: string;
  public todosLosSiniestros: TipoAntecedenteSiniestro[];
  public codigoTipoSiniestroSeleccionado: Number;
  public fechaDeHoy = new Date(); //utilizado para no permitir el ingreso de una fecha posterior
  public atencion;

  constructor(public atencionService: AtencionService, public accidentesService: SiniestrosAccidentesService,public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService) {
    this.hoy = new Date();
    this.motivo = '';
    this.accidentes = new Array<Siniestro>();
    accidentesService.getTiposAntecedenesSiniestros()
      .subscribe(res => this.todosLosSiniestros = res);
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
    if (this.appconfig.codigoAtencion === 0){
      //se debe crear una atencion
      this.atencionService.setAtencion(this.appconfig.BASEURL, new Atencion(new Date(), 'Antecedentes siniestro',this.appconfig.PERSONA,''))
      .subscribe(res =>  this.atencion = res);
      this.appconfig.codigoAtencion = this.atencion;
      //TODO chequear....
    }else{
    this.atencion = this.appconfig.codigoAtencion; 
    }
  }

  public log(msg: string) {
    console.log(msg);
  }

  mostrar() {
    this.ngxSmartModalService.closeLatestModal();
  }
  getCantidadAccidentes(): Number {
    return this.accidentes.length;
  }
  //Guarda los datos del modal
  guardar(){
    this.ngxSmartModalService.closeLatestModal();
    console.log('fecha:' + this.hoy);
    console.log('motivo:' + this.motivo);
    console.log('siniestro seleccionado' + this.codigoTipoSiniestroSeleccionado);
    
    this.accidentesService.setTipoAntecedenteSiniestro(new TipoAntecedenteSiniestro(this.hoy, this.motivo,this.atencion, this.codigoTipoSiniestroSeleccionado))
    .subscribe(res => console.log(res));
    //TODO actualizar lista de los antecedentes de siniestros.
  }
}
