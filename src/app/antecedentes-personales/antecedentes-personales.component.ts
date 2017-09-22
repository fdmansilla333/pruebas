import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TipoAfeccionPersonal } from '../modelos/TipoAfeccionPersonal';
import { TipoAfeccionesPersonalService } from './tipo_afecciones_personales_service';
import { Atencion } from './../atencion';
import { AntecedentePersonal } from '../modelos/AntecedentePersonal';

// 151489

@Component({
  moduleId: module.id,
  selector: 'app-antecedentes-personales',
  templateUrl: 'antecedentes-personales.component.html',
  styleUrls: ['antecedentes-personales.component.scss'],
  providers: [TipoAfeccionesPersonalService],
})
export class AntecedentesPersonalesComponent implements OnInit {
  @Input() todosTiposAfeccionesPersonales: TipoAfeccionPersonal[];

  constructor(servicesTiposAfeccionesPersonales: TipoAfeccionesPersonalService) {
    this.todosTiposAfeccionesPersonales = new Array<TipoAfeccionPersonal>();

    servicesTiposAfeccionesPersonales.getTiposAfeccionesPersonales()
    .subscribe(objeto => {
      objeto.map(afeccion => this.todosTiposAfeccionesPersonales.push(afeccion));
    });


  }
  ngOnInit() {

  }

}
