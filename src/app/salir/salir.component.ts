import { Component, Inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'salir',
    templateUrl: 'salir.component.html',
    styleUrls: ['salir.component.scss']
})
export class SalirComponent {
    
    constructor(appconfig: AppComponent, @Inject(DOCUMENT) private document: Document) {
        console.log('Saliendo...');
        //document.location.href = appconfig.BASEURL + '../';
    }
    
}
