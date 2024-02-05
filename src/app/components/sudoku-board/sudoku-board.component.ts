import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input("board") 
  sudokuBoardModel: Sudoku = new Sudoku();

  @Output("cellClick") 
  clickEvent: EventEmitter<number[]> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  onCellClick(row: number, col: number) {
    this.clickEvent.emit([row, col]);
  }
  
}
