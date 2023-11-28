import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-welcome-instruction',
  templateUrl: './welcome-instruction.component.html',
  styleUrls: ['./welcome-instruction.component.css']
})
export class WelcomeInstructionComponent {
  @ViewChild('name') nameKey!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }
}
