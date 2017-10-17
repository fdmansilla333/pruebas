/**
 * Modelo de datos evolucion ambulatoria
 */
import { Persona } from "./Persona";

export class EvolucionAmbulatoria {
  codigo: Number = 0;
  atencion: Number = 0;
  antecedente_personal: Number = 0;

  fecha: Date;
  peso: Number = 0;
  talla: Number = 0;
  pc: Number = 0;
  edad: Number = 0;
  public imc: Number = 0;
  percentilos_pc_edad: Number = 0;
  percentilos_peso_edad: Number = 0;
  percentilos_talla_edad: Number = 0;
  percentilos_imc_edad: Number = 0;
  presion_arterial: String = '';
  presion_arterial_den: String = '';
  perimetro_abdominal: Number = 0;
  vacunacion: boolean = false;
  enfermedades_cronicas: string = '';
  estado_nutricional: string = '';
  motivo_de_consulta: string = '';
  enfermedad_actual: string = '';
  examen_fisico: string = '';
  diagn_problema_salud: string = '';
  plan_tratamiento: string = '';
  indicacion_lab: string = '';
  indicacion_medicacion: string = '';
  solicitud_de_derivacion: string = '';
  solicitud_de_derivacion_interconsulta = '';
  meses: Number = 0;
  hipertension: boolean = false;
  diabetes: boolean = false;
  otras: boolean = false;
  otrasTexto: string = '';
  primeraVez: boolean = false;
  consejerias: string = '';
  interconsulta: boolean = false;
  internacion: boolean = false;
  constructor(persona: Persona, hoy: Date) {


    let nacimiento: Date = new Date(persona.fecha_nacimiento);
    this.edad = hoy.getFullYear() - nacimiento.getFullYear(); // TODO ver esto, dado que se necesita ver la cantidad de años y meses
    this.fecha = hoy;
    // agregando slice
    // "2017-09-28 17:10:24"
    // this.fecha = "'"+hoy.toISOString().slice(0, 10)+"'";
    if (hoy.getMonth() > nacimiento.getMonth()) {
      this.meses = hoy.getMonth() - nacimiento.getMonth();
    } else {
      if (hoy.getMonth() < nacimiento.getMonth()) {
        this.meses = hoy.getMonth() + 1;
      } else {
        this.meses = hoy.getMonth() - nacimiento.getMonth();
      }
    }


    //Agregar calculo de meses


  }

  calcularIMC() {
    //recordar que la talla viene en CM pasar a --> m
    this.imc = Number(this.peso) / ((Number(this.talla) / 100) * (Number(this.talla) / 100));
    console.log('IMC:' + this.imc);
    if (this.imc >= 19 && this.imc <= 25) {
      this.estado_nutricional = 'Normal';
    } else {
      if (this.imc < 19) {
        this.estado_nutricional = 'Desnutrido';
      } else {
        this.estado_nutricional = 'Sobrepeso';
      }
    }
  }


}
