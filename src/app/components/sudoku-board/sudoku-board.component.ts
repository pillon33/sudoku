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
    console.log("test");
    this.sudokuBoardModel.deserialize(this.service.getBaseBoard());
    console.log(this.sudokuBoardModel);
  }
  
}
