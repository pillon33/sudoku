import { Routes } from '@angular/router';
import {SudokuComponent} from './components/sudoku/sudoku.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ResolverVisualisationComponent } from './components/resolver-visualisation/resolver-visualisation.component';

export const routes: Routes = [
    { path: 'sudoku', component: SudokuComponent },
    { path: '', component: LandingPageComponent },
    { path: 'visualisation', component: ResolverVisualisationComponent },
];
