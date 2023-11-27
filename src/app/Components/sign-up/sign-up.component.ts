import { Component } from '@angular/core';
import { SignupService } from 'src/app/services/signup.service';

interface School {
  sid: number;
  schoolName: string;
}

interface Board {
  bid: number;
  boardName: string;
}

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
  password: string = '';
  errorMessage: string = '';

  selectedSchool: School | null = null;
  otherSchoolName: string = '';
  selectedBoard: Board | null = null;
  
  schools: School[] = [];
  boards: Board[] = [];
  
  
  
  constructor(private signupService: SignupService) {}
  ngOnInit() {
    // Fetch schools and boards when the component initializes
    this.fetchSchools();
    this.fetchBoards();
  }
  // fetch school from school table
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
  // fetch board from Board table
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

  onSchoolSelectionChange() { 
    // Reset the otherSchoolName when a new selection is made
    if (this.selectedSchool?.schoolName !== 'other') {
      this.otherSchoolName = '';
    }
  }
  //btn click function for register
  signUp() {
     // Validate email format
     if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    // Validate phone number length
    if (this.phone.length !== 10 || !/^\d+$/.test(this.phone)) {
      this.errorMessage = 'Phone number must be 10 digits';
      return;
    }

    // Validate class not more than 12
    const classNumber = parseInt(this.cls, 10);
    if (classNumber > 12) {
      this.errorMessage = 'Class must not be more than 12';
      return;
    }

    // Validate password criteria (adjust as needed)
    if (!this.isPasswordValid(this.password)) {
      this.errorMessage = 'Password must meet criteria (adjust as needed)';
      return;
    }

    if (!this.selectedSchool || !this.selectedBoard) {
      console.error('School and Board are required.');
      return;
    }
    
   
     console.log('Selected Board:', this.selectedBoard);
    const userData = {
      name: this.name,
      cls: this.cls,
      email: this.email,
      phone: this.phone,
      school_id: {
        sid:this.selectedSchool.sid,
      },
      board_id:{ 
        bid:this.selectedBoard.bid,
      },
      password: this.password
    };
    console.log(userData);
    
    // Call the service to make the API request
    this.signupService.signUp(userData).subscribe(
      response => {
        // Handle the success response (if needed)
        console.log('Signup successful!', response);
        this.errorMessage = "Signup successful!"

        // Reset form fields after successful signup
      this.name = '';
      this.cls = '';
      this.email = '';
      this.phone = '';
      this.password = '';
      this.selectedSchool = null;
      this.otherSchoolName = '';
      this.selectedBoard = null;
      },
      error => {
        // Handle the error response (if needed)
        console.error('Signup failed:');
        

        if (error.status === 400) {
          // Handle bad request errors with text response
          console.error('Bad Request:', error.error);
          this.errorMessage = error.error;
          // You can display an error message or take appropriate actions
        } else {
          // Handle other errors
          console.error('Unexpected error:', error);
          this.errorMessage = 'Signup failed';
        }
      }
    );

    // Save to the schools table if it's a new school
     if (this.selectedSchool?.schoolName === 'other') {
      const newSchoolData = {
        schoolName: this.otherSchoolName,
        location: 'Barasat', // Adjust as needed
        // ... (any other properties specific to the schools table)
      } as unknown as School;

      this.signupService.saveSchool(newSchoolData).subscribe(
        response => {
          console.log('School saved successfully!', response);
          // Handle the success response (if needed)
        },
        error => {
          console.error('Failed to save school:', error);
        }
      );
    }
  }
   // Helper function to validate email format
   private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper function to validate password criteria (adjust as needed)
  private isPasswordValid(password: string): boolean {
    // Example criteria: at least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }
}
