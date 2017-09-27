import { Component, OnInit, Output, Input, AfterViewInit, ElementRef, Injectable } from '@angular/core';
import { Atencion } from './atencion';
import { AtencionService } from './atencion.service';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { Persona } from "./modelos/Persona";
import { ActivatedRoute} from '@angular/router';


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

  constructor(
    private atencionService: AtencionService, elementRef: ElementRef, public route: ActivatedRoute) {

    console.log('Codigo seros te cuida:' + elementRef.nativeElement.getAttribute('CodigoSerosTeCuida'));
    console.log('Hostname:' + elementRef.nativeElement.getAttribute('hostname'));
    console.log('Localname:' + elementRef.nativeElement.getAttribute('localname'));
    route.params.subscribe(params => {param => console.log(param)});

    let codigoSerosTeCuida = elementRef.nativeElement.getAttribute('CodigoSerosTeCuida');
    this.BASEURL = 'http://localhost:8080/SerosTeCuidaMaven/api/';
    // Trabajo con servidor fake
    //this.BASEURL = 'http://localhost:8080/';
    
    if (codigoSerosTeCuida) {
      console.log('tiene algo seros te cuida:' + codigoSerosTeCuida);
      this.CODIGOSEROS = codigoSerosTeCuida;
    }

    let hostname = elementRef.nativeElement.getAttribute('hostname');
    if (hostname) {
       this.BASEURL = 'http://' + hostname + ':8080/SerosTeCuidaMaven/api/'; // para local
      // this.BASEURL = 'http://' + hostname + '/SerosTeCuidaMaven/api/'; //para preproduccion
      console.log('Tiene algo hostname: ' + hostname);

    }
    /*
    atencionService.getPersona(this.BASEURL, this.CODIGOSEROS).subscribe(x => this.PERSONA = parseInt(x.persona),
      error => console.log(error),
      () => console.log('Persona queda con:' + this.PERSONA));
      */

    console.log('...Usando parametros:' + this.BASEURL + ' y ' + this.CODIGOSEROS + ' PERSONA:' + this.PERSONA);


  }

  getAtenciones(): void {
    /*this.atencionService.getAtencion().then(
      atenciones => this.atenciones = atenciones
    );
    */
  }

  ngOnInit(): void {
    // this.getAtenciones();

  }

  public setTitle(nuevoTitulo: string) {
    this.title = nuevoTitulo;
  }

  public getTitle(): string {
    return this.title;
  }

  public setCodigoPersona(codigo: Number) {
    console.log('Seteando codigo de persona en appcomponent');
    this.PERSONA = codigo;
  }






}
