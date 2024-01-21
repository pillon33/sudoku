import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AppModule } from './app.module';
import { MainModule } from './modules/main/main.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sudoku';
}
