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
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';


@Component({
  moduleId: module.id,
  selector: 'app-siniestros-accidentes',
  templateUrl: 'siniestros-accidentes.component.html',
  styleUrls: ['siniestros-accidentes.component.scss'],
  providers: [SiniestrosAccidentesService, AtencionService]
})

/**
 * Componente que gestiona los antecedentes siniestros de un paciente
 */
export class SiniestrosAccidentesComponent {
  @Input() accidentes: Siniestro[];
  //public hoy: Date;
  public motivo: string;
  public todosLosSiniestros: TipoAntecedenteSiniestro[];
  public codigoTipoSiniestroSeleccionado: String;
  public fechaDeHoy = new Date(); //utilizado para no permitir el ingreso de una fecha posterior
  public atencion;
  public fuente = [];

  public hoy: any = { jsdate: new Date() };
  
    myOptions: INgxMyDpOptions = {
      dateFormat: 'dd/mm/yyyy', // ver https://github.com/kekeh/ngx-mydatepicker/blob/master/README.md
    };

  /**
   * El constructor obtiene todos los tipos de antecedentes siniestros que existen,
   * , los antecedentes_siniestros que posee una persona y establece la atencion
   * @param atencionService Servicio de las atenciones
   * @param accidentesService Servicio de los antecedentes siniestros
   * @param appconfig configuraciones de la APP
   * @param ngxSmartModalService Servicio para el modal
   */
  constructor(public atencionService: AtencionService, public accidentesService: SiniestrosAccidentesService, public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService) {
    //this.hoy = new Date();
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


  }

  /**
   * Metodo que utiliza el modal para DEBUG
   * @param msg 
   */
  public log(msg: string) {
    console.log(msg);
  }

  /**
   * Actualiza la coleccion de accidentes y vuelve a actualizar desde la BD
   */ 
  actualizar() {
    this.accidentes = [];
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

  /**
   * Metodo del Modal DEBUG
   */
  mostrar() {
    this.ngxSmartModalService.closeLatestModal();
  }

  /**
   * Devuelve la cantidad de accidentes que posee una persona
   * Este metodo es utilizado en la vista para determinar si debe mostrar una tabla
   * o debe mostrar la posibilidad de registro
   */
  getCantidadAccidentes(): Number {
    return this.accidentes.length;
  }
  /**
   * Metodo invocado desde el modal:
   * Almacena una antecedente siniestro nuevo.
   * En caso de no existir una atencion vinculada, la genera.
   */
  guardar() {
    this.ngxSmartModalService.closeLatestModal();
    let codigoTipoSiniestroSeleccionado = parseInt(this.codigoTipoSiniestroSeleccionado.split(' ')[0]);
    if (this.atencion === this.appconfig.SINCODIGOATENCION) {
      //se debe crear una atencion
      this.atencionService.setAtencion(this.appconfig.BASEURL, new Atencion(new Date(), 'Antecedentes siniestro', this.appconfig.PERSONA, ''))
        .subscribe(res => this.atencion = res, error => console.log(error), () => {
          this.appconfig.codigoAtencion = this.atencion;
          let tipoAntecedenteSiniestro = new TipoAntecedenteSiniestro(this.hoy.jsdate, this.motivo, this.atencion, codigoTipoSiniestroSeleccionado);
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
      let tipoAntecedenteSiniestro = new TipoAntecedenteSiniestro(this.hoy.jsdate, this.motivo, this.atencion, codigoTipoSiniestroSeleccionado);
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

  /**
   * Actualiza la hora
   * @param event 
   */
  updatehoy(event: Date) {
    console.log(event);
    this.hoy = event;
  }
}
