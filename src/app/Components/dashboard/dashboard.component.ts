import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService, QuestionSet } from 'src/app/services/dashboard.service';
import { ResultsService } from 'src/app/services/results.service';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentId: number | null = null;
  questionSets: QuestionSet[] = [];
  studentDetails: StudentDetails | null = null;

  constructor(private route: ActivatedRoute, private dashboardService: DashboardService, 
    private studentService: StudentsService, private resultService: ResultsService) {}

  ngOnInit() {
    // Retrieve the student details from the service
    this.studentDetails = this.studentService.getStudentDetails();
    console.log('StudentDetails in DashboardComponent:', this.studentDetails);
    console.log(this.studentDetails?.id);
    console.log(this.studentDetails?.name);
    

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
    
  }
}