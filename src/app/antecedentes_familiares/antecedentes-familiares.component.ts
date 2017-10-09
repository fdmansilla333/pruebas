import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TipoAfeccionFamiliar } from '../modelos/TipoAfeccionFamiliar';
import { TipoAfeccionesAntecedentesService } from './tipo_afecciones_antecedentes_service';
import { Atencion } from './../atencion';
import { AntecedenteFamiliar } from '../modelos/AntecedenteFamiliar';
import { Observable } from 'rxjs/Observable';
import { AtencionService } from '../atencion.service';
import { AppComponent } from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Component({
  moduleId: module.id,
  selector: 'app-antecedentes-familiares',
  templateUrl: 'antecedentes-familiares.component.html',
  styleUrls: ['antecedentes-familiares.component.scss'],
  providers: [TipoAfeccionesAntecedentesService, AtencionService],
})
export class AntecedentesFamiliaresComponent  {
  @Input() todosTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];
  @Input() poseeTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];
  @Input() faltanTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];


  constructor(public servicesTiposAfeccionesFamiliares: TipoAfeccionesAntecedentesService,
    public atencionService: AtencionService, public app: AppComponent) {
    this.todosTiposAfeccionesFamiliares = new Array<TipoAfeccionFamiliar>();
    this.poseeTiposAfeccionesFamiliares = new Array<TipoAfeccionFamiliar>();
    this.faltanTiposAfeccionesFamiliares = new Array<TipoAfeccionFamiliar>();


    servicesTiposAfeccionesFamiliares.getTiposAfeccionesFamiliares()
      .subscribe(objeto => {
        objeto.map(afeccion => this.todosTiposAfeccionesFamiliares.push(afeccion));
      }); // nuevo cambio adaptandolo equivalente al personal
      /*,
      error => console.log(error),
      () => {
        servicesTiposAfeccionesFamiliares.getTipoAfeccionesQuePoseePersona(app.PERSONA)
          .subscribe(objeto => {
            console.log(objeto);
            objeto.map(afeccion => {
              console.log(afeccion);
              afeccion.activado = true; //TODO ver este nuevo cambio
              this.poseeTiposAfeccionesFamiliares.push(afeccion)
            });
          },
          error => console.log(error),
          () => {
            this.faltanTiposAfeccionesFamiliares =
              this.verificarDuplicados(this.todosTiposAfeccionesFamiliares, this.poseeTiposAfeccionesFamiliares);
          });

      });*/


      //cambio traido de antecedentes personales
      servicesTiposAfeccionesFamiliares.getTipoAfeccionesQuePoseePersona(app.PERSONA)
      .subscribe(res => this.poseeTiposAfeccionesFamiliares = res, error => console.log(error), () => {
        //Una vez finalizado el proceso busco en la lista de los que posee
        //TODO agregar los elementos no duplicados...
        this.poseeTiposAfeccionesFamiliares.map(
          elemento => {

            //Saco los elementos que se encuentran que tiene el paciente como antecedentes
            //del conjunto de todos los posibles y los activo para visualizarlos en la UI
            this.todosTiposAfeccionesFamiliares = this.todosTiposAfeccionesFamiliares.filter(e => e.nombre !== elemento.nombre);
            elemento.activado = true; //para visualizarlo
            elemento.posee = true;
            this.todosTiposAfeccionesFamiliares.push(elemento);
          }

        );
      }); 

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

  /**
   * Almacena los datos del formulario llamando al post/put de antecedenteFamiliar
   */
  guardar() {
    console.log('Guardando...');
    //TODO resolver las atenciones si son una unica instancia
    if (this.app.codigoAtencion === undefined) {
      // Se debe generar una nueva atencion
      let atencion = new Atencion(new Date(), 'Antecedentes familiares', this.app.PERSONA, '');
      let codigoObtenido;
      this.atencionService.setAtencion(this.app.BASEURL, atencion)
        .subscribe(res => codigoObtenido = res,
        error => console.log(error),
        () => {
          this.app.codigoAtencion = codigoObtenido;
          this.enviarAntecedentesFamiliares2();
        }
        );
    } else {
      //Se utiliza el proporcionado... por la app
      this.enviarAntecedentesFamiliares2();
    }
  }

  enviarAntecedentesFamiliares2(){
     //por cada afeccion controlo y envío los cambios
     this.todosTiposAfeccionesFamiliares.map(a => {
      //Caso en que desmarca
      //Se actualiza la atencion
      if (!a.activado && a.posee) {
        console.log('actualizando...');
        console.log(a);
        this.servicesTiposAfeccionesFamiliares.putTipoAtencionFamiliar(a)
          .subscribe(res => { console.log(res); a.posee = false }, error => { a.activado = true; alert('Hubo error al procesar ' + a.descripcion) });

      } else {

        //caso en que marca uno nuevo
        //se genera un nuevo registro en antecedentes personales
        if (a.activado && !a.posee) {
          console.log('Agregando...');
          console.log(a);
          //Al agregar uno nuevo se debe traer el nuevo id.
          this.servicesTiposAfeccionesFamiliares.setTipoAtencionFamiliar(this.app.codigoAtencion, a)
            .subscribe(res => { console.log(res); a.posee = true; a.codigoAntecedenteFamiliar = res.json().codigo }, error => { a.activado = false; alert('Hubo error al procesar ' + a.descripcion) });
            console.log('queda:');
            console.log(a);
        }
      }

    });
  }
}
