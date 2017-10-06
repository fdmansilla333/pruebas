import { Component, Input } from '@angular/core';
import { MedicamentoConsume } from '../modelos/MedicamentoConsume';
import { MedicamentosConsumeService } from './medicamentos-consume.service';
import { AppComponent } from '../app.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Producto } from "../modelos/Producto";
import { AtencionService } from '../atencion.service';
import { Atencion } from "../atencion";
//import {SearchFilterPipe} from './medicamentos.filter';

@Component({
  moduleId: module.id,
  selector: 'app-medicamentos-consume',
  templateUrl: 'medicamentos-consume.component.html',
  styleUrls: ['medicamentos-consume.component.scss'],
  providers: [MedicamentosConsumeService, AtencionService],
})
export class MedicamentosConsumeComponent {
  @Input() medicamentosConsume: MedicamentoConsume[];

  public medicamentos: Producto[];
  public seleccionado: Number;
  public descripcion: String;
  public busqueda: string;
  public atencion: any;


  constructor(public mcService: MedicamentosConsumeService, public appconfig: AppComponent, public ngxSmartModalService: NgxSmartModalService, public atencionService: AtencionService) {
    this.medicamentosConsume = new Array<MedicamentoConsume>();

    this.medicamentos = new Array<Producto>();

    mcService.getMedicamentos()
      .subscribe(res => this.medicamentos = res);

    mcService.getMedicamentosConsume(appconfig.PERSONA) 
      .subscribe(x => x.map(y => y.map(z =>
        this.medicamentosConsume.push(z))),error => console.log(error), () => {
          //Al finalizar la incorporacion de los productos que consume la persona,
          //se trae la presentacion, dosificacion
         //Se recorre todos los medicamentos
         this.medicamentosConsume = this.medicamentosConsume.map( m => {
           this.mcService.getProductoPorCodigo(m.producto)
           .subscribe(res => {
             //esto me devuelve un producto
             m.nombre = res.nombre;
             m.presentacion = res.presentacion;
             

           });
           return m;
         });
        });

    //TODO subir al app conf obtener la atencion...
    if (this.appconfig.codigoAtencion == undefined) { //TODO verificar que los post no se realicen con path undefined 
      console.log('Pidiendo...');
      //se debe crear una atencion
      this.atencionService.setAtencion(this.appconfig.BASEURL, new Atencion(new Date(), 'Medicamentos Consume', this.appconfig.PERSONA, ''))
        .subscribe(res => { console.log(this.atencion); this.atencion = res; });
      this.appconfig.codigoAtencion = this.atencion;
      //TODO chequear....
    } else {
      this.atencion = this.appconfig.codigoAtencion;
    }
    console.log(this.medicamentosConsume);
    console.log('Usando atencion:' + this.atencion);
  }
  actualizar() {
    this.medicamentosConsume.map(m => this.medicamentosConsume.pop());

    this.mcService.getMedicamentosConsume(this.appconfig.PERSONA) 
    .subscribe(x => x.map(y => y.map(z =>
      this.medicamentosConsume.push(z))));
  }

  getCantidadMedicamentosConsume(): Number {
    return this.medicamentosConsume.length;
  }

  getResultadosMedicamentos(): Number {
    return this.medicamentos.length;
  }
  getCantidadCaracteres(): Number {
    return this.busqueda.length;
  }


  public log(msg: string) {
    console.log(msg);

  }

  mostrar() {
    this.ngxSmartModalService.closeLatestModal();
  }

  guardar() {
    this.ngxSmartModalService.closeLatestModal();
    if (this.atencion) {
      let medicamento = new MedicamentoConsume(null, this.atencion, this.seleccionado,this.descripcion,null,null,null )
      this.mcService.setMedicamentosConsume(medicamento)
      .subscribe(res => console.log(res), error=> console.log(error), ()=>{
        this.actualizar();
      });
    }else{
      console.log('No se proporciono una atencion');
    }
  }
}
