import { Routes } from '@angular/router';
import {SudokuComponent} from './components/sudoku/sudoku.component';
import {SudokuCellComponent} from './components/sudoku-cell/sudoku-cell.component';
import {SudokuBoardComponent} from './components/sudoku-board/sudoku-board.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
    { path: 'sudoku', component: SudokuComponent },
    { path: 'sudoku-cell', component: SudokuCellComponent },
    { path: 'sudoku-board', component: SudokuBoardComponent },
    { path: '', component: LandingPageComponent },
];
