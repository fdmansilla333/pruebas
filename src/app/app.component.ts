import { Component, OnInit, Output, Input, AfterViewInit, ElementRef, Injectable } from '@angular/core';
import { Atencion } from './atencion';
import { AtencionService } from './atencion.service';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { Persona } from "./modelos/Persona";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

@Injectable()
export class AppComponent implements OnInit {
  public title = 'Historia clínica';
  atenciones: Atencion[];
  public BASEURL: string;
  public CODIGOSEROS: Number;
  public PERSONA: Number;
  public DNIPERSONA: Number;
  OBJETO_PERSONA: Persona;
  public SINCODIGOATENCION: Number = 0;
  public codigoAtencion: Number = 0; //Codigo de la atencion generado donde se necesite, y reutilizado en todos los componentes, por cada sesion

  /**
   * Constructor de la APP
   * @param atencionService Servicio encargado de las atenciones
   * @param elementRef Permite acceder a contenido del DOM
   * @param route Permite hacer redirecciones
   */
  constructor(
    private atencionService: AtencionService, elementRef: ElementRef, public route: ActivatedRoute) {

    this.codigoAtencion = this.SINCODIGOATENCION;
    console.log('nombreDominio:' + elementRef.nativeElement.getAttribute('hostname'));
    console.log('Localname:' + elementRef.nativeElement.getAttribute('localname'));
    //Se visualizan los parametros que posee
    route.params.subscribe(params => { param => console.log(param) });

    //this.BASEURL = 'http://localhost:8080/SerosTeCuidaMaven/api/';
    // Trabajo con servidor fake
    //this.BASEURL = 'http://localhost:8080';

    this.BASEURL = '/api'; // configurado el proxy conf 2 para que apunte a localhost:8080/SerosTeCuidaMaven/api/  y trabajar con el frontend en caliente 


    let hostname = elementRef.nativeElement.getAttribute('nombreDominio');
    //Si viene por parámetro, instanciado desde un jsp.
    if (hostname !== null) {

      //this.BASEURL = 'http://' + hostname + ':8080/SerosTeCuidaMaven/api'; // para pruebas en local
      this.BASEURL = 'http://' + hostname + '/SerosTeCuidaMaven/api'; //para preproduccion
      console.log('Tiene algo hostname: ' + hostname);

    }

    console.log('Usando parametros:' + this.BASEURL + ' y ' + ' PERSONA:' + this.PERSONA);


  }

  ngOnInit(): void {
  }

  /**
   * Cambiar el titulo de la App
   * @param nuevoTitulo 
   */
  public setTitle(nuevoTitulo: string) {
    this.title = nuevoTitulo;
  }

  /**
   * Obtener el titulo de la App
   */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Coloca el codigo identificatorio de la relacion persona 
   * @param codigo identificatorio de la tabla persona
   */
  public setCodigoPersona(codigo: Number) {
    this.PERSONA = codigo;
  }

  /**
   * Metodo que genera una nueva atencion en la BD, con la fecha actual, la descripcion, la persona y observacion
   * @param descripcion de tipo cadena, identificatorio para establecer el tipo de atencion (Evolucion ambulatoria,
   *  Antecedentes personales, Antecedentes Perinatologicos, etc.)
   * @param observacion de tipo cadena, utilizado para describir
   */
   public nuevaAtencion(descripcion: string, observacion: string): any {
    if (this.codigoAtencion == undefined) { //TODO verificar que los post no se realicen con path undefined 
      //se debe crear una atencion
      this.atencionService.setAtencion(this.BASEURL, new Atencion(new Date(), descripcion, this.PERSONA, observacion))
        .subscribe(res => this.codigoAtencion = res, error => console.log(error), () => {
          // DEBUG console.log('codigo de atencion obtenido: ' + this.codigoAtencion);
        });

    }
  }

}
