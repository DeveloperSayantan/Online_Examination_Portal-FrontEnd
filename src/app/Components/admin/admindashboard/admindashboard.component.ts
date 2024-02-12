import { Component, OnInit } from '@angular/core';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  dashboardData: any = {
    totalQuestions: 0,
    totalStudents: 0,
    totalSchools: 0,
    totalBoards: 0,
    totalTeachers:0
  };

  constructor(private dashboardService: AdmindashboardService) { }

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    this.dashboardService.getQuestionData().subscribe(
      (questionData) => {
        this.dashboardData.totalQuestions = questionData.length; // Assuming an array of questions is returned
      },
      (error) => {
        console.error('Error fetching question data:', error);
      }
    );

    this.dashboardService.getStudentData().subscribe(
      (studentData) => {
        this.dashboardData.totalStudents = studentData.length; // Assuming an array of students is returned
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );

    this.dashboardService.getSchoolData().subscribe(
      (schoolData) => {
        this.dashboardData.totalSchools = schoolData.length; // Assuming an array of schools is returned
      },
      (error) => {
        console.error('Error fetching school data:', error);
      }
    );

    this.dashboardService.getBoardData().subscribe(
      (boardData) => {
        this.dashboardData.totalBoards = boardData.length; // Assuming an array of boards is returned
      },
      (error) => {
        console.error('Error fetching board data:', error);
      }
    );

    this.dashboardService.getTeacherData().subscribe(
      (teacherData) => {
        this.dashboardData.totalTeachers = teacherData.length; // Assuming an array of teacher is returned
      },
      (error) => {
        console.error('Error fetching teacher data:', error);
      }
    );
  }
}