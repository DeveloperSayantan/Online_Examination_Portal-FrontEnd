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
  processing: boolean = false;
  successMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  login() {
    // Set processing flag to true
    this.processing = true;
    this.errorMessage = '';

    // console.log('------this-------'+this.email);
    
    // Simulate a delay of at least 3 seconds for the processing animation
    setTimeout(() => {
      this.adminService.login(this.email, this.password).subscribe(
        response => {
          console.log('Login successful!', response);
          const adminId: string = response.adminId;
          if (adminId !== undefined) {
            // Show success message
        this.successMessage = 'Login successful';

        // Redirect after a delay
        setTimeout(() => {
          this.router.navigate(['/admindashboard']);
        }, 3000);
        
          } else {
            console.error('Admin ID is undefined.');
            this.processing = false;
          }
        },
        error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Invalid email or password';
          this.processing = false;
        }
      );
    }, 2000); // 3 seconds delay
  }

}