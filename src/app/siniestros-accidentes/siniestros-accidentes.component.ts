import { Component, Input } from '@angular/core';
import { SiniestrosAccidentesService } from './siniestros-accidentes.service';
import { Siniestro } from '../modelos/Siniestro';
import { AppComponent } from '../app.component';
import { DatePipe } from '@angular/common';
import { TipoAntecedenteSiniestro } from "../modelos/tipoAntecedenteSiniestro";
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm } from "@angular/forms";
import { AtencionService } from '../atencion.service';
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
  public codigoTipoSiniestroSeleccionado: String;
  public fechaDeHoy = new Date(); //utilizado para no permitir el ingreso de una fecha posterior
  public atencion;
  public fuente = [];

  constructor(public atencionService: AtencionService, public accidentesService: SiniestrosAccidentesService, public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService) {
    this.hoy = new Date();
    this.motivo = '';
    this.accidentes = new Array<Siniestro>();
    accidentesService.getTiposAntecedenesSiniestros()
      .subscribe(res => this.todosLosSiniestros = res, error=> console.log(error), ()=>{
        //Al finalizar
        this.todosLosSiniestros.map( a => this.fuente.push(a.codigo + " " + a.descripcion));        
      });
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
    this.atencion = this.appconfig.codigoAtencion;

    //agregado para el autocompletado

  }

  public log(msg: string) {
    console.log(msg);
  }
  //vuelve a solicitar los datos y elimna la coleccion
  //llamar desde el contructor
  actualizar() {
    this.accidentes.map(e => this.accidentes.pop());
    this.accidentesService.getAccidentesPorPersona(this.appconfig.PERSONA)
      .subscribe(objeto => {
        objeto.map(accidente => {
          accidente.nombreTipoSiniestro = '';
          this.accidentesService.getTipoAccidentes(accidente.tipo_antecedente_siniestro)
            .subscribe(tipoSiniestro => accidente.nombreTipoSiniestro = tipoSiniestro.descripcion);
          //agregar el accidente que no se encuentre en la coleccion
          this.accidentes.push(accidente);

        }
        );
      });
  }

  mostrar() {
    this.ngxSmartModalService.closeLatestModal();
  }
  getCantidadAccidentes(): Number {
    return this.accidentes.length;
  }
  //Guarda los datos del modal
  guardar() {
    this.ngxSmartModalService.closeLatestModal();
    let codigoTipoSiniestroSeleccionado = parseInt(this.codigoTipoSiniestroSeleccionado.split(' ')[0]);
    if (this.atencion === this.appconfig.SINCODIGOATENCION) {
      //se debe crear una atencion
      this.atencionService.setAtencion(this.appconfig.BASEURL, new Atencion(new Date(), 'Antecedentes siniestro', this.appconfig.PERSONA, ''))
        .subscribe(res => this.atencion = res, error => console.log(error), () => {
          this.appconfig.codigoAtencion = this.atencion;
          let tipoAntecedenteSiniestro = new TipoAntecedenteSiniestro(this.hoy, this.motivo, this.atencion, codigoTipoSiniestroSeleccionado);
          let errorAntecedente = false;
          this.accidentesService.setTipoAntecedenteSiniestro(tipoAntecedenteSiniestro)
            .subscribe(res => console.log(res), error => errorAntecedente = true,
            () => {
              // al finalizar, si no hubo errores coloco el nuevo antecedentes en la coleccion
              if (!errorAntecedente) {
                this.actualizar();
              }
            });
        });


    } else {
      let tipoAntecedenteSiniestro = new TipoAntecedenteSiniestro(this.hoy, this.motivo, this.atencion, codigoTipoSiniestroSeleccionado);
      let errorAntecedente = false;
      this.accidentesService.setTipoAntecedenteSiniestro(tipoAntecedenteSiniestro)
        .subscribe(res => console.log(res), error => errorAntecedente = true,
        () => {
          // al finalizar, si no hubo errores coloco el nuevo antecedentes en la coleccion
          if (!errorAntecedente) {
            this.actualizar();
          }
        });
    }


  }

  updatehoy(event: Date) {
    console.log(event);
    this.hoy = event;
  }
}
