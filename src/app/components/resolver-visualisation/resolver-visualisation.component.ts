import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SudokuCell } from '../../models/sudoku-cell.model';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuDTO } from '../../models/sudoku-dto.model';
import { Sudoku } from '../../models/sudoku.model';
import { ResolverMove } from '../../models/resolver-move.model';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-resolver-visualisation',
  templateUrl: './resolver-visualisation.component.html',
  styleUrl: './resolver-visualisation.component.scss'
})
export class ResolverVisualisationComponent implements OnInit, OnDestroy {
  sudokuBoardModel: Sudoku = new Sudoku();
  sudokuDtoModel: SudokuDTO = new SudokuDTO();
  resolverMoves: ResolverMove[] = [];
  shouldShowSolution: boolean = true;

  numberOfFields: number = 40;
  delta: number = 0.5;
  deltaMultiplier: number = 1;
  private eventsSubscription: Subscription = new Subscription;

  
  @Input("resolver")
  events: Observable<string> = new Observable();

  resolver: string = environment.defaultEndpoint;

  constructor(
    private service: SudokuService
    ) {}

    ngOnInit(): void {
      this.eventsSubscription = this.events.subscribe({
        next: (event) => {
          this.resolver = event;
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => {
          this.shouldShowSolution = false;
          this.sudokuBoardModel = new Sudoku();
          this.sudokuDtoModel = new SudokuDTO();
        }
      });
    }

  ngOnDestroy(): void {
    this.shouldShowSolution = false;
    this.eventsSubscription.unsubscribe();
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
        this.shouldShowSolution = true;
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
      if (!this.shouldShowSolution) {
        return;
      }
      let move = this.resolverMoves.at(i);
      
      if (move === undefined) {
        throw new Error("Index out of bounds exception.");
      }

      // get coordinates
      let row = move.row;
      let col = move.column;

      // mark as selected
      this.sudokuBoardModel.cells[row][col].isSelected = true;
      await this.sleep(this.delta*1000/this.deltaMultiplier);

      // deselect
      this.sudokuBoardModel.cells[row][col].isSelected = false;

      //insert value
      this.sudokuBoardModel.cells[row][col].value = move.insertedValue;
      await this.sleep(this.delta*1000/this.deltaMultiplier);

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
