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
import { NgModel } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'app-buscar-paciente',
    templateUrl: 'buscar-paciente.component.html',
    styleUrls: ['buscar-paciente.component.scss'],
    providers: [AtencionService],
})

/**
 * componente que se encarga de buscar un paciente
 */
export class BuscarPacienteComponent implements OnInit, OnDestroy {

    @Input() persona: Persona;
    buscando: Boolean;
    public DNIBuscado: Number;
    sinResultados: Boolean;
    @Input() esPrimeraVez: Boolean = true;

/**
 * Obtiene los datos del paciente si es encontrado
 * Almacena el dni del paciente, 
 * y puede instanciarse con parametros
 * 
 * @param servicio 
 * @param appconfig 
 * @param route 
 * @param router 
 * @param routlet 
 */
    public constructor(public servicio: AtencionService, public appconfig: AppComponent,
        public route: ActivatedRoute, public router: Router, public routlet: RouterOutlet) {
        this.buscando = false;
        this.sinResultados = true;
        this.DNIBuscado = undefined;
        this.appconfig.DNIPERSONA = undefined;
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

            if (this.DNIBuscado) {
                this.appconfig.DNIPERSONA = this.DNIBuscado;
                this.buscarPorDni(this.DNIBuscado);
            }

        });
    }

    /**
     * Buscar personas por dni
     * @param dni 
     */
    buscarPorDni(dni: Number) {

        this.buscando = true;
        this.servicio.getDatosPersonaPorDni(this.appconfig.BASEURL, dni)
            .subscribe(datos => { // this.persona = datos,

                if (!datos) {
                    this.sinResultados = true;

                } else {
                    //datos = datos[0]; //TODO sacar esta linea en prerpoduccion
                    this.persona.numero_documento = datos.numero_documento;
                    this.persona.nombre = datos.nombre;
                    this.persona.codigo = datos.codigo;
                    this.appconfig.DNIPERSONA = this.persona.numero_documento;
                    this.persona.cuit_cuil = datos.cuit_cuil;
                    this.persona.dpersonal_calle = datos.dpersonal_calle;
                    this.persona.dpersonal_codigo_pos = datos.dpersonal_codigo_pos;
                    this.persona.dpersonal_email = datos.dpersonal_email;
                    this.persona.dpersonal_localidad = datos.dpersonal_localidad;
                    this.persona.dpersonal_numero = datos.dpersonal_numero;
                    this.persona.dpersonal_telefono = datos.dpersonal_telefono;
                    this.persona.dpersonal_telefono_codigo_area = datos.dpersonal_telefono_codigo_area;
                    this.persona.dpersonal_telefono_movil_codigo_area = datos.dpersonal_telefono_movil_codigo_area;
                    this.persona.dpersonal_telefono_movil_numero = datos.dpersonal_telefono_movil_numero;
                    this.persona.fecha_nacimiento = datos.fecha_nacimiento;
                    this.persona.fecha_ultima_vigencia = datos.fecha_ultima_vigencia;
                    this.persona.localidad_nacimiento = datos.localidad_nacimiento;
                    this.persona.nacionalidad = datos.nacionalidad;
                    this.persona.obra_social = datos.obra_social;
                    this.persona.sexo = datos.sexo;
                    this.persona.parentesco = datos.parentesco;
                    this.persona.tipo_documento = datos.tipo_documento;

                    // para que otros componentes tengan acceso a la persona
                    this.appconfig.PERSONA = this.persona.codigo;
                    

                }


            },
            error => {
                console.log(error);
                this.buscando = false;
                this.esPrimeraVez=false;
                this.sinResultados = true;

            },
            () => {

                // Una vez finalizada la petición
                //termine de buscar
                this.buscando = false;
                //Se desactiva la primera vez de la instancia para que muestre mensaje
                this.esPrimeraVez = false;
                this.sinResultados = false;

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



                //Una vez finalizado la recolección de la persona guardo datos para obtenerlo del modelo
                this.appconfig.OBJETO_PERSONA = this.persona;
                this.appconfig.codigoAtencion = 0; //TODO ver este nuevo cambio, seteado para que genere una neuva atencion
            });

    }

    /**
     * Utiliza el formulario para buscar
     * @param f 
     */
    buscar(f: NgForm) {
        this.buscando = true;
        if (f.valid) {
            this.buscarPorDni(f.value.busquedaPersona);
        }
    }

    /**
     * Devuelve verdadero si existe una persona instanciada Modelo persona
     */
    personaEncontrada(): Boolean {
        if (this.persona !== undefined) {
            if (this.persona.nombre !== '' && this.persona.codigo !== 0) {
                return true;
            }
        }
        return false;
    }

    /**
     * Bandera que sirve a la vista, para determinar si se encuentra buscando un paciente
     * 
     */
    buscandoPaciente(): Boolean {
        return this.buscando;
    }

    /**
     * Devuelve el estado original al salir
     */
    salir() {
        this.buscando = false;
        this.sinResultados = true;
    }

    /**
     * Ciclo de vida de Angular4, cuando el componente se destruye
     * [DEBUG]
     */
    ngOnDestroy(): void {
    }
    /**
     * Ciclo de vida de Angular4, cuando el componente se inicio
     * necesario para determinar si es primera vez.
     */
    ngOnInit(): void {
        this.esPrimeraVez = true;
    }

    /**
     * Paciente no encontrado, si finaliza la busqueda y no se encuentra por dni.
     */
    pacienteNoEncontrado(): Boolean {
        return !this.personaEncontrada() && !this.esPrimeraVez;
    }

    /**
     * Metodo utilizado para activar boton
     * Usado en la vista
     */
    activarBoton(): Boolean {

        if (!this.buscando && this.sinResultados) {

            return false; //activo el boton
        } else {

            return true; //desactivo el boton
        }

    }




}
