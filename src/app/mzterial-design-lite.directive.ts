import { Directive, AfterViewInit } from '@angular/core';
declare var componentHandler;

@Directive({
  selector: '[appMzterialDesignLite]'
})
export class MzterialDesignLiteDirective  implements AfterViewInit{
  
    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }
}
