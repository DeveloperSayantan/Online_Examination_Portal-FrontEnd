import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private loginService: LoginService, private router: Router, private studentService: StudentsService) {}

  onSubmit() {
    //  email and password validations can be added here.
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    

    // Call the service to make the login API request
    this.loginService.login(this.email, this.password).subscribe(
      response => {
        // Handle the success response
        console.log('Login successful!', response);
        // Set the student details in the service
        const studentDetails: StudentDetails = {
          id: response.id,
          name: response.name,
          cls: response.cls,
          email: response.email,
          phone: response.phone,
          // Add other details as needed
        };
        this.studentService.setStudentDetails(studentDetails);


        this.router.navigate(['/dashboard']);
      },
      error => {
        // Handle the error response
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
