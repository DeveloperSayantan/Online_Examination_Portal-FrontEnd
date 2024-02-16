import { Component } from '@angular/core';
import { QuestionpaperService } from 'src/app/services/questionpaper.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {
  totalQuestionSet: any;
  teacherDetails: any;
  totalStudentsInSchool: number = 0;
  totalTeachers: number = 0;


  constructor(private teacherService: TeacherService, private questionService: QuestionpaperService) { }

  ngOnInit(): void {
    // Retrieve teacher details from service
    this.teacherDetails = this.teacherService.getTeacherDetails();
    console.log('Teacher Details:', this.teacherDetails);

    // Call a method to calculate total question set (you can replace this with your actual logic)
    this.calculateTotalQuestionSet();
    // Fetch all students from the service and count the number of students from the same school as the teacher
    this.getStudentsFromSameSchool();

    this.totalTeachersInSchool();
    
  }

  totalTeachersInSchool(){
    const teacherSchoolId = this.teacherService.getTeacherDetails()?.school_id.sid;
    console.log('---->'+teacherSchoolId);
    
    this.teacherService.getAllTeachers().subscribe(
      (teacherData: any[])=> {
        console.log(teacherData);
        
        let totalCount = 0; // Initialize count to 0

        // Iterate over each schoolData item
        teacherData.forEach(teachers => {
          if (teachers.school_id.sid === teacherSchoolId) {
            totalCount++;
          }
        });
  
        this.totalTeachers = totalCount;

          console.log('total school--->'+this.totalTeachers);
          
      }

    );
  }

  calculateTotalQuestionSet() {
    this.questionService.getQuestionData().subscribe(
      (questionData: any[]) => {
        this.totalQuestionSet = questionData.filter(quesLength => quesLength.subject === this.teacherDetails.subject).length;

        console.log(this.totalQuestionSet);
         // Assuming an array of questions is returned
      },
      (error) => {
        console.error('Error fetching question data:', error);
      }
    );

  }

  getStudentsFromSameSchool() {
    console.log("school_id- ",this.teacherDetails.school_id.sid);
    const teacherSchoolId = this.teacherDetails.school_id.sid; // Assuming school_id is the correct property
    
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
