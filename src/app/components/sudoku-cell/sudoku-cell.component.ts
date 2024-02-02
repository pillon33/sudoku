import { Component, Input } from '@angular/core';

@Component({
  selector: 'sudoku-cell',
  templateUrl: './sudoku-cell.component.html',
  styleUrl: './sudoku-cell.component.scss'
})
export class SudokuCellComponent {
  @Input("value") 
  value: number = 0;

  @Input("hasError")
  hasError: boolean = false;

  @Input("isClue")
  isClue: boolean = false;

  cellStyleDictionary = {
    clue: 'cellWithClue',
    error: 'cellWithError',
    empty: 'emptyCell',
    cell: 'cell'
  }

  public getCellClass(): string {
    return this.isClue ? 
      this.cellStyleDictionary.clue : 
      (this.hasError ? 
        this.cellStyleDictionary.error : 
        (this.value === 0 ? 
          this.cellStyleDictionary.empty : 
          this.cellStyleDictionary.cell));
  }
}
