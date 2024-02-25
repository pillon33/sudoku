import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppModule } from './app.module';
import { MainModule } from './modules/main/main.module';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { SudokuComponent } from './components/sudoku/sudoku.component';
import { ResolverVisualisationComponent } from './components/resolver-visualisation/resolver-visualisation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppComponent {
  title = 'sudoku';
  gameMode = environment.getPuzzleEndpoint;
  resolver = environment.defaultEndpoint;
  resolverEmitter: EventEmitter<string> = new EventEmitter();

  onResolverChange(event: string) {
    this.resolver = event;
    this.resolverEmitter.emit(event);
  }

  onGameModeChange(event: string) {
    this.gameMode = event;
  }

  onOutletLoaded(component: SudokuComponent | any) {
    if (component instanceof SudokuComponent || component instanceof ResolverVisualisationComponent) {
      component.resolver = this.resolver;
      component.events = this.resolverEmitter;
    }
  }
}
