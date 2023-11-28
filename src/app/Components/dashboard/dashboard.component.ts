import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService, QuestionSet } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentId: number | null = null;
  questionSets: QuestionSet[] = [];

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const studentIdParam = params.get('studentId');

      if (studentIdParam !== null) {
        this.studentId = +studentIdParam;
        console.log('Student ID:', this.studentId);

        // Fetch question sets for the dashboard
        this.dashboardService.getQuestionSets().subscribe(
          data => {
            this.questionSets = data;
            console.log(this.questionSets);
            
          },
          error => {
            console.error('Failed to fetch question sets:', error);
          }
        );
      } else {
        console.error('Student ID parameter is null.');
      }
    });
  }
}