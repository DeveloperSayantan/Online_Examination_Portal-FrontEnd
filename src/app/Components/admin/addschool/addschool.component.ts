import { Component } from '@angular/core';
import { AddschoolService } from 'src/app/services/addschool.service';

@Component({
  selector: 'app-addschool',
  templateUrl: './addschool.component.html',
  styleUrls: ['./addschool.component.css']
})
export class AddschoolComponent {


  schoolName: string = '';
  location: string = '';
  successMessage:string = '';
  errorMessage: string = '';

  constructor(private addSchoolService: AddschoolService) {}

    //btn click function for register
    addSchool() {
 
     const schoolData = {
      schoolName: this.schoolName,
      location: this.location,
     };
     console.log(schoolData);
     
     // Call the service to make the API request
     this.addSchoolService.addSchool(schoolData).subscribe(
       response => {
         // Handle the success response (if needed)
         console.log('School added successfully!', response);
         this.successMessage = "School added successfully!"
 
         // Reset form fields after successful signup
       this.schoolName = '';
       this.location = '';
       },
       error => {
         // Handle the error response (if needed)
         console.error('Adding failed:');
         
 
         if (error.status === 400) {
           // Handle bad request errors with text response
           console.error('Bad Request:', error.error);
           this.errorMessage = error.error;
           // You can display an error message or take appropriate actions
         } else {
           // Handle other errors
           console.error('Unexpected error:', error);
           this.errorMessage = 'School adding failed!';
         }
       }
     );
 
   }
 }