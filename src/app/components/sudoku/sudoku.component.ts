import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Sudoku } from '../../models/sudoku.model';
import { SudokuDTO } from '../../models/sudoku-dto.model';
import { SudokuService } from '../../services/sudoku.service';
import { SudokuCell } from '../../models/sudoku-cell.model';
import { environment } from '../../../environments/environment';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrl: './sudoku.component.scss'
})
export class SudokuComponent implements OnInit, OnDestroy {
  sudokuBoardModel: Sudoku = new Sudoku();
  sudokuDtoModel: SudokuDTO = new SudokuDTO();

  private allowedNumbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  private selectedCellCoordinates: number[] = [-1, -1];

  solvedMsg: string = 'Sudoku solved!';
  numberOfFields: number = 5;

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
        this.sudokuBoardModel = new Sudoku();
        this.sudokuDtoModel = new SudokuDTO();
      }
    });
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  getNewPuzzle() {
    this.service.getBoardWithNumberOfFields(this.resolver, this.numberOfFields).subscribe((res) => {
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
    if (cell.isSelected) {
      this.selectedCellCoordinates = event;
    } else {
      this.selectedCellCoordinates = [-1, -1];
    }
  }

  clearCellSelection() {
    this.sudokuBoardModel.cells.forEach((row: SudokuCell[]) => {
      row.forEach((cell: SudokuCell) => {
        cell.isSelected = false;
      });
    });
    this.selectedCellCoordinates = [-1, -1];
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
    if (this.allowedNumbers.find((value: string) => {
      return value === event.key;
    })) {
      let row = this.selectedCellCoordinates[0];
      let col = this.selectedCellCoordinates[1];
      
      if (row === -1 || col === -1) {
        return;
      }

      let cell: SudokuCell = this.getCellFromEvent(this.selectedCellCoordinates);

      cell.value = +(event.key);

      this.clearCellSelection();

      if (this.isSolved()) {
        setTimeout(() => {
          alert(this.solvedMsg);
        }, 100);
      }
    }
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
