import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-encabezado',
  templateUrl: 'encabezado.component.html',
  styleUrls: ['encabezado.component.scss']
})
@Injectable()
export class EncabezadoComponent {
  @Input()titulo: String = 'Historia Clinica';
  subtitulo: String = 'Atenciones';

  public getTitulo(): String {
    return this.titulo;
  }
  public setTitulo(titulo: String) {
    this.titulo = titulo;
  }

}
