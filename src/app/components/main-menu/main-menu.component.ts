import { Component } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent {
  public menuElements = [
    {name: 'sudoku', menuTxt: 'Sudoku', menuDescription: 'Complete sudoku component', redirectPath: 'sudoku'},
    {name: 'sudoku-cell', menuTxt: 'Sudoku Cell', menuDescription: 'Sudoku cell component', redirectPath: 'sudoku-cell'},
    {name: 'sudoku-block', menuTxt: 'Sudoku Block', menuDescription: 'Sudoku block component', redirectPath: 'sudoku-block'},
    {name: 'sudoku-board', menuTxt: 'Sudoku Board', menuDescription: 'Sudoku board generic component', redirectPath: 'sudoku-board'},
  ];

}
