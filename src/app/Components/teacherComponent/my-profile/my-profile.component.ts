import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';
import { TeacherDetails, TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  [x: string]: any | string;
  teacherDetails: TeacherDetails | null = null;
  profileForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  isEmailDisabled: boolean = true;

  constructor(
    private teacherService: TeacherService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, this.validateName]],
      subject: ['', [Validators.required]], // Added Validators.min and Validators.max
      email: [{ value: '', disabled: this.isEmailDisabled }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required, this.validatePhoneNumber]],
      password: ['', [Validators.required, this.validatePassword]],
    });
  }
  validateName(control: AbstractControl): { [key: string]: boolean } | null {
    // Regular expression to allow only letters (uppercase and lowercase)
    const nameRegex = /^[a-zA-Z\s]*$/;

    if (control.value && !nameRegex.test(control.value)) {
      return { 'invalidName': true }; // Return an error object if validation fails
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

  validatePassword(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    // Define regular expressions for password requirements
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Add more special characters if needed
    const isValid = hasNumber && hasUpper && hasSpecial && password.length >= 8;
    // Check if password meets all requirements
    if (!isValid) {
      // If password is invalid, return an error object with a key indicating the specific validation failure
      return {
        'invalidPassword': true
      };
    }
    // If password is valid, return null
    return null;
  }
  
  



  ngOnInit() {
    this.teacherDetails = this.teacherService.getTeacherDetails();

    if (this.teacherDetails) {
      this.profileForm.patchValue({
        name: this.teacherDetails.name,
        subject:this.teacherDetails.subject,
        email: this.teacherDetails.email,
        phone: this.teacherDetails.phone,
      });
    }
  }

  updateProfile() {
    if (this.profileForm.valid && this.teacherDetails) {
      console.log(this.teacherDetails);
      
      const updatedDetails = {  ...this.teacherDetails, ...this.profileForm.value };
      console.log(updatedDetails);
      
      this.teacherService.updateTeacherDetails(updatedDetails).subscribe(
        response => {
          this.ngZone.run(() => {
            this.successMessage = 'Profile updated successfully';
            setTimeout(() => {
              this.closePopup(); // Close the popup after 3 seconds
            }, 2500);
          });
  
          this.teacherService.setTeacherDetails(response);
        },
        error => {
          console.error('Failed to update profile:', error);
        }
      );
    }else{
      console.error('Teacher details or ID is undefined.');
    }
  }
  
  closePopup() {
    this.successMessage = ''; // Clear the success message when closing the popup
  }
}
