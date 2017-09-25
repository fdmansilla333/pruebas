import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from '../modelos/Persona';
import { AtencionService } from '../atencion.service';
import { AppComponent } from '../app.component';
import { Localidad } from '../modelos/Localidad';
import { Pais } from '../modelos/Pais';
import { ObraSocial } from '../modelos/ObraSocial';
import { Parentesco } from '../modelos/Parentesco';
import { TipoDocumento } from '../modelos/TipoDocumento';
import { Afiliado } from '../modelos/Afiliado';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
    moduleId: module.id,
    selector: 'app-buscar-paciente',
    templateUrl: 'buscar-paciente.component.html',
    styleUrls: ['buscar-paciente.component.scss'],
    providers: [AtencionService],
})

export class BuscarPacienteComponent implements OnInit, OnDestroy {

    @Input() persona: Persona;
    buscando: Boolean;
    public DNIBuscado: Number;
    sinResultados: Boolean;

    public constructor(public servicio: AtencionService, public appconfig: AppComponent,
        public route: ActivatedRoute, public router: Router, public routlet: RouterOutlet) {

        this.buscando = false;
        this.sinResultados = false;
        this.DNIBuscado = undefined;
        this.appconfig.DNIPERSONA = undefined;
        // appconfig.title = 'Prueba de componente'; //cambiar esto desde el encabezado

        if (!this.persona) {
            this.persona = new Persona();
            this.persona.afiliado = new Afiliado();
            this.persona.datos_localidad = new Localidad();
            this.persona.datos_nacionalidad = new Pais();
            this.persona.datos_obra_social = new ObraSocial();
            this.persona.datos_tipoDocumento = new TipoDocumento();
            this.persona.datos_parentesco = new Parentesco();
        }

        route.params.subscribe(params => {
            this.DNIBuscado = params.id;
            console.log(this.DNIBuscado);

            if (this.DNIBuscado) {
                this.appconfig.DNIPERSONA = this.DNIBuscado;
                this.buscarPorDni(this.DNIBuscado);
            }

        });




    }

    buscarPorDni(dni: Number) {
        // Dejar de utilizar subscribe y utilizar el pipe async debe devolver un observer

        this.servicio.getDatosPersonaPorDni(this.appconfig.BASEURL, dni)
            .subscribe(datos => { // this.persona = datos,
                this.persona.numero_documento = datos[0].numero_documento;
                this.persona.nombre = datos[0].nombre;
                this.persona.codigo = datos[0].codigo;
                this.appconfig.DNIPERSONA = this.persona.numero_documento;
            },
            error => console.log(error),
            () => {/*
                this.appconfig.PERSONA = this.persona.codigo;

                this.servicio.getLocalidad(this.appconfig.BASEURL, this.persona.dpersonal_localidad)
                    .subscribe(localidad => this.persona.datos_localidad = localidad);

                this.servicio.getPais(this.appconfig.BASEURL, this.persona.nacionalidad)
                    .subscribe(pais => this.persona.datos_nacionalidad = pais);

                this.servicio.getTipoDocumento(this.appconfig.BASEURL, this.persona.tipo_documento)
                    .subscribe(tipoDocumento => this.persona.datos_tipoDocumento = tipoDocumento);

                this.servicio.getAfiliado(this.appconfig.BASEURL, this.persona.numero_documento)
                    .subscribe(afiliado => this.persona.afiliado = afiliado,
                    error => console.log(error),
                    () => {
                        this.servicio.getObraSocial(this.appconfig.BASEURL, this.persona.afiliado.obra_social)
                            .subscribe(obraSocial => this.persona.datos_obra_social = obraSocial);

                        this.servicio.getParentesco(this.appconfig.BASEURL, this.persona.afiliado.parentesco)
                            .subscribe(parentesco => this.persona.datos_parentesco = parentesco);

                    });



*/
            });

    }

    buscar(f: NgForm) {
        this.buscando = true;
        if (f.valid) {

            this.servicio.getDatosPersonaPorDni(this.appconfig.BASEURL, f.value.busquedaPersona)
                .subscribe(datos => {
                    if (!datos[0]) {
                        console.log('No tienen nada....');
                        this.buscando = false;
                        this.sinResultados = true;
                    }else {
                        console.log('Algo trae...');
                        console.log(datos);
                        this.persona.numero_documento = datos[0].numero_documento;
                        this.persona.nombre = datos[0].nombre;
                        this.persona.codigo = datos[0].codigo;
                        this.appconfig.DNIPERSONA = this.persona.numero_documento;
                        this.sinResultados = false;
                        this.buscando = false;
                    }

                }
                , error => {
                    console.log(error);
                    this.sinResultados = true;
                    this.buscando = false;
                },
                () => {
                    console.log('Termine de buscar....');
                    console.log('Persona codigo:' + this.persona.codigo);
                    /*
                    this.appconfig.PERSONA = this.persona.codigo;
                    this.DNIBuscado = this.persona.numero_documento; // Nuevo cambio
                    this.appconfig.DNIPERSONA = this.persona.numero_documento;
                    this.buscando = false; //ver donde seria la ultima llamada para que deje de mostrar buscando...

                    this.servicio.getLocalidad(this.appconfig.BASEURL, this.persona.dpersonal_localidad)
                        .subscribe(localidad => {console.log(localidad);this.persona.datos_localidad = localidad});

                    this.servicio.getPais(this.appconfig.BASEURL, this.persona.nacionalidad)
                        .subscribe(pais =>{console.log(pais); this.persona.datos_nacionalidad = pais});

                    this.servicio.getTipoDocumento(this.appconfig.BASEURL, this.persona.tipo_documento)
                        .subscribe(tipoDocumento => {console.log(tipoDocumento);this.persona.datos_tipoDocumento = tipoDocumento});

                    this.servicio.getAfiliado(this.appconfig.BASEURL, this.persona.numero_documento)
                        .subscribe(afiliado => {console.log(afiliado);this.persona.afiliado = afiliado},
                        error => console.log(error),
                        () => {
                            this.servicio.getObraSocial(this.appconfig.BASEURL, this.persona.afiliado.obra_social)
                                .subscribe(obraSocial => {console.log(obraSocial);this.persona.datos_obra_social = obraSocial});

                            this.servicio.getParentesco(this.appconfig.BASEURL, this.persona.afiliado.parentesco)
                                .subscribe(parentesco => {
                                    console.log(parentesco);
                                    this.persona.datos_parentesco = parentesco;
                                });

                            this.sinResultados = false;
                        });
                */
                });
                console.log(this.persona);

        }
    }

    personaEncontrada(): Boolean {
        if (this.persona !== undefined) {
            if (this.persona.nombre !== '' && this.persona.codigo !== 0) {
                return true;
            }

        }
        return false;
    }

    personaNoEncontrada(): Boolean {
        return this.sinResultados;
    }

    buscandoPaciente(): Boolean {
        return this.buscando;
    }

    salir() {

        console.log('salir...');
    }
    ngOnDestroy(): void {
        console.log('Ng destroy explicito');
    }
    ngOnInit(): void {
        console.log('NG On init');


    }

    desactivarBoton(): Boolean {
        return this.buscando;
    }
}
