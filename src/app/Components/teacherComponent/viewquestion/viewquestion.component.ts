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
  showPopup: boolean = false;
  popupMessage: string = '';

  constructor(private addQuestionService: AddquestionService, private teacherService: TeacherService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.teacherDetails = this.teacherService.getTeacherDetails();
    console.log("teacher details--"+this.teacherService.getTeacherDetails());
    
    this.fetchQuestionList();
  }

  fetchQuestionList() {
    this.addQuestionService.fetchQuestionList().subscribe(
      (data) => {
        this.questionList = data;
        console.log(data);
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
        this.popupMessage = 'Failed to delete question Set.\nNote: List of questions are associated in this set.';
        this.showPopup = true;
        setTimeout(() => {
          this.hidePopup();
        }, 4000); // Automatically hide after 3 seconds
      }
    );
  }

  hidePopup(): void {
    this.showPopup = false;
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