import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SudokuCell } from '../../models/sudoku-cell.model';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuDTO } from '../../models/sudoku-dto.model';
import { Sudoku } from '../../models/sudoku.model';
import { ResolverMove } from '../../models/resolver-move.model';

@Component({
  selector: 'app-resolver-visualisation',
  templateUrl: './resolver-visualisation.component.html',
  styleUrl: './resolver-visualisation.component.scss'
})
export class ResolverVisualisationComponent implements OnInit, OnDestroy {
  sudokuBoardModel: Sudoku = new Sudoku();
  sudokuDtoModel: SudokuDTO = new SudokuDTO();
  resolverMoves: ResolverMove[] = [];
  
  private selectedCellCoordinates: number[] = [-1, -1];

  numberOfFields: number = 40;
  
  @Input("resolver")
  resolver: string = '';

  constructor(
    private service: SudokuService
    ) {}

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  getNewPuzzle() {
    this.service.getBoardWithNumberOfFields(this.resolver, this.numberOfFields).subscribe({
      next: (res) => {
        if (res != undefined) {
          this.sudokuDtoModel.deserialize(res);
          this.sudokuBoardModel.fromDTO(this.sudokuDtoModel);
        }
      },
      complete: () => {
        this.getSolution();
      }});
  }

  getSolution() {
    this.service.getResolverMoves(this.resolver, this.sudokuDtoModel).subscribe(
      {
        next: (res) => {
          if (res != undefined) {
            this.resolverMoves = res.map((val) => {
              return new ResolverMove().deserialize(val);
            });
          }
        },
        complete: () => {
          this.showSolution();
        }
      });
  }

  async showSolution() {
    let i = 0;
    
    while (i < this.resolverMoves.length) {
      let move = this.resolverMoves.at(i);
      
      if (move === undefined) {
        throw new Error("Index out of bounds exception.");
      }

      // get coordinates
      let row = move.row;
      let col = move.column;

      // mark as selected
      this.sudokuBoardModel.cells[row][col].isSelected = true;
      await this.sleep(500);

      // deselect
      this.sudokuBoardModel.cells[row][col].isSelected = false;

      //insert value
      this.sudokuBoardModel.cells[row][col].value = move.insertedValue;
      await this.sleep(500);

      i++;
    }
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

  sleep(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
