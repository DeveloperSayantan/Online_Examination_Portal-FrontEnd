import { Component } from '@angular/core';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  // providers: [SignupService]
})
export class SignUpComponent {
  name: string = '';
  cls: string = '';
  email: string = '';
  phone: string = '';
  schoolName: string = '';
  boardName: string = '';
  password: string = '';

  // schools: string[] = [];
  // boards: string[] = [];
  schools: { schoolName: string }[] = [];
  boards: { boardName: string }[] = [];

  constructor(private signupService: SignupService) {}
  ngOnInit() {
    // Fetch schools and boards when the component initializes
    this.fetchSchools();
    this.fetchBoards();
  }

  fetchSchools() {
    this.signupService.getSchools().subscribe(
      response => {
        this.schools = response;
        console.log(this.schools);
        
      },
      error => {
        console.error('Failed to fetch schools:', error);
      }
    );
  }

  fetchBoards() {
    this.signupService.getBoards().subscribe(
      response => {
        this.boards = response;
      },
      error => {
        console.error('Failed to fetch boards:', error);
      }
    );
  }

  //btn click function for register
  signUp() {
    // Get the form data and create the user object
    const userData = {
      name: this.name,
      cls: this.cls,
      email: this.email,
      phone: this.phone,
      schoolName: this.schoolName,
      boardName: this.boardName,
      password: this.password
    };

    // Call the service to make the API request
    this.signupService.signUp(userData).subscribe(
      response => {
        // Handle the success response (if needed)
        console.log('Signup successful!', response);
      },
      error => {
        // Handle the error response (if needed)
        console.error('Signup failed:', error);
        if (error.status === 400) {
          // Handle bad request errors with text response
          console.error('Bad Request:', error.error);
          // You can display an error message or take appropriate actions
        } else {
          // Handle other errors
          console.error('Unexpected error:', error);
        }
      }
    );
  }
}
