import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeacherDetails, TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

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
      name: ['', [Validators.required]],
      email: [{ value: '', disabled: this.isEmailDisabled }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      school_id: ['', [Validators.required]] // Add school_id field to the form
    });
  }

  ngOnInit() {
    this.teacherDetails = this.teacherService.getTeacherDetails();
    console.log(this.teacherDetails);
    
    if (this.teacherDetails) {
      this.profileForm.patchValue({
        name: this.teacherDetails.name,
        email: this.teacherDetails.email,
        phone: this.teacherDetails.phone,
        school_id: this.teacherDetails.school_id // Populate school_id if available
      });
    }
  }

  updateProfile() {
    if (this.profileForm.valid && this.teacherDetails) {
      // Construct updatedDetails object with id property
      const updatedDetails = {
        ...this.teacherDetails,
        ...this.profileForm.value,
        id: this.teacherDetails.id // Set the id property
      };
  
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
    }
  }
  
  
  closePopup() {
    this.successMessage = ''; // Clear the success message when closing the popup
  }
}
