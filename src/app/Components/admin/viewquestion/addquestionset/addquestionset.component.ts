// src/app/components/addquestionset/addquestionset.component.ts
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AddquestionService } from "src/app/services/addquestion.service";
import { Question } from "src/app/models/question.model"; // Import the Question interface

@Component({
  selector: 'app-addquestionset',
  templateUrl: './addquestionset.component.html',
  styleUrls: ['./addquestionset.component.css']
})

export class AddquestionsetComponent {

  successMessage: string = '';
  errorMessage : string = '';

  question: Question = {
    questionText: '',
    options: ['', '', '', ''], // Initialize with empty strings or default values
    correctOption: '' // Default correct option or initialize as needed
  };

  constructor(
    private route: ActivatedRoute,
    private addQuestionSetService: AddquestionService
  ) {}

  addQuestion() {
    // Check if any options are empty and remove them before sending to the backend
    this.question.options = this.question.options.filter(option => option.trim() !== '');

    this.route.queryParams.subscribe(params => {
      const qSetId = params['questionsetId'];
      if (qSetId) {
        this.addQuestionSetService.addQuestionsToSet(qSetId, this.question)
          .subscribe(
            (response: any) => {
              console.log('Question added successfully', response);
              this.successMessage = 'Question added successfully'; // Set the success message
              // Handle success, clear form, show success message, etc.
            },
            (error: any) => {
              console.error('Error adding question', error);
              this.errorMessage = 'Error adding question'; 
              // Handle error, show error message, etc.
            }
          );
      } else {
        console.error('No questionsetId provided in queryParams.');
      }
    });
  }
}
