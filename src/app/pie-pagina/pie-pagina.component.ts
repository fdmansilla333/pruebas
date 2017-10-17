import { Component, Input } from '@angular/core';
import {AppComponent} from '../app.component';
@Component({
    moduleId: module.id,
    selector: 'app-pie-pagina',
    templateUrl: 'pie-pagina.component.html',
    styleUrls: ['pie-pagina.component.scss']
})
/**
 * componente para el pie de página
 */
export class PiePaginaComponent {
@Input() public baseURL: string;
constructor (appconfig:AppComponent){
    if (appconfig.BASEURL){
        this.baseURL = appconfig.BASEURL;
    }
}
}
