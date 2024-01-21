import { Routes } from '@angular/router';
import {SudokuComponent} from './components/sudoku/sudoku.component';
import {SudokuCellComponent} from './components/sudoku-cell/sudoku-cell.component';
import {SudokuBlockComponent} from './components/sudoku-block/sudoku-block.component';
import {SudokuBoardComponent} from './components/sudoku-board/sudoku-board.component';

export const routes: Routes = [
    { path: 'sudoku', component: SudokuComponent },
    { path: 'sudoku-cell', component: SudokuCellComponent },
    { path: 'sudoku-block', component: SudokuBlockComponent },
    { path: 'sudoku-board', component: SudokuBoardComponent },
];
