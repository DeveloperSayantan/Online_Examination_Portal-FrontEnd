import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
      this.router.navigate(['/teacherLogin']); // Use router to navigate
      console.log('Login as teacher');
    } else if (role === 'student') {
      // Navigate to student page
      this.router.navigate(['/student']); // Use router to navigate
      console.log('Login as student');
    }
    this.closeModal(); // Close modal after selecting role
  }
}
