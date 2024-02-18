import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TeacherDetails, TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
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
    // Check if the value is exactly 10 digits long
    const numberRegex = [0-9];
    if (control.value && control.value.length === 10 && /^\d+$/.test(control.value)) {
      return null; // Return null if the validation passes
    } else {
      return { 'invalidPhone': true }; // Return an error object if validation fails
    }
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
