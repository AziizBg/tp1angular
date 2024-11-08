import { Directive, HostBinding, HostListener } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: 'input[appRainbowTyping]',
})
export class RainbowTypingDirective {

  //table de couleurs
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  @HostBinding("style.color")color = 'blue';
  @HostBinding("style.borderColor")borderColor ='yellow';

  changeColor() {
    const color = this.colors[Math.floor(Math.random()* this.colors.length)];
    this.color = color;
    this.borderColor= color;
  }

  // methode2
  // constructor(private el: ElementRef) {
  //   if (this.el.nativeElement.tagName !== 'INPUT') {
  //     // Si l'élément n'est pas un champ input, on arrête l'instanciation
  //     return;
  //   }
  //   this.changeColor();
  // }

  constructor() {
    this.changeColor();
   }

   @HostListener('keyup') onKeyUp(){
    this.changeColor();
   }


}
