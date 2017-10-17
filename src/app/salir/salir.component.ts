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
/**
 * Componente llamado para salir.
 */
export class SalirComponent {
    
    constructor(appconfig: AppComponent, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.router.navigateByUrl('/buscar');
    }
    
}
