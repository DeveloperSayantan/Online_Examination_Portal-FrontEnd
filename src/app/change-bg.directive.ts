import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {
  @Input() isCorrect: boolean = false;
  @Input() isSelected: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.highlight();
  }

  private highlight() {
    if (this.isSelected) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', ''); // Selected color
    } else if (this.isCorrect) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', ''); // Correct color
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', ''); // Incorrect color
    }
  }
}
