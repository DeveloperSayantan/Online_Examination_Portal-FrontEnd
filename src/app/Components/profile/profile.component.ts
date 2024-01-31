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


  constructor(
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private ngZone: NgZone  // Inject NgZone
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      cls: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      // Add other form controls as needed
    });
  }

  ngOnInit() {
    this.studentDetails = this.studentsService.getStudentDetails();

    if (this.studentDetails) {
      // Set initial form values based on fetched student details
      this.profileForm.patchValue({
        name: this.studentDetails.name,
        cls: this.studentDetails.cls,
        email: this.studentDetails.email,
        phone: this.studentDetails.phone,
        // Update with other properties
      });
    }
  }

  updateProfile() {
    if (this.profileForm.valid && this.studentDetails) {
      // Send the updated details to the server
      const updatedDetails = { ...this.studentDetails, ...this.profileForm.value };
      this.studentsService.updateStudentDetails(updatedDetails).subscribe(
        response => {
          console.log('Profile updated successfully:', response);

          // Use NgZone to run the alert inside the Angular zone
          this.ngZone.run(() => {
            this.successMessage = 'Profile updated successfully';
            setTimeout(() => {
              this.successMessage = '';  // Clear the success message after a delay
            }, 4000);  // Adjust the delay as needed
          });

          // Optionally, you can update the local studentDetails
          this.studentsService.setStudentDetails(response);
        },
        error => {
          console.error('Failed to update profile:', error);
        }
      );
    }
  }
}