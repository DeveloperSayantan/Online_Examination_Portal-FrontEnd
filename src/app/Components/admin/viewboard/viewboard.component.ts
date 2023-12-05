import { Component, OnInit } from '@angular/core';
import { AddboardService } from 'src/app/services/addboard.service';

@Component({
  selector: 'app-viewboard',
  templateUrl: './viewboard.component.html',
  styleUrls: ['./viewboard.component.css']
})
export class ViewboardComponent implements OnInit {
  boards: any[] = []; // Update the type based on your actual response structure

  constructor(private addboardService: AddboardService) {}

  ngOnInit() {
    this.getBoards();
  }

  getBoards() {
    this.addboardService.getBoards().subscribe(
      (data: any) => {
        this.boards = data;
      },
      (error) => {
        console.error('Error fetching boards:', error);
      }
    );
  }

  deleteBoard(id: number) {
    this.addboardService.deleteBoards(id).subscribe(
      (response: any) => {
        console.log(response); // Log the response for debugging
        // If successful, update the boards array to reflect the changes
        this.boards = this.boards.filter(board => board.bid !== id);
      },
      (error) => {
        console.error('Error deleting board:', error);
      }
    );
  }
}