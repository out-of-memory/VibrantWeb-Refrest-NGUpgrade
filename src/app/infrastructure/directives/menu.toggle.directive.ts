import { Directive, ElementRef, Input,HostListener, Renderer } from '@angular/core';
@Directive({ selector: '[menuToggle]' })
export class MenuToggleDirective {
    @Input('menuToggle') isToggleOn:boolean=false;
    constructor(private el: ElementRef, private renderer: Renderer) {
      // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
    
    
    @HostListener('mouseclick') onMouseEnter() {
       
        //this.renderer.setElementClass(this.el, this.isToggleOn?'active':'',true);
           // $("#slide-out").removeClass("active");
           console.log("directive fired");
  }
    
}