import { Component } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {
  totalQuestionSet: number = 0;
  teacherDetails: any;
  totalStudentsInSchool: number = 0;


  constructor(private teacherService: TeacherService) { }

  ngOnInit(): void {
    // Retrieve teacher details from service
    this.teacherDetails = this.teacherService.getTeacherDetails();
    console.log('Teacher Details:', this.teacherDetails);

    // Call a method to calculate total question set (you can replace this with your actual logic)
    this.calculateTotalQuestionSet();
    // Fetch all students from the service and count the number of students from the same school as the teacher
    this.getStudentsFromSameSchool();
    
  }
  calculateTotalQuestionSet() {
    // You can implement your logic here to calculate total question set
    // For demonstration, let's assume it's retrieved from an API or database
    // In this example, we're just setting a random number
    this.totalQuestionSet = Math.floor(Math.random() * 100);
  }
  getStudentsFromSameSchool() {
    const teacherSchoolId = this.teacherDetails.school_id; // Assuming school_id is the correct property
    console.log("school_id- ",this.teacherDetails.school_id);
    
    this.teacherService.getStudentData().subscribe(
      (students: any[]) => {
        // Filter students based on the school ID of the teacher and count the number of students
        this.totalStudentsInSchool = students.filter(student => student.school_id.sid === teacherSchoolId).length;
        console.log(this.totalStudentsInSchool);
        console.log(this.totalStudentsInSchool);
        
        
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }
}
