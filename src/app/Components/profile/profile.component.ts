import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  studentDetails: StudentDetails | null = null;
  profileForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isEmailDisabled: boolean = true;


  constructor(
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, this.validateName]],
      cls: ['', [Validators.required, Validators.min(8), Validators.max(12)]], // Added Validators.min and Validators.max
      email: [{ value: '', disabled: this.isEmailDisabled }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required,this.validatePhoneNumber]],
    });
  }

  
  isClassInvalid(): boolean {
    const classValue = this.profileForm.get('cls')?.value;
    return classValue !== null && (classValue < 5 || classValue > 12);
  }

  validateName(control: AbstractControl): { [key: string]: boolean } | null {
    // Regular expression to allow only letters (uppercase and lowercase)
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (control.value && !nameRegex.test(control.value)) {
      return { 'invalidName': true }; // Return an error object if validation fails
    } else if (control.value && control.value.trim().length > 25) {
      return { 'nameTooLong': true }; // Return an error object if name exceeds 25 characters
    } else {
      return null; // Return null if the validation passes
    }
  }
  
  validatePhoneNumber(control: AbstractControl): { [key: string]: boolean } | null {
    const phoneNumber = control.value;
    // Check if the phone number is exactly 10 digits long
    if (phoneNumber && /^\d{10}$/.test(phoneNumber)) {
      // If the phone number is already 10 digits long, consider it valid
      return null;
    } else if (phoneNumber && phoneNumber.length > 0) {
      // If the phone number is not empty but not 10 digits long, consider it invalid
      return { 'invalidPhone': true };
    } else {
      // If the phone number is empty, consider it valid as it's optional
      return null;
    }
  }

  ngOnInit() {
    this.studentDetails = this.studentsService.getStudentDetails();

    if (this.studentDetails) {
      this.profileForm.patchValue({
        name: this.studentDetails.name,
        cls: this.studentDetails.cls,
        email: this.studentDetails.email,
        phone: this.studentDetails.phone,
      });
    }
  }

  updateProfile() {
    if (this.profileForm.valid && this.studentDetails) {
      console.log(this.studentDetails);
      
      const updatedDetails = { ...this.studentDetails, ...this.profileForm.value };
      console.log(updatedDetails);
      this.studentsService.updateStudentDetails(updatedDetails).subscribe(
        response => {
          this.ngZone.run(() => {
            this.successMessage = 'Profile updated successfully';
            setTimeout(() => {
              this.closePopup(); // Close the popup after 3 seconds
            }, 2500);
          });
  
          this.studentsService.setStudentDetails(response);
        },
        error => {
          console.error('Failed to update profile:', error);
        }
      );
    }
  }
  
  closePopup() {
    this.successMessage = ''; // Clear the success message when closing the popup
  }
}
