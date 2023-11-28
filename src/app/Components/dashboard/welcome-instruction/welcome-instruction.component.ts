import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  questionSetDetails: QuestionSetDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private welcomeService: WelcomeService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['studentId'];
      this.qSetId = +params['qSetId'];
      this.studentName = params['studentName'] || '';
      console.log(this.studentId+"-->"+this.qSetId);
      
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
        // Handle the case where qSetId is null, e.g., redirect to the dashboard
        this.router.navigate(['/dashboard', this.studentId]);
      }
    });
  }

  startQuiz() {
    // Navigate to the exam page with studentId and qSetId
    this.router.navigate(['/questionPaper'], {
      queryParams: { studentId: this.studentId, qSetId: this.qSetId, studentName: this.studentName }
    });
  }
}