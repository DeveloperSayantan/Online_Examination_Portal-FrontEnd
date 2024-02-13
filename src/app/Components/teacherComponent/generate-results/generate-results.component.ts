import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultsService } from 'src/app/services/results.service';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { animate, style, transition, trigger } from '@angular/animations';
import { TeacherDetails, TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-generate-results',
  templateUrl: './generate-results.component.html',
  styleUrls: ['./generate-results.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class GenerateResultComponent implements OnInit{
  studentId: number =0;
  studentResults: any[] = [];
  studentDetails: StudentDetails | null = null;
  successRatio: number | undefined;
  teacherRemarks: string = ''; 
  highestScore: number | undefined;
  teacherDetails: TeacherDetails | null = null;
  schoolName: string | undefined;
  location: string | undefined;


  constructor(
    private route: ActivatedRoute,
    private resultsService: ResultsService,
    private studentsService: StudentsService,
    private teacherService: TeacherService
  ) { }

  ngOnInit(): void {
    // Retrieve studentId from query parameters
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      console.log(this.studentId);

      // Fetch teacher details from session storage
    this.teacherDetails = this.teacherService.getTeacherDetails();
    
    if (this.teacherDetails) {
      // Fetch school details using school ID from teacher details
      console.log(this.teacherDetails.school_id.sid);
      this.teacherService.fetchSchoolDetails(this.teacherDetails.school_id.sid)
        .subscribe(response => {
          this.schoolName = response.schoolName;
          this.location = response.location;
          console.log(this.schoolName);
        });
    }
    
    
      // Fetch student details
      this.fetchStudentDetails();
      // Fetch results using studentId
      this.fetchStudentResults();

    
    });
  }
  
  fetchSchoolDetails() {
    const teacherDetails = this.teacherService.getTeacherDetails();
    if (teacherDetails) {
      console.log(teacherDetails.school_id);
      
    }
  }

  fetchStudentDetails() {
    // Call the service to fetch student details by studentId
    console.log("--"+this.studentId);
    
    this.studentsService.getStudentDetailsById(this.studentId)
      .subscribe(
        (details: StudentDetails) => {
          this.studentDetails = details;
          console.log('Student Details:', this.studentDetails);
        },
        error => {
          console.error('Error fetching student details:', error);
        }
      );
  }

  fetchStudentResults() {
    // Call the service to fetch results by studentId
    this.resultsService.getResultsByStudentId(this.studentId)
      .subscribe(
        (results: any) => {
          this.studentResults = results;
          console.log('Student Results:', this.studentResults);
          this.calculateSuccessRatio();
          this.calculateHighestScore();         
          
        },
        error => {
          console.error('Error fetching results:', error);
        }
      );
  }

  calculateSuccessRatio() {
    const totalResults = this.studentResults.length;
    const successfulResults = this.studentResults.filter(result => result.score >= 1).length;
    this.successRatio = (successfulResults / totalResults) * 100;
  }

  calculateHighestScore() {
    const scores = this.studentResults.map(result => result.score);
    this.highestScore = Math.max(...scores);
  }

  downloadCertificate() {

      const doc = new jsPDF();
    
        

      // // Add watermark
        
      // Add image to PDF
      const img = new Image();
      img.src = 'assets/images/logo.jpg'; // Replace 'assets/images/logo.jpg' with the path to your image
      img.onload = () => {
        doc.addImage(img, 'JPEG', 5, -5, 30, 30); // Adjust x, y, width, and height as needed
        
        // Add portal name
        doc.setFontSize(30);
        doc.setTextColor(0, 0, 0);
        doc.text('Exam Arena', doc.internal.pageSize.getWidth() / 2, 15, { align: 'center' });
    
        // Add horizontal line
        doc.setLineWidth(0.5);
        doc.line(10, 20, doc.internal.pageSize.getWidth() - 10, 20);
      
        if (this.schoolName) {
          // Add school name in big size
          doc.setFontSize(24); // Set font size for school name
          doc.setTextColor(255, 0, 0); // Set text color to red for highlight
          const schoolNameText = this.schoolName;
          const textWidth = doc.getTextWidth(schoolNameText);
          const textX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
          const textY = 30; // Adjust Y position as needed
          doc.text(schoolNameText, textX, textY);
    
          // Add location below the school name
          doc.setFontSize(12); // Reset font size
          doc.setTextColor(0, 0, 0); // Reset text color
          doc.text(`Location: ${this.location}`, textX+13, textY + 7); // Adjust Y position as needed
        }

      // Add horizontal line
      doc.line(10, 40, doc.internal.pageSize.getWidth() - 10, 40);

        // Add student details
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Student Name: ${this.studentDetails?.name}`, 10, 45);
        doc.text(`Class: ${this.studentDetails?.cls}`, 10, 55);
        doc.text(`Phone No: ${this.studentDetails?.phone}`, 135, 45);
        doc.text(`Email: ${this.studentDetails?.email}`, 135, 55);
      
        // Add horizontal line
        doc.line(10, 60, doc.internal.pageSize.getWidth() - 10, 60);
      
        // Add results table
        let yOffset = 70;
        const headers = [['Question Set Name', 'Total Questions Attempted', 'Total Correct Answered', 'Total Wrong Answered', 'Score']];
        const data = this.studentResults.map(result => [result.questionSetId.setname, result.totalQuestionsAttempted, result.totalCorrectAnswered, result.totalWrongAnswered, result.score]);
        autoTable(doc,{
          startY: yOffset,
          head: headers,
          body: data,
          theme: 'grid',
          styles: {
            font: 'helvetica',
            fontStyle: 'bold',
            fontSize: 12,
            // Add padding to cells for better appearance
            valign: 'middle', // Vertical alignment: 'middle'
            halign: 'center', // Horizontal alignment: 'center'
          },
          columnStyles: {
            0: { cellWidth: 80 },
          },
          didDrawPage: function (data) {
            if (data.cursor) {
              yOffset = data.cursor.y + 10; // Update yOffset after the table is drawn
            }
          }
        });
      
           // Add success ratio below the table
    doc.text(`Success Ratio: ${this.successRatio}%`, 10, yOffset);
    doc.setTextColor(255, 0, 0);
    doc.text(`Highest Marks: ${this.highestScore}%`, 150, yOffset+10);

    // Add teacher's remarks below the success ratio
    if (this.teacherRemarks) {
      yOffset += 20;
      doc.text(`Remarks: ${this.teacherRemarks}`, 10, yOffset);
    }
    
    if (this.teacherDetails) {
      // Add teacher's name above the teacher's signature
      doc.setTextColor(0, 0, 0); // Reset text color
      doc.setFontSize(12); // Reset font size
      doc.text(`${this.teacherDetails.name}`, doc.internal.pageSize.getWidth() - 66, doc.internal.pageSize.getHeight() - 35); // Adjust positions as needed
  
      // Add guardian signature and teacher signature
      doc.setTextColor(0, 0, 0); // Reset text color
      doc.setFontSize(12); // Reset font size
      doc.text("Guardian's Signature", 20, doc.internal.pageSize.getHeight() - 30); // Adjust positions as needed
      doc.text(`Teacher's Signature`, doc.internal.pageSize.getWidth() - 70, doc.internal.pageSize.getHeight() - 30); // Adjust positions as needed
      }
      // Save the PDF
      doc.save('certificate.pdf');
      };
    } 
}