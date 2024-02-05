import { Component } from '@angular/core';
import { Sudoku } from '../../models/sudoku.model';
import { SudokuDTO } from '../../models/sudoku-dto.model';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuCell } from '../../models/sudoku-cell.model';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss'
})
export class SudokuComponent {
  sudokuBoardModel: Sudoku = new Sudoku();
  sudokuDtoModel: SudokuDTO = new SudokuDTO();

  constructor(
    private service: SudokuService
    ) {}

  ngOnInit(): void {
    this.service.getBaseBoard().subscribe((res) => {
      if (res != undefined) {
        this.sudokuDtoModel.deserialize(res);
        this.sudokuBoardModel.fromDTO(this.sudokuDtoModel);
      }
    });
  }

  onCellClick(event: any) {
    let cell: SudokuCell = this.getCellFromEvent(event);

    if (cell.mask) {
      return;
    }

    this.clearCellSelection();

    cell.isSelected = !cell.isSelected;
  }

  clearCellSelection() {
    this.sudokuBoardModel.cells.forEach((row: SudokuCell[]) => {
      row.forEach((cell: SudokuCell) => {
        cell.isSelected = false;
      })
    })
  }

  getCellFromEvent(event: any): SudokuCell {
    let row: number = event[0];
    let col: number = event[1];
    let optional: SudokuCell | undefined = this.sudokuBoardModel.cells.at(row)?.at(col);

    if (optional === undefined) {
      throw new Error("Cell not found.");
    }

    return optional;
  }
}
