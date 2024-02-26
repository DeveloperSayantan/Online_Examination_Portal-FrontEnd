import { Component } from '@angular/core';
import { AddquestionService } from 'src/app/services/addquestion.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent {
  
  setname: string = '';
  cls: string = '';
  subject: string |undefined;
  teacherId: number|undefined;
  year: string = '';
  time: string = '';
  successMessage:string = '';
  errorMessage: string = '';

  constructor(private addQuestionService: AddquestionService, private teacherservice: TeacherService) {

    // Fetch teacher details when the component initializes
    const teacher = this.teacherservice.getTeacherDetails();
    if (teacher) {
      this.subject = teacher.subject;
      this.teacherId = teacher.tid; 
    }
  }

  
    //btn click function for register
    addQuestion() {
      // Validate inputs
    if (!this.setname || !this.cls || !this.subject || !this.year || !this.time || !this.teacherId) {
      this.errorMessage = 'All fields are required';
      return;
    }
     // Validate class not more than 12
     const classNumber = parseInt(this.cls, 10);
     if (classNumber > 12) {
       this.errorMessage = 'Class must not be more than 12';
       return;
     }
     
     const questionData = {
       setname: this.setname,
       cls: this.cls,
       subject: this.subject,
       year: this.year,
       time: this.time,
       teacher: {"tid":this.teacherId}
     };
     console.log(questionData);
     
     // Call the service to make the API request
     this.addQuestionService.addQuestionSet(questionData).subscribe(
       response => {
         // Handle the success response (if needed)
         console.log('Question added successfully!', response);
         this.successMessage = "Question added successfully!"
 
         // Reset form fields after successful signup
       this.setname = '';
       this.cls = '';

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