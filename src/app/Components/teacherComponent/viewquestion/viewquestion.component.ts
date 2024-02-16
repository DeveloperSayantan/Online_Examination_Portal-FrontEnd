import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddquestionService } from 'src/app/services/addquestion.service';
import { TeacherDetails, TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {
  questionList: any[] = []; // Update the type if needed
  teacherDetails: TeacherDetails | null = null;

  constructor(private addQuestionService: AddquestionService, private teacherService: TeacherService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.teacherDetails = this.teacherService.getTeacherDetails();
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
    console.log('Question Set id:'+qSetId);
    
  }

  viewQuestions(qSetId:number){
    this.router.navigate(['/questions'], {
      queryParams: { questionsetId: qSetId }
    });
    console.log('Question Set id:'+qSetId);
    
  }

}