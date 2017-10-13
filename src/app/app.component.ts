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
  public SINCODIGOATENCION: Number = 0;
  public codigoAtencion: Number=0; //Codigo de la atencion generado donde se necesite, y reutilizado en todos los componentes, por cada sesion

  constructor(
    private atencionService: AtencionService, elementRef: ElementRef, public route: ActivatedRoute) {

    this.codigoAtencion = this.SINCODIGOATENCION;
    console.log('nombreDominio:' + elementRef.nativeElement.getAttribute('hostname'));
    console.log('Localname:' + elementRef.nativeElement.getAttribute('localname'));
    route.params.subscribe(params => {param => console.log(param)});

    //let codigoSerosTeCuida = elementRef.nativeElement.getAttribute('CodigoSerosTeCuida');
    //this.BASEURL = 'http://localhost:8080/SerosTeCuidaMaven/api/';
    // Trabajo con servidor fake
    //this.BASEURL = 'http://localhost:8080';
    
    this.BASEURL = '/api'; // configurado el proxy conf 2 para que apunte a localhost:8080/SerosTeCuidaMaven/api/  y trabajar con el frontend en caliente 
    //this.BASEURL = ''; servidor fake2
    /*
    if (codigoSerosTeCuida !== undefined) {
      console.log('tiene algo seros te cuida:' + codigoSerosTeCuida);
      this.CODIGOSEROS = codigoSerosTeCuida;
    }
    */

    let hostname = elementRef.nativeElement.getAttribute('nombreDominio');
    if (hostname !== null) {
      
       //this.BASEURL = 'http://' + hostname + ':8080/SerosTeCuidaMaven/api'; // para pruebas en local
       this.BASEURL = 'http://' + hostname + '/SerosTeCuidaMaven/api'; //para preproduccion
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
    /*
    this.atencionService.getAtencion().then(
      atenciones => this.atenciones = atenciones
    );*/
    
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

  public nuevaAtencion(descripcion: string, observacion:string): any {
    if (this.codigoAtencion == undefined) { //TODO verificar que los post no se realicen con path undefined 
      //se debe crear una atencion
      this.atencionService.setAtencion(this.BASEURL, new Atencion(new Date(), descripcion, this.PERSONA, observacion))
        .subscribe(res => this.codigoAtencion = res, error => console.log(error), () => {
          console.log('codigo de atencion obtenido: ' + this.codigoAtencion);
        });
      
      //TODO chequear....
    } 
  }

  /* TODO ver inv

  Observable.interval(100).subscribe(x => console.log(x));

  .retry(10);

  observable1.merge(observavle2);

  Observable.fronEvent(this.search.nativeElement, 'keyup')
  .debounceTime(1000)
  distintcuntilchange
  debe estar en ngonit ver input 

  ? valores opcionales
  .switchmap
  */




}
