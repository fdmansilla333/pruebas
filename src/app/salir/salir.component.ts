import { Component, Inject } from '@angular/core';
import { AppComponent } from '../app.component';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'salir',
    templateUrl: 'salir.component.html',
    styleUrls: ['salir.component.scss']
})
export class SalirComponent {
    
    constructor(appconfig: AppComponent, @Inject(DOCUMENT) private document: Document, private router: Router) {
        console.log('Saliendo...cambiando build');
        //document.location.href = appconfig.BASEURL + '../';
    this.router.navigateByUrl('/buscar');
    }
    
}
