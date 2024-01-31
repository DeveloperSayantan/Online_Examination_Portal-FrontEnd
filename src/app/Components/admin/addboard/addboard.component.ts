import { Component } from '@angular/core';
import { AddboardService } from 'src/app/services/addboard.service';

@Component({
  selector: 'app-addboard',
  templateUrl: './addboard.component.html',
  styleUrls: ['./addboard.component.css']
})
export class AddboardComponent {

  
  boardName: string = '';
  successMessage:string = '';
  errorMessage: string = '';

  constructor(private addboardService: AddboardService) {}

    //btn click function for register
    addBoard() {

     
     const boardData = {
      boardName: this.boardName,
     };
     console.log(boardData);
     
     // Call the service to make the API request
     this.addboardService.addBoard(boardData).subscribe(
       response => {
         // Handle the success response (if needed)
         console.log('Board added successfully!', response);
         this.successMessage = "Board added successfully!"
 
         // Reset form fields after successful signup
         this.boardName = '';
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
           this.errorMessage = 'Board adding failed!';
         }
       }
     );
 
   }
 }