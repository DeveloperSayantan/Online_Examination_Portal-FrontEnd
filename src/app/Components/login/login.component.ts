import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    // Call the service to make the login API request
    this.loginService.login(this.email, this.password).subscribe(
      response => {
        // Handle the success response
        console.log('Login successful!', response);
        // Store the student ID
        const studentId: string = response.studentId; // Assuming studentId is of type number
        if (studentId !== undefined) {
          // Redirect with the studentId only if it's defined
          this.router.navigate(['/dashboard', studentId]);
        } else {
          console.error('Student ID is undefined.');
        }
      },
      error => {
        // Handle the error response
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
