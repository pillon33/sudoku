import { Component, HostListener, Input } from '@angular/core';
import { SudokuCell } from '../../models/sudoku-cell.model';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuDTO } from '../../models/sudoku-dto.model';
import { Sudoku } from '../../models/sudoku.model';

@Component({
  selector: 'app-resolver-visualisation',
  templateUrl: './resolver-visualisation.component.html',
  styleUrl: './resolver-visualisation.component.scss'
})
export class ResolverVisualisationComponent {
  sudokuBoardModel: Sudoku = new Sudoku();
  sudokuDtoModel: SudokuDTO = new SudokuDTO();
  
  private selectedCellCoordinates: number[] = [-1, -1];

  numberOfFields: number = 40;
  
  @Input("resolver")
  resolver: string = '';

  constructor(
    private service: SudokuService
    ) {}

  ngOnInit(): void {

  }

  getNewPuzzle() {
    this.service.getBoardWithNumberOfFields(this.resolver, this.numberOfFields).subscribe((res) => {
      if (res != undefined) {
        this.sudokuDtoModel.deserialize(res);
        this.sudokuBoardModel.fromDTO(this.sudokuDtoModel);
      }
    });
  }

  clearCells() {
    this.sudokuBoardModel.cells.forEach((row: SudokuCell[]) => {
      row.forEach((cell: SudokuCell) => {
        if (!cell.mask) {
          cell.value = 0;
        }
      });
    });
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    
  }

  isSolved(): boolean {
    let result = true;

    this.sudokuBoardModel.cells.forEach((row: SudokuCell[]) => {
      row.forEach((cell: SudokuCell) => {
        if (cell.value !== cell.cell) {
          result = false;
        }
      });
    });

    return result;
  }
}
