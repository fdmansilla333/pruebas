import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
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
/*Constantes utilizadas en la aplicación*/

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


  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    HttpModule,
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
