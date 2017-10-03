import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TipoAfeccionPersonal } from '../modelos/TipoAfeccionPersonal';
import { TipoAfeccionesPersonalService } from './tipo_afecciones_personales_service';
import { Atencion } from './../atencion';
import { AntecedentePersonal } from '../modelos/AntecedentePersonal';
import { AppComponent } from '../app.component';


@Component({
  moduleId: module.id,
  selector: 'app-antecedentes-personales',
  templateUrl: 'antecedentes-personales.component.html',
  styleUrls: ['antecedentes-personales.component.scss'],
  providers: [TipoAfeccionesPersonalService],
})
export class AntecedentesPersonalesComponent {
  @Input() todosTiposAfeccionesPersonales: TipoAfeccionPersonal[];
  poseeTiposAfeccionesPersonales: TipoAfeccionPersonal[];

  constructor(app: AppComponent, servicesTiposAfeccionesPersonales: TipoAfeccionesPersonalService) {
    this.todosTiposAfeccionesPersonales = new Array<TipoAfeccionPersonal>();

    servicesTiposAfeccionesPersonales.getTiposAfeccionesPersonales()
      .subscribe(objeto => {
        objeto.map(afeccion => this.todosTiposAfeccionesPersonales.push(afeccion));
      });

    console.log('Buscando en antecedentes personales:');
    servicesTiposAfeccionesPersonales.getTipoAfeccionesQuePoseePersona(app.PERSONA)
      .subscribe(res => this.poseeTiposAfeccionesPersonales = res, error => console.log(error), () => {
        //Una vez finalizado el proceso busco en la lista de los que posee
        //TODO agregar los elementos no duplicados...
        this.poseeTiposAfeccionesPersonales.map(
          elemento => {
            console.log('Finalizando....');
            //Saco los elementos que se encuentran en poseeTipos en todos
            this.todosTiposAfeccionesPersonales = this.todosTiposAfeccionesPersonales.filter(e => e.codigo !== elemento.codigo);
            elemento.activado = true; //para visualizarlo
            this.todosTiposAfeccionesPersonales.push(elemento);
          }

        );
      });


  }


}
