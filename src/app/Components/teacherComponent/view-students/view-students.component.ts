import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.css']
})
export class ViewStudentsComponent implements OnInit{
  students: any[] = [];
  filteredStudents: any[] = [];
  searchClass: string = '';


  constructor(private techerService: TeacherService,private router:Router) { }

  ngOnInit(): void {
    this.getStudentsFromSameSchool();
  }

  getStudentsFromSameSchool() {
    // Call the service to fetch all students
    this.techerService.getStudentData().subscribe(
      (students: any[]) => {
        this.students = students;
        this.filterStudents(); // Initially filter students
      },
      error => {
        console.error('Error fetching students:', error);
      }
    );
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(student => 
      student.cls.toLowerCase().includes(this.searchClass.toLowerCase()) &&
      student.school_id.sid === this.techerService.getTeacherDetails()?.school_id
    );
  }
  generateResult(studentId: string) {
    this.router.navigate(['/generateResults'],{
      queryParams: {studentId:studentId}
    });
    console.log("idddddddddd- "+studentId);
     // Navigate to generate-result component with studentId
  }
}
