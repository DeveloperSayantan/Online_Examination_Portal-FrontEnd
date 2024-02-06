import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionpaperService } from 'src/app/services/questionpaper.service';
import { StudentsService } from 'src/app/services/students.service';
import { QuestionSetDetails, WelcomeService } from 'src/app/services/welcome.service';

@Component({
  selector: 'app-welcome-instruction',
  templateUrl: './welcome-instruction.component.html',
  styleUrls: ['./welcome-instruction.component.css']
})

export class WelcomeInstructionComponent implements OnInit {
  studentId: number | null = null;
  qSetId: number | null = null;
  studentName: string = '';
  setname: string = '';
  questionSetDetails: QuestionSetDetails | null = null;
  questionList : any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private welcomeService: WelcomeService,
    private questionService: QuestionpaperService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['studentId'];
      this.qSetId = +params['qSetId'];
      this.studentName = params['studentName'] || '';
      this.setname = params['setname'] || '';
      console.log("qSetId-> "+this.qSetId);
      console.log("setname-> "+this.setname);

      

      if (this.qSetId !== null) {
        this.welcomeService.getQuestionSetDetails(this.qSetId).subscribe(
          data => {
            this.questionSetDetails = data;
          },
          error => {
            console.error('Failed to fetch question set details:', error);
          }
        );
      } else {
        console.error('Question Set ID is null.');
        this.router.navigate(['/dashboard']); // Redirect to the dashboard if qSetId is null
      }

      this.questionService.getQuestionsByQSetId(this.qSetId).subscribe(
        data => {
          console.log('Server response:', data);
          if (data && Array.isArray(data)) {
            this.questionList = data;
            console.log("length->"+this.questionList.length);
          } else {
            console.error('Invalid response format:', data);
          }
        },
        error => {
          console.error('Failed to fetch questions:', error);
        }
      );
    });
  }

  startQuiz() {
    this.router.navigate(['/questionPaper'], {
      queryParams: { studentId: this.studentId, qSetId: this.qSetId, timer:this.questionSetDetails?.time, setname: this.setname,studentName: this.studentName}
    });
  }
}