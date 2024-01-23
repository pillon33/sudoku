import { Component, OnInit } from '@angular/core';
import { Sudoku } from '../../models/sudoku.model';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuDTO } from '../../models/sudoku-dto.model';

@Component({
  selector: 'app-sudoku-board',
  templateUrl: './sudoku-board.component.html',
  styleUrl: './sudoku-board.component.scss'
})
export class SudokuBoardComponent implements OnInit {
  sudokuBoardModel: SudokuDTO = new SudokuDTO();

  constructor(private service: SudokuService) {}

  ngOnInit(): void {
    this.service.getBaseBoard().subscribe((res) => {
      if (res != undefined) {
        this.sudokuBoardModel.deserialize(res);
      }
    });
  }
  
}
