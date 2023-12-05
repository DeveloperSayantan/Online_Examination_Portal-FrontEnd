import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from 'src/app/services/results.service';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  studentDetails: StudentDetails | null =null;
  results: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultsService: ResultsService,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    this.studentDetails = this.studentsService.getStudentDetails();
    
    if (!this.studentDetails) {
      // Handle the case where student details are not available
      // Redirect, show an error message, etc.
      this.router.navigate(['/dashboard']);
      return ;
    }

    this.loadResults();
  }

  loadResults() {
    if (this.studentDetails) {
      const studentId = this.studentDetails.id;
      this.resultsService.getResultsByStudentId(studentId).subscribe(
        data => {
          this.results = data;
          console.log(this.results);
          console.log(this.results);
          
          
        },
        error => {
          console.error('Error fetching results:', error);
        }
      );
    }
  }
}