import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      name: ['', [Validators.required]],
      cls: ['', [Validators.required, Validators.min(5), Validators.max(12)]], // Added Validators.min and Validators.max
      email: [{ value: '', disabled: this.isEmailDisabled }, [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  isClassInvalid(): boolean {
    const classValue = this.profileForm.get('cls')?.value;
    return classValue !== null && (classValue < 8 || classValue > 12);
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
