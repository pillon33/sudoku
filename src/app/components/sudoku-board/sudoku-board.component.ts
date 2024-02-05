import { Component, Input, OnInit } from '@angular/core';
import { Sudoku } from '../../models/sudoku.model';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuCalculationService } from '../../services/sudoku-calculation.service';
import { SudokuDTO } from '../../models/sudoku-dto.model';

@Component({
  selector: 'sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.scss'
})
export class SudokuBoardComponent implements OnInit {
  @Input() sudokuBoardModel: Sudoku = new Sudoku();

  constructor() {}

  ngOnInit(): void {
  }
  
}
