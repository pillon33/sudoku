import { Component, OnInit } from '@angular/core';
import { Sudoku } from '../../models/sudoku.model';
import { SudokuService } from '../../services/sudoku.service';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.scss'
})
export class SudokuBoardComponent implements OnInit {
  sudokuBoardModel: Sudoku = new Sudoku();

  constructor(private service: SudokuService) {}

  ngOnInit(): void {
    this.service.getBaseBoard().subscribe((res) => {
      if (res != undefined) {
        console.log(res);
        this.sudokuBoardModel.deserialize(res);
        console.log(this.sudokuBoardModel);
      }
    });
    console.log(this.sudokuBoardModel);
  }
  
}
