import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddquestionService } from 'src/app/services/addquestion.service';

@Component({
  selector: 'app-questionlist',
  templateUrl: './questionlist.component.html',
  styleUrls: ['./questionlist.component.css']
})
export class QuestionlistComponent implements OnInit {
  questionList: any[] = [];
  qsetId: number = 0;

  constructor(
    private addQuestionService: AddquestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.qsetId = +params['questionsetId'];
      if (this.qsetId) {
        this.fetchQuestions(this.qsetId);
      } else {
        console.error('No qsetId provided in route params.');
      }
    });
  }

  fetchQuestions(qsetId: number) {
    this.addQuestionService.fetchQuestionListById(qsetId).subscribe(
      (data:any) => {
        this.questionList = data;
        console.log(data);
      },
      (error:any) => {
        console.error('Error fetching question list:', error);
      }
    );  
  }
}
