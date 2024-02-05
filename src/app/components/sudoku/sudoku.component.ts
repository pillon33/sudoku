import { Component } from '@angular/core';
import { Sudoku } from '../../models/sudoku.model';
import { SudokuDTO } from '../../models/sudoku-dto.model';
import { SudokuService } from '../../services/sudoku.service';

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
    let row: number = event[0];
    let col: number = event[1];
    console.log("row: %d, col: %d", row, col);
  }
}
