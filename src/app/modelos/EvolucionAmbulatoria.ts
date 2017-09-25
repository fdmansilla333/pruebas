import { Persona } from "./Persona";

export class EvolucionAmbulatoria {
  codigo: Number = 0;
  atencion: Number = 0;
  antecedente_personal: Number = 0;

  fecha: Date = new Date();
  peso: Number = 0;
  talla: Number = 0;
  pc: Number = 0;
  edad: Number = 0;
  public imc: Number = 0;
  percentilos_pc_edad: Number = 0;
  percentilos_peso_edad: Number = 0;
  percentilos_talla_edad: Number = 0;
  percentilos_imc_edad: Number = 0;
  presion_arterial: Number = 0;
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

  constructor(persona: Persona, hoy: Date) {

    
    let nacimiento = new Date(persona.fecha_nacimiento); 
    this.edad = hoy.getFullYear() - nacimiento.getFullYear();
    this.fecha = hoy;

    this.meses = hoy.getMonth() - nacimiento.getMonth();
  

  }

  calcularIMC(){
    //recordar que la talla viene en CM pasar a --> m
    this.imc = Number(this.peso) / ((Number(this.talla)/100) * (Number(this.talla)/100));
    console.log('IMC:' + this.imc);
    if (this.imc >= 19 && this.imc <=25){
      this.estado_nutricional = 'Normal';
    }else{
      if (this.imc < 19){
        this.estado_nutricional = 'Desnutrido';
      }else{
        this.estado_nutricional = 'Sobrepeso';
      }
    }
  }


}