import { Component } from '@angular/core';
import { AddquestionService } from 'src/app/services/addquestion.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  cls: string = '';
  subject: string = '';
  year: string = '';
  time: string = '';
  errorMessage: string = '';

  constructor(private addQuestionService: AddquestionService) {}

    //btn click function for register
    addQuestion() {
 
     // Validate class not more than 12
     const classNumber = parseInt(this.cls, 10);
     if (classNumber > 12) {
       this.errorMessage = 'Class must not be more than 12';
       return;
     }
     
     const questionData = {
       cls: this.cls,
       subject: this.subject,
       year: this.year,
       time: this.time
     };
     console.log(questionData);
     
     // Call the service to make the API request
     this.addQuestionService.addQuestionSet(questionData).subscribe(
       response => {
         // Handle the success response (if needed)
         console.log('Question added successfully!', response);
         this.errorMessage = "Question added successfully!"
 
         // Reset form fields after successful signup
       this.cls = '';
       this.subject = '';
       this.year = '';
       this.time = '';
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
           this.errorMessage = 'Question adding failed!';
         }
       }
     );
 
   }
 }