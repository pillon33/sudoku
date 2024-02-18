import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  fontSize = 12;
  minFontSize = 12;
  maxFontSize = 48;
  fontDelta = 1;
  timeDelta = 2;
  isBig = false;
  test = false;
  
  ngOnInit() {
    
  }

  ngOnDestroy () {

  }
}
