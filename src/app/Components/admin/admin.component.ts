import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private adminService: AdminService, private router: Router) {}

  onSubmit() {
    // Call the service to make the login API request
    this.adminService.login(this.email, this.password).subscribe(
      response => {
        // Handle the success response
        console.log('Login successful!', response);
        // Store the student ID
        const adminId: string = response.adminId; // Assuming adminId is of type number
        if (adminId !== undefined) {
          // Redirect with the studentId only if it's defined
          this.router.navigate(['/admindashboard']);
        } else {
          console.error('Admin ID is undefined.');
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
