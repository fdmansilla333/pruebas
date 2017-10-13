import { Component, Input } from '@angular/core';
import { HabitosService } from './habitos.service';
import { Habitos } from '../modelos/Habitos';
import { AsyncPipe } from '@angular/common';
import { AppComponent } from '../app.component';
import { NgxSmartModalService } from "ngx-smart-modal";
import { NgForm } from "@angular/forms/src/forms";
import { TipoHabito } from "../modelos/TipoHabito";
import { AtencionService } from '../atencion.service';
import { Atencion } from "../atencion";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  moduleId: module.id,
  selector: 'app-habitos',
  templateUrl: 'habitos.component.html',
  styleUrls: ['habitos.component.scss'],
  providers: [HabitosService, AtencionService],
})
export class HabitosComponent {
  @Input() habitos: Habitos[];
  public codigoHabitoSeleccionado: Number;
  public observacion: string;
  public tipoHabitosDisponibles: TipoHabito[];
  public atencion: any;
  public cantidad: number;
  public objetoSeleccionado: TipoHabito;

  constructor(public atencionService: AtencionService, public habitoService: HabitosService,
    public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService, private _sanitizer: DomSanitizer) {

    this.tipoHabitosDisponibles = new Array<TipoHabito>();
    habitoService.getTiposHabitos().subscribe(res => this.tipoHabitosDisponibles = res);
    this.habitos = new Array<Habitos>();
    this.atencion = this.appconfig.codigoAtencion;
    if (this.atencion === undefined) {
      console.log('La atencion no se encuentra intanciada');
    }

    if (this.appconfig.PERSONA !== null) {
      habitoService.getHabitos(this.appconfig.PERSONA)
        .subscribe(res => this.habitos = res, error => console.log(error), () => {
          //cuando finalice el buscar se recorre nuevamente tomando los datos de tipo de habito para cada habito que psoea la pesona
          this.habitos.map(h => {
            h.tipo_habito_dato = new TipoHabito(null, null, null); //TODO probar
            habitoService.getTipoHabitos(h.tipo_habito).subscribe(res => h.tipo_habito_dato = res);
          });
        })

    } else {
      console.log('No es posible buscar sin el codigo de la persona ');
    }


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

  actualizar() {
    this.habitos.map(m => this.habitos.pop());
    this.objetoSeleccionado = undefined;
    this.observacion = '';
    this.cantidad = 0;
    this.habitoService.getHabitos(this.appconfig.PERSONA)
      .subscribe(res => this.habitos = res, error => console.log(error), () => {
        //cuando finalice el buscar se recorre nuevamente tomando los datos de tipo de habito para cada habito que psoea la pesona
        this.habitos.map(h => {
          h.tipo_habito_dato = new TipoHabito(null, null, null); //TODO probar
          this.habitoService.getTipoHabitos(h.tipo_habito).subscribe(res => h.tipo_habito_dato = res);
        });
      })

  }

  guardar() {
    this.codigoHabitoSeleccionado = this.objetoSeleccionado.codigo;
    this.ngxSmartModalService.closeLatestModal();
    //Si no tengo una atencion se genera una para poder almacenar la nueva modificacion
    if (this.atencion === this.appconfig.SINCODIGOATENCION) {
      console.log('DEBUG: Enviando desde habito sin atencion');
      //this.appconfig.nuevaAtencion('Habito', 'Nuevo habito');
      //setTimeout(() => {// La implementacion de setTimeout no sirve dado que nos obliga a colocar un parametro de tiempo.
      //cada componente, puede generar una nueva atencion.
      this.atencionService.setAtencion(this.appconfig.BASEURL, new Atencion(new Date(), 'Habito nuevo', this.appconfig.PERSONA, ''))
        .subscribe( res => this.appconfig.codigoAtencion = res, error => console.log(error), () => {
          this.atencion = this.appconfig.codigoAtencion;
          let h = new Habitos(null, this.codigoHabitoSeleccionado, this.atencion, this.observacion, this.cantidad, new TipoHabito(this.codigoHabitoSeleccionado, null, null));
          h.tipo_habito = this.codigoHabitoSeleccionado;
          if (h.tipo_habito !== null) {
            this.habitoService.setHabito(h).subscribe(res => console.log(res), error => {
              console.log(error);
              this.atencionService.deleteAtencion(this.appconfig.BASEURL, this.atencion).subscribe(res => console.log(res));
            }, () => {
              this.actualizar();
            })
          }
        });
    } else {
      //al poseer la atencion, se setea el nuevo habito
      console.log('DEBUG: Enviando desde habito con atencion');
      let h = new Habitos(null, this.codigoHabitoSeleccionado, this.atencion, this.observacion, this.cantidad, new TipoHabito(this.codigoHabitoSeleccionado, null, null));
      h.tipo_habito = this.codigoHabitoSeleccionado;
      if (h.tipo_habito !== null) {
        this.habitoService.setHabito(h).subscribe(res => console.log(res), error => console.log(error), () => {
          this.actualizar();
        })
      }
    }
    //}, 500);


  }

  autocompleListFormatter = (data: any): SafeHtml => {
    let html = `<span>${data.nombre_corto}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}
