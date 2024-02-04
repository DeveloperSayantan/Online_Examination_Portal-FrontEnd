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
  schoolerror: string = '';
  boarderror: string = '';


  selectedSchool: School | null = null;
  otherSchoolName: string = '';
  selectedBoard: Board | null = null;
  
  schools: School[] = [];
  boards: Board[] = [];
  
  isNameValid: boolean = true;
  isClassValid: boolean = true;
  isEmailValid: boolean = true;
  isPhoneValid: boolean = true;
  isSchoolValid: boolean = true;
  isBoardValid: boolean = true;
  isPasswordValid: boolean = true;
  
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

  validateName() {
    this.isNameValid = this.name.trim() !== '';
  }

  validateClass() {
    const classNumber = parseInt(this.cls, 10);
    this.isClassValid = classNumber > 5 && classNumber <= 12;
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailValid = emailRegex.test(this.email);
  }

  validatePhone() {
    this.isPhoneValid = this.phone.length === 10 && /^\d+$/.test(this.phone);
  }
  onSchoolSelectionChange() { 
    // Reset the otherSchoolName when a new selection is made
    this.isSchoolValid = this.selectedSchool !== null;
    if (this.selectedSchool?.schoolName !== 'other') {
      this.otherSchoolName = '';
    }
  }

  validatePassword() {
    // Adjust password criteria as needed
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    this.isPasswordValid = passwordRegex.test(this.password);
  }

  isFormValid(): boolean {
    
    return (
      this.isNameValid &&
      this.isClassValid &&
      this.isEmailValid &&
      this.isPhoneValid &&
      this.isSchoolValid &&
      this.isBoardValid &&
      this.isPasswordValid
    );
  }
  //btn click function for register
  signUp() {

   // check validation
    this.validateName();
    this.validateClass();
    this.validateEmail();
    this.validatePhone();
    this.validatePassword();
    if (!this.selectedSchool) {
      this.schoolerror = "School are required.";
      return;
    }
    if (!this.selectedBoard) {
      this.boarderror = "Board are required.";
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

 
   

  // Show all error messages
  showAllErrorMessages() {
    this.validateName();
    this.validateClass();
    this.validateEmail();
    this.validatePhone();
    // ... (add other validation functions)
    this.onSchoolSelectionChange(); // For school validation
    this.validatePassword();
  }
  
}
