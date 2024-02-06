import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsService } from 'src/app/services/results.service';
import { StudentDetails, StudentsService } from 'src/app/services/students.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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

  generatePDF() {
    const doc = new jsPDF();
  
    // Add watermark
    doc.setFontSize(40);
    doc.setTextColor(204, 204, 204); // Light gray color
    doc.text('EXAM ARENA', doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() / 2, { align: 'center', angle: 45 });

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
    
      // Add student details
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Student Name: ${this.studentDetails?.name}`, 10, 30);
      doc.text(`Class: ${this.studentDetails?.cls}`, 10, 40);
      doc.text(`Phone No: ${this.studentDetails?.phone}`, 135, 30);
      doc.text(`Email: ${this.studentDetails?.email}`, 135, 40);
    
      // Add horizontal line
      doc.line(10, 50, doc.internal.pageSize.getWidth() - 10, 50);
    
      // Add results table
      let yOffset = 60;
      const headers = [['Question Set Name', 'Total Questions Attempted', 'Total Correct Answered', 'Total Wrong Answered', 'Score']];
      const data = this.results.map(result => [result.questionSetId.setname, result.totalQuestionsAttempted, result.totalCorrectAnswered, result.totalWrongAnswered, result.score]);
      autoTable(doc,{
        startY: yOffset,
        head: headers,
        body: data,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontStyle: 'bold',
          fontSize: 12,
        },
        columnStyles: {
          0: { cellWidth: 80 },
        },
      });
    
      // Save the PDF
      doc.save('results.pdf');
    };
  }  
  
}