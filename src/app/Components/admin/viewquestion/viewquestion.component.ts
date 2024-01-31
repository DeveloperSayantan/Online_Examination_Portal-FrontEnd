import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddquestionService } from 'src/app/services/addquestion.service';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {
  questionList: any[] = []; // Update the type if needed

  constructor(private addQuestionService: AddquestionService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.fetchQuestionList();
  }

  fetchQuestionList() {
    this.addQuestionService.fetchQuestionList().subscribe(
      (data) => {
        this.questionList = data;
      },
      (error) => {
        console.error('Error fetching question list:', error);
      }
    );
  }

  deleteQuestion(id: number):void {
    this.addQuestionService.deleteQuestionList(id).subscribe(
      () => {
        // Remove the deleted question from the local array
        this.questionList = this.questionList.filter(question => question.qsetId !== id);
      },
      (error) => {
        console.error('Error deleting question:', error);
      }
    );
  }

  addQuestionSet(qSetId: number) {
    this.router.navigate(['/addquestionset'], {
      queryParams: { questionsetId: qSetId }
    });
  }

}