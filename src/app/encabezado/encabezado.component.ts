import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-encabezado',
  templateUrl: 'encabezado.component.html',
  styleUrls: ['encabezado.component.scss']
})
/**
 * Componente que sirve de encabezado en la APP
 */
export class EncabezadoComponent {
  @Input() titulo: String = 'Historia Clinica';
  public subtitulo: String;

  public getTitulo(): String {
    return this.titulo;
  }
  public setTitulo(titulo: String) {
    this.titulo = titulo;
  }

  constructor() {
    this.subtitulo = 'Atenciones';
  }

}
