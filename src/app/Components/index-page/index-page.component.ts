import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  showModal: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private router: Router) {} // Inject Router here
  
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

  openLoginModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  loginAs(role: string) {
    if (role === 'teacher') {
      // Navigate to teacher page
      this.router.navigate(['/teacherSignup']); // Use router to navigate
      console.log('Signup as teacher');
    } else if (role === 'student') {
      // Navigate to student page
      this.router.navigate(['/signup']); // Use router to navigate
      console.log('Signup as student');
    }
    this.closeModal(); // Close modal after selecting role
  }
}

