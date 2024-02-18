import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuElement } from '../../models/menu-element.type';
import { SudokuService } from '../../services/sudoku.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent implements OnInit {
  public menuElements: MenuElement[] = [
    new MenuElement().deserialize({name: 'sudoku', menuTxt: 'Sudoku', menuDescription: 'Complete sudoku component', redirectPath: 'sudoku'}),
    new MenuElement().deserialize({name: 'sudoku-cell', menuTxt: 'Sudoku Cell', menuDescription: 'Sudoku cell component', redirectPath: 'sudoku-cell'}),
    new MenuElement().deserialize({name: 'sudoku-board', menuTxt: 'Sudoku Board', menuDescription: 'Sudoku board generic component', redirectPath: 'sudoku-board'}),
  ];

  selectedResolver: MenuElement = new MenuElement();

  @Output("selectedResolver")
  resolver: EventEmitter<string> = new EventEmitter();

  @Output("selectedMode")
  mode: EventEmitter<string> = new EventEmitter();

  constructor(
    private service: SudokuService,
    private router: Router
    ) {}
  
  ngOnInit(): void {
    this.getResolvers();
  }

  getClass(element: MenuElement): string {
    let result = 'menuElement ' + (element.name === this.selectedResolver.name ? 'selected' : '');
    return result;
  }

  getResolvers() {
    this.service.getAvailableResolversList().subscribe((res) => {
      if (res != undefined) {
        this.menuElements = res.map((val) => {return new MenuElement().deserialize(val)});
      }
    });
  }

  selectResolver(element: MenuElement) {
    this.selectedResolver = element;
    this.resolver.emit(element.redirectPath);
  }

  onGameModeSelection(mode: string) {
    switch (mode) {
      case 'sudoku':
        this.router.navigate(['/sudoku']);
        break;
  
      case 'visualisation':
        this.router.navigate(['/visualisation']);
        break;

      default:
        break;
    }
  }

}
