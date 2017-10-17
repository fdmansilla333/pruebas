import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TipoAfeccionPersonal } from '../modelos/TipoAfeccionPersonal';
import { TipoAfeccionesPersonalService } from './tipo_afecciones_personales_service';
import { Atencion } from './../atencion';
import { AntecedentePersonal } from '../modelos/AntecedentePersonal';
import { AppComponent } from '../app.component';
import { AtencionService } from "../atencion.service";


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

  /**
   * Obtiene todos los tipos de afecciones personales que existen y que posee una persona
   * Luego filtra los que tiene un determinado paciente.
   * @param app 
   * @param atencionService 
   * @param servicesTiposAfeccionesPersonales 
   */
  constructor(public app: AppComponent, public atencionService: AtencionService, public servicesTiposAfeccionesPersonales: TipoAfeccionesPersonalService) {
    this.todosTiposAfeccionesPersonales = new Array<TipoAfeccionPersonal>();

    servicesTiposAfeccionesPersonales.getTiposAfeccionesPersonales()
      .subscribe(objeto => {
        objeto.map(afeccion => this.todosTiposAfeccionesPersonales.push(afeccion));
      });

    servicesTiposAfeccionesPersonales.getTipoAfeccionesQuePoseePersona(app.PERSONA)
      .subscribe(res => this.poseeTiposAfeccionesPersonales = res, error => console.log(error), () => {
        //Una vez finalizado el proceso busco en la lista de los que posee
        //TODO agregar los elementos no duplicados...
        this.poseeTiposAfeccionesPersonales.map(
          elemento => {

            //Saco los elementos que se encuentran que tiene el paciente como antecedentes
            //del conjunto de todos los posibles y los activo para visualizarlos en la UI
            this.todosTiposAfeccionesPersonales = this.todosTiposAfeccionesPersonales.filter(e => e.nombre !== elemento.nombre);
            elemento.activado = true; //para visualizarlo
            elemento.posee = true;
            this.todosTiposAfeccionesPersonales.push(elemento);
          }

        );
      });


  }

  /**
   * Este metodo es accionado como evento cuando se realiza el submmit 
   * Recorre la coleccion todos tipos de afecciones personales
   * Por cada check que se encuentra marcado, se actualiza en BD, si se encontraba marcado
   * y se desmarca actualiza el campo con anulación
   */
  guardar() {
    console.log(this.todosTiposAfeccionesPersonales);
    //Se verifica que se posea atencion, sino se crea una.
    if (this.app.codigoAtencion == this.app.SINCODIGOATENCION) {
      let atencion = new Atencion(new Date(), 'Antecedentes Personales', this.app.PERSONA, '');
      let codigoObtenido;
      this.atencionService.setAtencion(this.app.BASEURL, atencion)
        .subscribe(res => codigoObtenido = res,
        error => console.log(error),
        () => { //Cuando finaliza
          console.log('Atencion codigo:' + codigoObtenido);
          this.app.codigoAtencion = codigoObtenido;
          this.enviarTiposAntecedentesPersonales();
        }
        );
    } else {
      this.enviarTiposAntecedentesPersonales();
    }

  }

  /**
   * Se encarga de enviar todos los tipos de antecedentes personales que se encuentran modificados
   * en la coleccion
   */
  enviarTiposAntecedentesPersonales() {

    //por cada afeccion controlo y envío los cambios
    this.todosTiposAfeccionesPersonales.map(a => {
      //Caso en que desmarca
      //Se actualiza la atencion
      if (!a.activado && a.posee) {
        console.log('actualizando...');
        console.log(a);
        this.servicesTiposAfeccionesPersonales.putTipoAfeccionPersonal(a)
          .subscribe(res => { console.log(res); a.posee = false }, error => { a.activado = true; alert('Hubo error al procesar ' + a.descripcion) });

      } else {

        //caso en que marca uno nuevo
        //se genera un nuevo registro en antecedentes personales
        if (a.activado && !a.posee) {
          console.log('Agregando...');
          console.log(a);
          //Al agregar uno nuevo se debe traer el nuevo id.
          this.servicesTiposAfeccionesPersonales.setTipoAfeccionPersonal(this.app.codigoAtencion, a)
            .subscribe(res => { console.log(res); a.posee = true; a.codigoAntecedentePersonal = res.json().codigo }, error => { a.activado = false; alert('Hubo error al procesar ' + a.descripcion) });
          console.log('queda:');
          console.log(a);
        }
      }

    });

  }


}
