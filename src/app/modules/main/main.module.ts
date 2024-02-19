import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SudokuComponent } from '../../components/sudoku/sudoku.component';
import { SudokuBoardComponent } from '../../common/components/sudoku-board/sudoku-board.component';
import { SudokuCellComponent } from '../../components/sudoku-cell/sudoku-cell.component';
import { HttpClientModule } from '@angular/common/http';
import { MainMenuComponent } from '../../components/main-menu/main-menu.component';
import { SudokuService } from '../../services/sudoku.service';
import { ResolverVisualisationComponent } from '../../components/resolver-visualisation/resolver-visualisation.component'; 
import { FormsModule } from '@angular/forms'; 
import { LandingPageComponent } from '../../components/landing-page/landing-page.component';



@NgModule({
  declarations: [
    SudokuComponent,
    SudokuBoardComponent,
    SudokuCellComponent,
    MainMenuComponent,
    ResolverVisualisationComponent,
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    SudokuComponent,
    SudokuBoardComponent,
    SudokuCellComponent,
    MainMenuComponent,
    ResolverVisualisationComponent,
    LandingPageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SudokuService],
})
export class MainModule { }
