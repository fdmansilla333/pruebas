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
export class AntecedentesFamiliaresComponent implements OnInit {
  @Input() todosTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];
  @Input() poseeTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];
  @Input() faltanTiposAfeccionesFamiliares: TipoAfeccionFamiliar[];


  constructor(public servicesTiposAfeccionesFamiliares: TipoAfeccionesAntecedentesService,
    public atencionService: AtencionService, public app: AppComponent) {
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

  /**
   * Almacena los datos del formulario llamando al post de antecedenteFamiliar
   */
  guardar() {
    console.log('Guardando...');
    //TODO resolver las atenciones si son una unica instancia
    if (this.app.codigoAtencion === 0) {
      // Se debe generar una nueva atencion
      let atencion = new Atencion(new Date(), 'Antecedentes familiares', this.app.PERSONA, '');
      let codigoObtenido;
      this.atencionService.setAtencion(this.app.BASEURL, atencion)
        .subscribe(res => codigoObtenido = res,
        error => console.log(error),
        () => {
          this.app.codigoAtencion = codigoObtenido;
          this.enviarAntecedentesFamiliares();
        }
        );
    } else {
      //Se utiliza el proporcionado... por la app
      this.enviarAntecedentesFamiliares();
    }
  }

  /**
   * Metodo que se encarga de enviar todos los cambios realizados en la interfaz
   */
  enviarAntecedentesFamiliares() {

    let errorPosee = false;
    let errorFalta = false;

    this.poseeTiposAfeccionesFamiliares.forEach(antecFamiliar => {
      //envia aquellos que se encuentra desactivados (anulados) para dar de baja
      if (!antecFamiliar.activado) {

        this.servicesTiposAfeccionesFamiliares.putTipoAtencionFamiliar(antecFamiliar)
          .subscribe(res => console.log(res), error => errorPosee = true, () => {
            if (errorPosee) {
              alert("No se pudo procesar satisfactoriamente los cambios");
            } else {
              //quitar este elemento
              this.poseeTiposAfeccionesFamiliares = this.poseeTiposAfeccionesFamiliares.filter(a => a !== antecFamiliar);
              //agregarlo a la otra coleccion
              this.faltanTiposAfeccionesFamiliares.push(antecFamiliar);

            }
          });
      }
    });

    this.faltanTiposAfeccionesFamiliares.forEach(element => {
      //Si se selecciona un elemento que se agrega como antecedente se quita de la lista de los que no posee
      //y se agrega a la lista de los que posee para que la UI lo sepa.
      if (element.activado) {

        this.servicesTiposAfeccionesFamiliares.setTipoAtencionFamiliar(this.app.codigoAtencion, element)
          .subscribe(res => console.log(res), error => errorFalta = true, () => {
            if (errorFalta) {
              alert("No se pudo procesar satisfactoriamente los cambios");
            } else {
              //quitar este elemento
              this.faltanTiposAfeccionesFamiliares = this.faltanTiposAfeccionesFamiliares.filter(a => a !== element);
              //agregarlo a la otra coleccion
              this.poseeTiposAfeccionesFamiliares.push(element);

            }
          });
      }
    });

    if (errorPosee || errorFalta) {
      alert("Error al procesar los antecedentes familiares...");
    }

  }
}
