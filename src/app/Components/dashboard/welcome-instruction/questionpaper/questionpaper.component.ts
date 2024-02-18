import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { QuestionpaperService } from 'src/app/services/questionpaper.service';
import { WelcomeService } from 'src/app/services/welcome.service';

@Component({
  selector: 'app-questionpaper',
  templateUrl: './questionpaper.component.html',
  styleUrls: ['./questionpaper.component.css']
})
export class QuestionpaperComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  correctAnswer: number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  selectedOption: any = null;
  studentId:number=0;
  qSetId:number=0;
  setname :string='';
  studentName :string='';
  time :number=0;
  isOptionSelected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionpaperService,
    private welcomeService: WelcomeService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.studentId = +params['studentId'];
      this.qSetId = +params['qSetId'];
      this.studentName = params['studentName'] || '';
      this.setname = params['setname'] || '';
      this.time = params['timer'];
      
      if (this.qSetId !== null) {
        this.questionService.getQuestionsByQSetId(this.qSetId).subscribe(
          data => {
            if (data && Array.isArray(data)) {
              this.questionList = data;
            } else {
              console.error('Invalid response format:', data);
            }
          },
          error => {
            console.error('Failed to fetch questions:', error);
          }
        );
      } else {
        console.error('Question Set ID is null.');
        this.router.navigate(['/dashboard']);
      }
    });

    this.name = localStorage.getItem('name')!;
    this.startCounter();
  }

  answer(currentQno: number, option: any) {
    this.selectedOption = option;
    this.isOptionSelected = true;

    if (option === this.questionList[currentQno - 1]?.correctOption) {
      this.points += 2;
      this.correctAnswer++;
    } else {
      this.points -= 0;
      this.incorrectAnswer++;
    }

    this.selectedOption = option;

    if (currentQno === this.questionList.length) {
      setTimeout(() => {
        this.isQuizCompleted = true;
        this.saveQuizResults(this.studentId, this.qSetId);
        this.stopCounter();
        this.selectedOption = null;
        this.isOptionSelected = false;
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.getProgressPercent();
        this.selectedOption = null;
        this.isOptionSelected = false;
      }, 1000);
    }
  }

  startCounter() {
    this.time = this.time * 60;

    this.interval$ = interval(1000).subscribe(() => {
      this.time--;

      if (this.time < 0) {
        this.interval$.unsubscribe();
        this.currentQuestion++;
        this.points -= 0;
      }
    });
  
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  
  formatTime(): string {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
  
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.time = 0;
  }

  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100)
      .toFixed(0)
      .toString();

    return this.progress;
  }

  saveQuizResults(studentId:number, qSetId:number) {
    const results = {
      totalQuestionsAttempted: this.questionList.length,
      totalCorrectAnswered: this.correctAnswer,
      totalWrongAnswered: this.incorrectAnswer,
      score: this.points,
      student: { id: studentId  },
      questionSetId: { qsetId:qSetId  }
    };

    this.questionService.saveQuizResults(results).subscribe(
      (response) => {
        console.log('Quiz results saved successfully:', response);
      },
      (error) => {
        console.error('Failed to save quiz results:', error);
      }
    );
  }
}
