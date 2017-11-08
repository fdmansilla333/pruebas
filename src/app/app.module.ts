import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { CustomFormsModule } from 'ng2-validation' // <-- agregado para validaciones no implementadas  https://github.com/yuyang041060120/ng2-validation
import { AppComponent } from './app.component';
import { AtencionService } from './atencion.service';
import { HttpModule } from '@angular/http';
import { FormularioAtencionComponent } from './formulario-atencion/formulario-atencion.component';
// tslint:disable-next-line:max-line-length
import { FormularioAntecedentesFamiliaresComponent } from './formulario-antecedentes-familiares/formulario-antecedentes-familiares.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { FormularioAltaAtencionComponent } from './formulario-alta-atencion/formulario-alta-atencion.component';
import { PaginaNoEncontradaComponent } from './pagina-no-encontrada/pagina-no-encontrada.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { AntecedentesFamiliaresComponent } from './antecedentes_familiares/antecedentes-familiares.component';
import { TabsComponent } from './tabs/tabs.component';
import { AntecedentesComponent } from './antecedentes/antecedentes.component';
import { AntecedentesPersonalesComponent } from './antecedentes-personales/antecedentes-personales.component';
import { TipoAfeccionFamiliar } from './modelos/TipoAfeccionFamiliar';
import { SiniestrosAccidentesComponent } from './siniestros-accidentes/siniestros-accidentes.component';
import { MedicamentosAlergiaComponent } from './medicamentos-alergia/medicamentos-alergia.component';
import { MedicamentosConsumeComponent } from './medicamentos-consume/medicamentos-consume.component';
import { HabitosComponent } from './habitos/habitos.component';
import { EvolucionAmbulatoriaComponent } from './evolucion-ambulatoria/evolucion-ambulatoria.component';
import { SalirComponent } from './salir/salir.component';
import { AntecedentesPerinatologicosComponent } from './antecedentes-perinatologicos/antecedentes-perinatologicos.component';
import { BuscarPacienteComponent } from './buscar-paciente/buscar-paciente.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import {HttpClientModule} from '@angular/common/http';
import {SearchFilterPipe} from './medicamentos-consume/medicamentos.filter';
import {SearchFilter2Pipe} from './medicamentos-consume/medicamentos.filter2';
import {BooleanFilterPipe} from './medicamentos-consume/medicamentos.filter.boolean';
import {NgxMagicSearchComponent} from  'ngx-magicsearch';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import {ListarProblemasSaludComponent} from './listar-problemas-salud/listar-problemas-salud.component';
/*Constantes utilizadas en la aplicación*/

import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

const appRoutes: Routes = [
  {path: '', redirectTo: '/buscar' , pathMatch: 'full'},
  {path: 'buscar/evolucionAmbulatoria', redirectTo: '/evolucionAmbulatoria', pathMatch: 'prefix'},
  {path: 'evolucionAmbulatoria', redirectTo: '/evolucionAmbulatoria', pathMatch: 'full'},
  {path: 'evolucionAmbulatoria', component: EvolucionAmbulatoriaComponent },
  {path: 'buscar', component: BuscarPacienteComponent },
  {path: 'buscar/:id', component: BuscarPacienteComponent },
  {path: 'antecedentes_perinatologicos', component: AntecedentesPerinatologicosComponent },
  {path: 'antecedentes', component: AntecedentesComponent },
  {path: 'salir', component: SalirComponent },
  {path: 'HistoriaClinica', redirectTo: '/buscar', pathMatch: 'prefix'},
  {path: 'ng', redirectTo: '/buscar', pathMatch: 'prefix'},
  {path: 'listado', redirectTo: '/listado', pathMatch: 'prefix'},
  {path: 'listado', component: ListarProblemasSaludComponent },
  
  // match con cualquier path, acceso desde afuera
 /* { path: ':id', component: BuscarPacienteComponent },
  { path: '', component: BuscarPacienteComponent },
  { path: 'SerosTeCuidaMaven/historia_clinica/pruebaAngular2/:id', component: BuscarPacienteComponent },*/
  // ver este path SerosTeCuidaMaven/historia_clinica/pruebaAngular2/:id
  /*
  { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  */
  // { path: '**', component: BuscarPacienteComponent }
   { path: '**', component: PaginaNoEncontradaComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    BuscarPacienteComponent,
    FormularioAtencionComponent,
    FormularioAntecedentesFamiliaresComponent,
    PiePaginaComponent,
    ContenedorComponent,
    FormularioAltaAtencionComponent,
    PaginaNoEncontradaComponent,
    ConsultaComponent,
    AntecedentesComponent,
    AntecedentesFamiliaresComponent,
    AntecedentesPersonalesComponent,
    TabsComponent,
    SiniestrosAccidentesComponent,
    MedicamentosAlergiaComponent,
    MedicamentosConsumeComponent,
    HabitosComponent,
    EvolucionAmbulatoriaComponent,
    AntecedentesPerinatologicosComponent,
    SalirComponent,
    SearchFilterPipe,//agregado para filtrar en grandes busquedas
    SearchFilter2Pipe, //agregado para dos parametros
    BooleanFilterPipe, //pipe para parsear booleanos a mensajes español
    NgxMagicSearchComponent,
    ListarProblemasSaludComponent,
    


  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    FormsModule,
    CustomFormsModule, // Agregado para validaciones especificas
    NguiAutoCompleteModule, // autocomplete module
    AngularFontAwesomeModule,//iconografia
    Ng2SearchPipeModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
       // { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [AtencionService, NgxSmartModalService],
  bootstrap: [
    AppComponent,
  ],


})



export class AppModule { }
