import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrl: './sudoku-cell.component.scss'
})
export class SudokuCellComponent {
  @Input("value") 
  value: string = '';

  @Input("hasError")
  hasError: boolean = false;

  @Input("isClue")
  isClue: boolean = false;
}
