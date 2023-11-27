import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.loadGoogleSearchScript();
  }

  private loadGoogleSearchScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=f5c69ce4dc9784661';
    script.async = true;
    script.defer = true;

    this.renderer.appendChild(this.el.nativeElement, script);
  }
}