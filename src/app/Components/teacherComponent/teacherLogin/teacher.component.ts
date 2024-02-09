import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherDetails, TeacherService } from 'src/app/services/teacher.service';
import { TeacherloginService } from 'src/app/services/teacherlogin.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private teacherLoginService: TeacherloginService, private router: Router, private teacherService: TeacherService) {}

  onSubmit() {
    // Clear any previous messages
    this.errorMessage = '';
    this.successMessage = '';

    // Check if email and password are provided
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    // Call the service to make the login API request
    this.teacherLoginService.teacherLogin(this.email, this.password).subscribe(
      response => {
        // Handle the success response
        console.log('Login successful!', response);
        // Set the student details in the service
        const teacherDetails: TeacherDetails = {
          id: response.id,
          name: response.name,
          email: response.email,
          phone: response.phone
        };
        this.teacherService.setTeacherDetails(teacherDetails);

        // Show success message
        this.successMessage = 'Login successful';

        // Redirect after a delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2500);
      },
      error => {
        // Handle the error response
        console.error('Login failed:', error);
        this.errorMessage = 'Sorry, Invalid email or password';
        setTimeout(() => {
          this.closePopup();
        }, 2500);
      }
    );
  }
  closePopup() {
    this.successMessage = ''; // Clear the success message when closing the popup
    this.errorMessage = ''; // Clear the error message when closing the popup
  }
}