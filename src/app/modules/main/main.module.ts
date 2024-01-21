import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuComponent } from '../../components/sudoku/sudoku.component';
import { SudokuBoardComponent } from '../../components/sudoku-board/sudoku-board.component';
import { SudokuCellComponent } from '../../components/sudoku-cell/sudoku-cell.component';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from '../../components/main-menu/main-menu.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    SudokuComponent,
    SudokuBoardComponent,
    SudokuCellComponent,
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    SudokuComponent,
    SudokuBoardComponent,
    SudokuCellComponent,
    MainMenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule { }
