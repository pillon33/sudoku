import { Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Input("isSelected")
  isSelected: boolean = false;

  cellStyleDictionary = {
    clue: 'cellWithClue',
    error: 'cellWithError',
    empty: 'emptyCell',
    selected: 'selectedCell',
    selectedError: 'selectedCellWithError',
    cell: 'cell'
  }

  public getCellClass(): string {
    if (this.isClue) return this.cellStyleDictionary.clue;

    if (this.hasError) return this.isSelected ? this.cellStyleDictionary.selectedError : this.cellStyleDictionary.error;

    let style = '';

    if (this.isSelected) style += this.cellStyleDictionary.selected;

    if (this.value === 0) return style + ' ' + this.cellStyleDictionary.empty;
    
    return style + ' ' + this.cellStyleDictionary.cell;
  }
}
