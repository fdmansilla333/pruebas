import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-pagina-no-encontrada',
    template: `
    <div class ="container">
    <h1 align="center"> Error </h1>
    <h2 align="center"> Pagina no encontrada </h2>
    </div>
    `,
    styleUrls: ['pagina-no-encontrada.component.scss']
})
/**
 * Componente para visualizar cuando la pagina buscada no existe
 */
export class PaginaNoEncontradaComponent {

}
