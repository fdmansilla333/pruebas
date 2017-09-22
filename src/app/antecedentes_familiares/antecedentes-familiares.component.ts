import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TipoAfeccionFamiliar } from '../modelos/TipoAfeccionFamiliar';
import { TipoAfeccionesAntecedentesService } from './tipo_afecciones_antecedentes_service';
import { Atencion } from './../atencion';
import { AntecedenteFamiliar } from '../modelos/AntecedenteFamiliar';
import { Observable } from 'rxjs/Observable';
import {AtencionService} from '../atencion.service';
import {AppComponent} from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Component({
  moduleId: module.id,
  selector: 'app-antecedentes-familiares',
  templateUrl: 'antecedentes-familiares.component.html',
  styleUrls: ['antecedentes-familiares.component.scss'],
  providers: [TipoAfeccionesAntecedentesService, AtencionService],
})
export class AntecedentesFamiliaresComponent implements OnInit {
  @Input() todosTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];
  @Input() poseeTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];
  @Input() faltanTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];


  constructor(servicesTiposAfeccionesFamiliares: TipoAfeccionesAntecedentesService,
  atencionService: AtencionService, app:AppComponent) {
    this.todosTiposAfeccionesFamiliares = new Array<TipoAfeccionFamiliar>();
    this.poseeTiposAfeccionesFamiliares = new Array<TipoAfeccionFamiliar>();
    this.faltanTiposAfeccionesFamiliares = new Array<TipoAfeccionFamiliar>();

    
    console.log('Codigo de persona antencedente familiar:' + app.PERSONA);
    servicesTiposAfeccionesFamiliares.getTiposAfeccionesFamiliares()
      .subscribe(objeto => {
        objeto.map(afeccion => this.todosTiposAfeccionesFamiliares.push(afeccion));
      },
      error => console.log(error),
      () => {
        console.log('Finalizado todosTiposAfeccionesFamiliares');
        servicesTiposAfeccionesFamiliares.getTipoAfeccionesQuePoseePersona(app.PERSONA)
          .subscribe(objeto => {
            objeto.map(afeccion => this.poseeTiposAfeccionesFamiliares.push(afeccion));
          },
          error => console.log(error),
          () => {
            this.faltanTiposAfeccionesFamiliares =
            this.verificarDuplicados(this.todosTiposAfeccionesFamiliares, this.poseeTiposAfeccionesFamiliares);
          });

      });

  }


  ngOnInit() {

  }

  verificarDuplicados(origen: TipoAfeccionFamiliar[], comparador: TipoAfeccionFamiliar[]): any {
    return origen.filter(x => !this.buscarObjeto(comparador, x.codigo));
  }
  /*Busca un codigo dentro de un arreglo devolviendo true si es encontrado o en otro caso false. */
  buscarObjeto(origenDatos: TipoAfeccionFamiliar[], buscado: Number): boolean {
    let encontrado = false;
    for (let i = 0; i < origenDatos.length; i++) {
      if (origenDatos[i].codigo === buscado) {
        encontrado = true;
        break;
      }
    }
    return encontrado;
  }
  getTodosTiposAfeccionesFamiliares() {
    return this.todosTiposAfeccionesFamiliares;
  }

  getCantidadTodosTiposAfeccioneFamiliares(): Number {
    return this.todosTiposAfeccionesFamiliares.length;
  }
}
