// src/app/components/addquestionset/addquestionset.component.ts

import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AddquestionService } from "src/app/services/addquestion.service";
import { Question } from "src/app/models/question.model";

@Component({
  selector: 'app-addquestionset',
  templateUrl: './addquestionset.component.html',
  styleUrls: ['./addquestionset.component.css']
})

export class AddquestionsetComponent {

  successMessage: string = '';
  errorMessage: string = '';

  question: Question = {
    questionText: '',
    options: ['', '', '', ''],
    correctOption: ''
  };

  constructor(
    private route: ActivatedRoute,
    private addQuestionSetService: AddquestionService
  ) {}

  addQuestion() {
    this.question.options = this.question.options.filter(option => option.trim() !== '');

    this.route.queryParams.subscribe(params => {
      const qSetId = params['questionsetId'];
      if (qSetId) {
        this.addQuestionSetService.addQuestionsToSet(qSetId, this.question)
          .subscribe(
            (response: any) => {
              console.log('Question added successfully', response);
              this.successMessage = 'Question added successfully';
              this.clearForm(); // Reset the form after success
            },
            (error: any) => {
              console.error('Error adding question', error);
              this.errorMessage = 'Error adding question'; 
            }
          );
      } else {
        console.error('No questionsetId provided in queryParams.');
      }
    });
  }

  clearForm() {
    this.question = {
      questionText: '',
      options: ['', '', '', ''],
      correctOption: ''
    };
  }
}
