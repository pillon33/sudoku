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

  @Input("isClickable")
  isClickable: boolean = true;

  cellStyleDictionary = {
    clue: 'cellWithClue',
    error: 'cellWithError',
    empty: 'emptyCell',
    selected: 'selectedCell',
    selectedError: 'selectedCellWithError',
    selectable: 'selectable'
  }

  public getCellClass(): string {
    if (this.isClue) return this.cellStyleDictionary.clue;
    
    let style = '';

    if (this.isClickable) style += this.cellStyleDictionary.selectable + ' ';

    if (this.hasError) return style + (this.isSelected ? this.cellStyleDictionary.selectedError : this.cellStyleDictionary.error);

    if (this.isSelected) style += this.cellStyleDictionary.selected;

    if (this.value === 0) return style + ' ' + this.cellStyleDictionary.empty;
    
    return style;
  }
}
